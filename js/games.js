/* Reading Rocket — the training games.
   Each game gets a container element and a ctx:
     ctx.grade   'K' | '1' | '2' | '3' | '4' | '5'
     ctx.profile current profile
     ctx.quit()  back to the games menu
     ctx.finish(result)  -> results screen; result = {stars, line1, line2, wpm?, score?, tricky?} */

window.RR = window.RR || {};

(function () {
  const D = RR.DATA;
  const A = RR.audio;
  const S = RR.state; /* state.js loads before games.js (see index.html) */

  /* ---------- helpers ---------- */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const sample = (arr, n) => shuffle(arr).slice(0, n);

  /* correct item + (n-1) distractors from pool, distinct by keyFn, shuffled.
     When sim() is supplied (Challenge/Expert), distractors are chosen to be
     maximally CONFUSABLE with the correct answer instead of random. */
  function withDistractors(correct, pool, n, keyFn, sim) {
    const seen = new Set([keyFn(correct)]);
    let cands = pool.filter(x => !seen.has(keyFn(x)));
    if (sim) {
      cands = cands.slice().sort((a, b) => sim(correct, b) - sim(correct, a));
      /* keep top confusables but with a little randomness among them */
      const pick = Math.max((n - 1) * 2, 4);
      cands = shuffle(cands.slice(0, pick)).concat(cands.slice(pick));
    } else {
      cands = shuffle(cands);
    }
    const out = [correct];
    for (const item of cands) {
      if (out.length >= n) break;
      const k = keyFn(item);
      if (!seen.has(k)) { seen.add(k); out.push(item); }
    }
    return shuffle(out);
  }

  /* similarity scorers for mean distractors */
  function wordSim(a, b) {
    let s = 0;
    if (rimeOf(a.w) === rimeOf(b.w)) s += 4;       /* rhymes — very confusable */
    if (a.w.length === b.w.length) s += 1;
    if (a.w[0] === b.w[0]) s += 1;
    if (a.w[a.w.length - 1] === b.w[b.w.length - 1]) s += 1;
    return s;
  }
  function letterSim(a, b) {
    const conf = RR.progress.confusablesOf(a.l);
    return conf.includes(b.l) ? 4 : 0;
  }
  /* choice count + whether to use mean distractors, from the kid's tier */
  function diffChoices(ctx) {
    const c = RR.progress.diffCfg(ctx.profile);
    return { n: c.choices, hard: c.hard };
  }

  function el(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  /* Gentle tap on a correct answer, firmer buzz on a miss (no-op where
     unsupported) — matches the battle haptics in adventure.js. */
  function haptic(ok) {
    if (navigator.vibrate) navigator.vibrate(ok ? 12 : 35);
  }

  /* Mastery-weighted sampling: struggled words 4x, unseen 3x, mastered 1x —
     practice quietly targets what the kid doesn't know yet. */
  function smartSample(p, arr, n, keyFn) {
    return arr
      .map(it => {
        const r = (p.mastery || {})[keyFn(it)] || { c: 0, w: 0 };
        const wgt = r.c >= RR.progress.MASTER_AT ? 1 : r.w > 0 ? 4 : 3;
        return { it, s: Math.random() * wgt };
      })
      .sort((a, b) => b.s - a.s)
      .slice(0, n)
      .map(x => x.it);
  }

  /* In-round combo streak: 3+ first-try corrects in a row pay bonus coins. */
  function comboHit(shell) {
    shell.combo = (shell.combo || 0) + 1;
    if (shell.combo < 3) return 0;
    const f = document.createElement('div');
    f.className = 'combofloat';
    f.textContent = `🔥 Combo x${shell.combo}! +2`;
    shell.area.appendChild(f);
    setTimeout(() => f.remove(), 1100);
    A.sfx.coin();
    return 2;
  }
  function comboMiss(shell) { shell.combo = 0; }

  /* Shared round chrome: header with back button + progress dots, play area. */
  function roundShell(container, ctx, title, total) {
    container.innerHTML = `
      <header class="gamebar">
        <button class="iconbtn" data-act="back" aria-label="Back">←</button>
        <div class="gametitle">${title}</div>
        <div class="dots">${Array.from({ length: total }, () => '<span class="dot"></span>').join('')}</div>
      </header>
      <main class="gamearea"></main>`;
    const shell = {
      live: true,
      area: container.querySelector('.gamearea'),
      dots: container.querySelectorAll('.dot'),
      timers: [],
      after(ms, fn) { shell.timers.push(setTimeout(() => { if (shell.live) fn(); }, ms)); },
      markDot(i) { if (shell.dots[i]) shell.dots[i].classList.add('on'); },
      nowDot(i) { shell.dots.forEach((d, j) => d.classList.toggle('now', j === i)); },
      die() {
        shell.live = false;
        shell.timers.forEach(clearTimeout);
        A.stop();
        if (RR.voice) RR.voice.stop();
      }
    };
    container.querySelector('[data-act="back"]').addEventListener('click', () => {
      shell.die();
      ctx.quit();
    });
    return shell;
  }

  function starsFromFirstTry(correctFirstTry, total) {
    const r = correctFirstTry / total;
    return r >= 0.85 ? 3 : r >= 0.55 ? 2 : 1;
  }

  /* Standard result for quiz-style rounds: stars + coins (2 per first-try
     correct answer, 5 per star). */
  function quizResult(firstTryCount, total, line1, extraCoins = 0) {
    const stars = starsFromFirstTry(firstTryCount, total);
    return { stars, correct: firstTryCount, total, coins: firstTryCount * 2 + stars * 5 + extraCoins, line1 };
  }

  /* Speak a celebration line, then advance once it has actually been heard —
     fixed timers were cutting lines off mid-word. Falls back to a short delay
     when speech is muted, and a hard cap in case the engine stalls. */
  function speakAdvance(shell, text, cb, speakOpts = {}) {
    let done = false;
    const go = () => {
      if (done || !shell.live) return;
      done = true;
      shell.after(350, cb);
    };
    A.speak(text, Object.assign({}, speakOpts, { onend: go }));
    shell.after(8000, go);
  }

  /* Pretty intro card shown before timed games. */
  function introCard(shell, { emoji, title, lines, buttonText, onStart, extraButtons = '' }) {
    shell.area.innerHTML = `
      <div class="card intro">
        <div class="intro-emoji">${emoji}</div>
        <h2>${title}</h2>
        ${lines.map(l => `<p>${l}</p>`).join('')}
        <div class="introbtns">
          <button class="btn big" data-act="start">${buttonText}</button>
          ${extraButtons}
        </div>
      </div>`;
    shell.area.querySelector('[data-act="start"]').addEventListener('click', onStart);
  }

  /* =========================================================
     GAME 1 — Letter Sounds (phonics + phonemic awareness)
     Alternates: "find the letter that says /m/" and
                 "what sound does 🐱 start with?"
     ========================================================= */
  const TOTAL_Q = 8;

  const soundsGame = {
    title: 'Letter Sounds',
    icon: '🔠',
    desc: 'Hear a sound, find its letter',
    grades: ['K', '1', '2'], /* mastered by 3rd grade — hidden after that */
    start(container, ctx) {
      const shell = roundShell(container, ctx, 'Letter Sounds', TOTAL_Q);
      const pool = ctx.grade === 'K' ? D.LETTERS : D.LETTERS.concat(D.DIGRAPHS);
      const words = D.WORDS[ctx.grade];
      let qi = 0;
      let firstTryCount = 0;
      let comboBonus = 0;
      const outcomes = [];

      function next() {
        if (!shell.live) return;
        if (qi >= TOTAL_Q) {
          shell.die();
          const r = quizResult(firstTryCount, TOTAL_Q, `${firstTryCount} of ${TOTAL_Q} on the first try!`, comboBonus);
          r.outcomes = outcomes;
          ctx.finish(r);
          return;
        }
        shell.nowDot(qi);
        if (qi % 2 === 0) askLetterForSound();
        else askFirstSound();
      }

      /* Type A: hear sound -> pick the letter */
      function askLetterForSound() {
        const target = smartSample(ctx.profile, pool, 1, x => 'l:' + x.l)[0];
        const dc = diffChoices(ctx);
        const choices = withDistractors(target, pool, dc.n, x => x.s, dc.hard ? letterSim : null);
        let firstTry = true;
        shell.area.innerHTML = `
          <div class="prompt">
            <button class="speaker" data-act="replay" aria-label="Hear the sound">🔊</button>
            <h2>Find the letter that says it!</h2>
          </div>
          <div class="choices letters">
            ${choices.map((c, i) => `<button class="choice letter" data-i="${i}">${c.l.toUpperCase()} <small>${c.l}</small></button>`).join('')}
          </div>`;
        const say = () => A.speak(target.s, { rate: 0.8 });
        shell.area.querySelector('[data-act="replay"]').addEventListener('click', say);
        shell.after(350, say);

        shell.area.querySelectorAll('.choice').forEach(btn => {
          btn.addEventListener('click', () => {
            const c = choices[+btn.dataset.i];
            if (c === target) {
              btn.classList.add('correct');
              shell.area.querySelectorAll('.choice').forEach(x => x.disabled = true);
              A.sfx.ding();
              haptic(true);
              if (firstTry) { firstTryCount++; comboBonus += comboHit(shell); }
              outcomes.push({ k: 'l:' + target.l, ok: firstTry });
              shell.markDot(qi);
              shell.area.querySelector('.prompt h2').innerHTML =
                `${target.l.toUpperCase()} says “${target.s}” — ${target.w} ${target.e}`;
              qi++;
              speakAdvance(shell, `Yes! ${target.l} says ${target.s}, like ${target.w}!`, next);
            } else {
              firstTry = false;
              comboMiss(shell);
              btn.classList.add('wrong');
              A.sfx.buzz();
              haptic(false);
            }
          });
        });
      }

      /* Type B: see picture -> pick its first sound's letter */
      function askFirstSound() {
        const target = smartSample(ctx.profile, words, 1, w => 'l:' + w.t[0])[0];
        const first = { l: target.t[0], s: target.s[0] };
        const others = pool.filter(p => p.s !== first.s);
        const dc = diffChoices(ctx);
        const choices = withDistractors(first, others, dc.n, x => x.l, dc.hard ? letterSim : null);
        let firstTry = true;
        shell.area.innerHTML = `
          <div class="prompt">
            <button class="bigpic" data-act="replay" aria-label="${target.w}">${target.e}</button>
            <h2>What sound does it start with?</h2>
          </div>
          <div class="choices letters">
            ${choices.map((c, i) => `<button class="choice letter" data-i="${i}">${c.l.toUpperCase()} <small>${c.l}</small></button>`).join('')}
          </div>`;
        const say = () => A.speak(target.w, { rate: 0.8 });
        shell.area.querySelector('[data-act="replay"]').addEventListener('click', say);
        shell.after(350, say);

        shell.area.querySelectorAll('.choice').forEach(btn => {
          btn.addEventListener('click', () => {
            const c = choices[+btn.dataset.i];
            if (c.l === first.l) {
              btn.classList.add('correct');
              shell.area.querySelectorAll('.choice').forEach(x => x.disabled = true);
              A.sfx.ding();
              haptic(true);
              if (firstTry) { firstTryCount++; comboBonus += comboHit(shell); }
              outcomes.push({ k: 'l:' + first.l, ok: firstTry });
              shell.markDot(qi);
              qi++;
              speakAdvance(shell, `Yes! ${target.w} starts with ${first.s}!`, next);
            } else {
              firstTry = false;
              comboMiss(shell);
              btn.classList.add('wrong');
              A.sfx.buzz();
              haptic(false);
            }
          });
        });
      }

      next();
    }
  };

  /* =========================================================
     GAME 2 — Sound It Out (blending)
     Tap sound tiles, blend them, pick the matching picture.
     ========================================================= */
  const blendGame = {
    title: 'Sound It Out',
    icon: '🧩',
    desc: 'Blend the sounds, pick the picture',
    start(container, ctx) {
      const shell = roundShell(container, ctx, 'Sound It Out', TOTAL_Q);
      const words = D.WORDS[ctx.grade];
      const round = smartSample(ctx.profile, words, TOTAL_Q, w => 'w:' + w.w);
      let qi = 0;
      let firstTryCount = 0;
      let comboBonus = 0;
      const outcomes = [];

      function next() {
        if (!shell.live) return;
        if (qi >= TOTAL_Q) {
          shell.die();
          const r = quizResult(firstTryCount, TOTAL_Q, `${firstTryCount} of ${TOTAL_Q} blended on the first try!`, comboBonus);
          r.outcomes = outcomes;
          ctx.finish(r);
          return;
        }
        shell.nowDot(qi);
        ask(round[qi]);
      }

      function ask(target) {
        const dc = diffChoices(ctx);
        const choices = withDistractors(target, words, dc.n, x => x.w, dc.hard ? wordSim : null);
        let firstTry = true;
        let answered = false;
        shell.area.innerHTML = `
          <div class="prompt">
            <h2>Tap the sounds, then find the picture!</h2>
            <div class="tiles">
              ${target.t.map((t, i) => `<button class="tile" data-i="${i}">${t}</button>`).join('')}
            </div>
            <button class="btn ghost" data-act="play">▶︎ Sound it out</button>
          </div>
          <div class="choices pics">
            ${choices.map((c, i) => `<button class="choice pic" data-i="${i}" aria-label="picture choice">${c.e}</button>`).join('')}
          </div>
          <div class="reveal" hidden></div>`;

        const tiles = shell.area.querySelectorAll('.tile');
        tiles.forEach(tile => {
          tile.addEventListener('click', () => {
            tiles.forEach(t => t.classList.remove('lit'));
            tile.classList.add('lit');
            A.sfx.pop();
            A.speak(target.s[+tile.dataset.i], { rate: 0.8 });
          });
        });

        function playAll() {
          const seq = target.s.map(s => ({ text: s, opts: { rate: 0.8 } }));
          A.speakSeq(seq, 320, null, i => {
            tiles.forEach(t => t.classList.remove('lit'));
            if (tiles[i]) tiles[i].classList.add('lit');
          });
        }
        shell.area.querySelector('[data-act="play"]').addEventListener('click', playAll);
        shell.after(420, playAll);

        shell.area.querySelectorAll('.choice').forEach(btn => {
          btn.addEventListener('click', () => {
            if (answered) return;
            const c = choices[+btn.dataset.i];
            if (c === target) {
              answered = true;
              btn.classList.add('correct');
              A.sfx.ding();
              haptic(true);
              if (firstTry) { firstTryCount++; comboBonus += comboHit(shell); }
              outcomes.push({ k: 'w:' + target.w, ok: firstTry });
              shell.markDot(qi);
              const reveal = shell.area.querySelector('.reveal');
              reveal.hidden = false;
              reveal.textContent = target.w;
              qi++;
              speakAdvance(shell, `${target.w}! You blended it!`, next, { rate: 0.9 });
            } else {
              firstTry = false;
              comboMiss(shell);
              btn.classList.add('wrong');
              A.sfx.buzz();
              haptic(false);
            }
          });
        });
      }

      next();
    }
  };

  /* =========================================================
     GAME 3 — Word Builder (segmenting / spelling)
     Hear the word, tap tiles in order to build it.
     ========================================================= */
  const buildGame = {
    title: 'Word Builder',
    icon: '🧱',
    desc: 'Build the word from sound tiles',
    start(container, ctx) {
      const shell = roundShell(container, ctx, 'Word Builder', TOTAL_Q);
      const words = D.WORDS[ctx.grade];
      const round = smartSample(ctx.profile, words, TOTAL_Q, w => 'w:' + w.w);
      let qi = 0;
      let firstTryCount = 0;
      let comboBonus = 0;
      const outcomes = [];

      function next() {
        if (!shell.live) return;
        if (qi >= TOTAL_Q) {
          shell.die();
          const r = quizResult(firstTryCount, TOTAL_Q, `${firstTryCount} of ${TOTAL_Q} words built without a slip!`, comboBonus);
          r.outcomes = outcomes;
          ctx.finish(r);
          return;
        }
        shell.nowDot(qi);
        ask(round[qi]);
      }

      function ask(target) {
        /* decoy tiles that are NOT part of the word */
        const otherTiles = [];
        for (const w of words) for (const t of w.t) {
          if (!target.t.includes(t) && !otherTiles.includes(t)) otherTiles.push(t);
        }
        const decoys = sample(otherTiles, RR.progress.diffCfg(ctx.profile).hard ? 4 : 2);
        const bank = shuffle(target.t.map((t, i) => ({ t, s: target.s[i], id: i })) /* real tiles */
          .concat(decoys.map((t, i) => ({ t, s: null, id: 100 + i }))));

        let placed = 0;
        let firstTry = true;

        shell.area.innerHTML = `
          <div class="prompt">
            <button class="bigpic" data-act="replay" aria-label="${target.w}">${target.e}</button>
            <h2>Build the word!</h2>
            <div class="slots">
              ${target.t.map(() => `<div class="slot"></div>`).join('')}
            </div>
          </div>
          <div class="tiles bank">
            ${bank.map((b, i) => `<button class="tile" data-i="${i}">${b.t}</button>`).join('')}
          </div>`;

        const slots = shell.area.querySelectorAll('.slot');
        const say = () => A.speak(target.w, { rate: 0.75 });
        shell.area.querySelector('[data-act="replay"]').addEventListener('click', say);
        shell.after(350, say);

        shell.area.querySelectorAll('.tile').forEach(btn => {
          btn.addEventListener('click', () => {
            if (btn.disabled) return;
            const b = bank[+btn.dataset.i];
            const expected = target.t[placed];
            if (b.t === expected && b.id < 100) {
              A.sfx.pop();
              if (b.s) A.speak(b.s, { rate: 0.85 });
              slots[placed].textContent = b.t;
              slots[placed].classList.add('filled');
              btn.disabled = true;
              btn.classList.add('used');
              placed++;
              if (placed === target.t.length) {
                if (firstTry) { firstTryCount++; comboBonus += comboHit(shell); }
                outcomes.push({ k: 'w:' + target.w, ok: firstTry });
                shell.markDot(qi);
                A.sfx.star();
                haptic(true);
                qi++;
                shell.after(420, () => speakAdvance(shell, `${target.w}! You built it!`, next, { rate: 0.9 }));
              }
            } else {
              firstTry = false;
              comboMiss(shell);
              btn.classList.add('wrong');
              A.sfx.buzz();
              haptic(false);
              shell.after(450, () => btn.classList.remove('wrong'));
            }
          });
        });
      }

      next();
    }
  };

  /* =========================================================
     GAME — Memory Match (word ↔ picture recognition)
     Flip cards to pair each written word with its picture.
     ========================================================= */
  const MEM_PAIRS = 6;

  const memoryGame = {
    title: 'Memory Match',
    icon: '🧠',
    desc: 'Flip and match word to picture',
    start(container, ctx) {
      const shell = roundShell(container, ctx, 'Memory Match', MEM_PAIRS);
      const words = smartSample(ctx.profile, D.WORDS[ctx.grade], MEM_PAIRS, w => 'w:' + w.w);
      const cards = shuffle(
        words.map(w => ({ w, kind: 'pic' })).concat(words.map(w => ({ w, kind: 'word' })))
      );
      const missed = {}; /* word -> true once it was part of a mismatch */
      const outcomes = [];
      let matches = 0;
      let comboBonus = 0;
      let open = null;   /* index of the single face-up card */
      let lock = false;

      shell.area.innerHTML = `
        <div class="prompt"><h2>Find the matching pairs!</h2></div>
        <div class="memgrid">
          ${cards.map((c, i) => `<button class="memcard down" data-i="${i}" aria-label="Card ${i + 1}">❓</button>`).join('')}
        </div>`;

      const els = shell.area.querySelectorAll('.memcard');
      const faceOf = c => (c.kind === 'pic' ? c.w.e : c.w.w);

      function flip(i, up) {
        els[i].classList.toggle('down', !up);
        els[i].classList.toggle('word', up && cards[i].kind === 'word');
        els[i].innerHTML = up ? faceOf(cards[i]) : '❓';
      }

      els.forEach((card, i) => card.addEventListener('click', () => {
        if (!shell.live || lock || i === open || card.classList.contains('matched')) return;
        A.sfx.pop();
        flip(i, true);
        if (open == null) { open = i; return; }
        const first = open;
        const a = cards[first];
        const b = cards[i];
        open = null;
        if (a.w === b.w) {
          matches++;
          const ok = !missed[a.w.w];
          outcomes.push({ k: 'w:' + a.w.w, ok });
          if (ok) comboBonus += comboHit(shell);
          els[first].classList.add('matched');
          card.classList.add('matched');
          A.sfx.ding();
          haptic(true);
          A.speak(a.w.w, { rate: 0.85 });
          shell.markDot(matches - 1);
          if (matches >= MEM_PAIRS) {
            shell.after(900, () => {
              shell.die();
              const firstTryCount = outcomes.filter(o => o.ok).length;
              const r = quizResult(firstTryCount, MEM_PAIRS, `${firstTryCount} of ${MEM_PAIRS} pairs on the first try!`, comboBonus);
              r.outcomes = outcomes;
              ctx.finish(r);
            });
          }
        } else {
          missed[a.w.w] = missed[b.w.w] = true;
          comboMiss(shell);
          lock = true;
          els[first].classList.add('miss');
          card.classList.add('miss');
          A.sfx.buzz();
          haptic(false);
          shell.after(850, () => {
            els[first].classList.remove('miss');
            card.classList.remove('miss');
            flip(first, false);
            flip(i, false);
            lock = false;
          });
        }
      }));
    }
  };

  /* =========================================================
     GAME — Sentence Builder (syntax + word order)
     Hear a sentence, then rebuild it from shuffled word tiles.
     ========================================================= */
  const SENT_TOTAL = 5;

  const sentenceGame = {
    title: 'Sentence Builder',
    icon: '📝',
    desc: 'Put the words in order',
    start(container, ctx) {
      const shell = roundShell(container, ctx, 'Sentence Builder', SENT_TOTAL);
      const round = sample(D.SENTENCES[ctx.grade], SENT_TOTAL);
      let qi = 0;
      let firstTryCount = 0;
      let comboBonus = 0;

      function next() {
        if (!shell.live) return;
        if (qi >= SENT_TOTAL) {
          shell.die();
          ctx.finish(quizResult(firstTryCount, SENT_TOTAL, `${firstTryCount} of ${SENT_TOTAL} sentences built without a slip!`, comboBonus));
          return;
        }
        shell.nowDot(qi);
        ask(round[qi]);
      }

      function ask(sentence) {
        const tokens = sentence.split(/\s+/);
        const bank = shuffle(tokens.map((t, id) => ({ t, id })));
        let placed = 0;
        let firstTry = true;

        shell.area.innerHTML = `
          <div class="prompt">
            <button class="speaker" data-act="replay" aria-label="Hear the sentence">🔊</button>
            <h2>Listen, then build the sentence!</h2>
            <div class="slots sentslots">
              ${tokens.map(() => '<div class="slot wordslot"></div>').join('')}
            </div>
          </div>
          <div class="tiles bank">
            ${bank.map((b, i) => `<button class="tile wordtile" data-i="${i}">${b.t}</button>`).join('')}
          </div>`;

        const slots = shell.area.querySelectorAll('.slot');
        const say = () => A.speak(sentence, { rate: 0.85 });
        shell.area.querySelector('[data-act="replay"]').addEventListener('click', say);
        shell.after(350, say);

        shell.area.querySelectorAll('.tile').forEach(btn => {
          btn.addEventListener('click', () => {
            if (btn.disabled) return;
            const b = bank[+btn.dataset.i];
            if (b.t === tokens[placed]) {
              A.sfx.pop();
              slots[placed].textContent = b.t;
              slots[placed].classList.add('filled');
              btn.disabled = true;
              btn.classList.add('used');
              placed++;
              if (placed === tokens.length) {
                if (firstTry) { firstTryCount++; comboBonus += comboHit(shell); }
                shell.markDot(qi);
                A.sfx.star();
                haptic(true);
                qi++;
                shell.after(420, () => speakAdvance(shell, sentence, next, { rate: 0.9 }));
              }
            } else {
              firstTry = false;
              comboMiss(shell);
              btn.classList.add('wrong');
              A.sfx.buzz();
              haptic(false);
              shell.after(450, () => btn.classList.remove('wrong'));
            }
          });
        });
      }

      next();
    }
  };

  /* =========================================================
     GAME — Silly or Sensible? (reading for meaning)
     Read a sentence, judge it. You can't spot the silly ones
     without actually understanding what you decoded.
     ========================================================= */
  const SILLY_TOTAL = 8;

  const sillyGame = {
    title: 'Silly or Sensible?',
    icon: '🤪',
    desc: 'Does it make sense?',
    start(container, ctx) {
      const shell = roundShell(container, ctx, 'Silly or Sensible?', SILLY_TOTAL);
      const pool = (D.SILLY && D.SILLY[ctx.grade]) || [];
      const round = sample(pool, Math.min(SILLY_TOTAL, pool.length));
      if (!round.length) { shell.die(); ctx.quit(); return; }
      let qi = 0;
      let firstTryCount = 0;
      let comboBonus = 0;

      function next() {
        if (!shell.live) return;
        if (qi >= round.length) {
          shell.die();
          ctx.finish(quizResult(firstTryCount, round.length, `${firstTryCount} of ${round.length} spotted on the first try!`, comboBonus));
          return;
        }
        shell.nowDot(qi);
        ask(round[qi]);
      }

      function ask(item) {
        let firstTry = true;
        let answered = false;
        shell.area.innerHTML = `
          <div class="prompt">
            <h2>Read it. Does it make sense?</h2>
            <button class="flashcard sentences tappable sillycard" data-act="say">${item.t}</button>
          </div>
          <div class="bigjudge">
            <button class="btn good big" data-j="0">✓ Makes sense</button>
            <button class="btn big sillybtn" data-j="1">🤪 Silly!</button>
          </div>`;
        const say = () => A.speak(item.t, { rate: 0.85 });
        shell.area.querySelector('[data-act="say"]').addEventListener('click', say);
        shell.area.querySelectorAll('[data-j]').forEach(btn => {
          btn.addEventListener('click', () => {
            if (answered) return;
            if ((btn.dataset.j === '1') === !!item.silly) {
              answered = true;
              A.sfx.ding();
              haptic(true);
              if (firstTry) { firstTryCount++; comboBonus += comboHit(shell); }
              shell.markDot(qi);
              qi++;
              speakAdvance(shell, item.silly ? 'Ha! So silly!' : 'Yes! That makes sense!', next, { rate: 0.95 });
            } else {
              firstTry = false;
              comboMiss(shell);
              btn.classList.add('shake');
              shell.after(450, () => btn.classList.remove('shake'));
              A.sfx.buzz();
              haptic(false);
              say(); /* hearing it read helps them re-judge */
            }
          });
        });
      }

      next();
    }
  };

  /* =========================================================
     GAME — Riddle Time (inference)
     ========================================================= */
  const RIDDLE_TOTAL = 6;

  const riddleGame = {
    title: 'Riddle Time',
    icon: '🕵️',
    desc: 'Read the riddle, crack it!',
    start(container, ctx) {
      const shell = roundShell(container, ctx, 'Riddle Time', RIDDLE_TOTAL);
      const pool = (D.RIDDLES && D.RIDDLES[ctx.grade]) || [];
      const round = sample(pool, Math.min(RIDDLE_TOTAL, pool.length));
      if (!round.length) { shell.die(); ctx.quit(); return; }
      let qi = 0;
      let firstTryCount = 0;
      let comboBonus = 0;

      function next() {
        if (!shell.live) return;
        if (qi >= round.length) {
          shell.die();
          ctx.finish(quizResult(firstTryCount, round.length, `${firstTryCount} of ${round.length} riddles cracked on the first try!`, comboBonus));
          return;
        }
        shell.nowDot(qi);
        ask(round[qi]);
      }

      function ask(r) {
        let firstTry = true;
        let answered = false;
        const choices = r.choices;
        shell.area.innerHTML = `
          <div class="prompt">
            <div class="riddlecard">${r.q}</div>
            <button class="btn ghost" data-act="say">🔊 Read it to me</button>
          </div>
          <div class="choices pics">
            ${choices.map((c, i) => `
              <button class="choice pic labeled" data-i="${i}">
                <span class="pemoji">${c.e}</span>
                <span class="plabel">${c.t}</span>
              </button>`).join('')}
          </div>`;
        shell.area.querySelector('[data-act="say"]').addEventListener('click', () => A.speak(r.q, { rate: 0.85 }));
        shell.area.querySelectorAll('.choice').forEach(btn => {
          btn.addEventListener('click', () => {
            if (answered) return;
            if (+btn.dataset.i === r.a) {
              answered = true;
              btn.classList.add('correct');
              A.sfx.ding();
              haptic(true);
              if (firstTry) { firstTryCount++; comboBonus += comboHit(shell); }
              shell.markDot(qi);
              qi++;
              speakAdvance(shell, `${choices[r.a].t}! You cracked it!`, next, { rate: 0.95 });
            } else {
              firstTry = false;
              comboMiss(shell);
              btn.classList.add('wrong');
              A.sfx.buzz();
              haptic(false);
            }
          });
        });
      }

      next();
    }
  };

  /* =========================================================
     GAME — Word Factory (morphology, grades 2-5)
     Phase 1: build the word from its parts. Phase 2: what does
     the built word mean? Affixes are the vocabulary engine.
     ========================================================= */
  const MORPH_TOTAL = 6;

  const morphGame = {
    title: 'Word Factory',
    icon: '🏭',
    desc: 'Build big words from parts',
    grades: ['2', '3', '4', '5'],
    start(container, ctx) {
      const shell = roundShell(container, ctx, 'Word Factory', MORPH_TOTAL);
      const pool = (D.MORPH && D.MORPH[ctx.grade]) || [];
      const round = sample(pool, Math.min(MORPH_TOTAL, pool.length));
      if (!round.length) { shell.die(); ctx.quit(); return; }
      let qi = 0;
      let firstTryCount = 0;
      let comboBonus = 0;

      function next() {
        if (!shell.live) return;
        if (qi >= round.length) {
          shell.die();
          ctx.finish(quizResult(firstTryCount, round.length, `${firstTryCount} of ${round.length} words built and understood!`, comboBonus));
          return;
        }
        shell.nowDot(qi);
        build(round[qi]);
      }

      function build(item) {
        const affix = item.pre || item.suf;
        const isPre = !!item.pre;
        const others = pool.filter(x => x !== item);
        const decoyAffix = sample(others.map(x => x.pre || x.suf).filter(a => a && a !== affix), 1)[0] || 're';
        const decoyBase = sample(others.map(x => x.base).filter(b => b !== item.base), 1)[0] || 'play';
        const expected = isPre ? [affix, item.base] : [item.base, affix];
        const bank = shuffle([affix, item.base, decoyAffix, decoyBase]);
        let placed = 0;
        let firstTry = true;

        shell.area.innerHTML = `
          <div class="prompt">
            <button class="bigpic small" data-act="say" aria-label="${item.word}">${item.e}</button>
            <h2>Build the word “${item.word}”!</h2>
            <div class="slots">
              <div class="slot wordslot"></div><div class="slot wordslot"></div>
            </div>
          </div>
          <div class="tiles bank">
            ${bank.map((t, i) => `<button class="tile wordtile" data-i="${i}">${t}</button>`).join('')}
          </div>`;
        const say = () => A.speak(item.word, { rate: 0.8 });
        shell.area.querySelector('[data-act="say"]').addEventListener('click', say);
        shell.after(350, say);
        const slots = shell.area.querySelectorAll('.slot');

        shell.area.querySelectorAll('.tile').forEach(btn => {
          btn.addEventListener('click', () => {
            if (btn.disabled) return;
            if (bank[+btn.dataset.i] === expected[placed]) {
              A.sfx.pop();
              slots[placed].textContent = expected[placed];
              slots[placed].classList.add('filled');
              btn.disabled = true;
              btn.classList.add('used');
              placed++;
              if (placed === 2) {
                A.sfx.star();
                haptic(true);
                const eq = document.createElement('div');
                eq.className = 'morpheq';
                eq.textContent = `${expected[0]} + ${expected[1]} = ${item.word}!`;
                shell.area.appendChild(eq);
                shell.after(500, () => speakAdvance(shell, `${expected.join('... ')}... ${item.word}!`, () => meaning(item, firstTry), { rate: 0.85 }));
              }
            } else {
              firstTry = false;
              comboMiss(shell);
              btn.classList.add('wrong');
              A.sfx.buzz();
              haptic(false);
              shell.after(450, () => btn.classList.remove('wrong'));
            }
          });
        });
      }

      function meaning(item, cleanSoFar) {
        if (!shell.live) return;
        let firstTry = cleanSoFar;
        let answered = false;
        const opts = shuffle([{ t: item.meaning, ok: true }].concat(item.foils.map(f => ({ t: f, ok: false }))));
        shell.area.innerHTML = `
          <div class="prompt">
            <h2>What does <b>${item.word}</b> mean?</h2>
          </div>
          <div class="choices meanings">
            ${opts.map((o, i) => `<button class="choice meaningpick" data-i="${i}">${o.t}</button>`).join('')}
          </div>`;
        A.speak(`What does ${item.word} mean?`, { rate: 0.9 });
        shell.area.querySelectorAll('.choice').forEach(btn => {
          btn.addEventListener('click', () => {
            if (answered) return;
            if (opts[+btn.dataset.i].ok) {
              answered = true;
              btn.classList.add('correct');
              A.sfx.ding();
              haptic(true);
              if (firstTry) { firstTryCount++; comboBonus += comboHit(shell); }
              shell.markDot(qi);
              qi++;
              speakAdvance(shell, `Yes! ${item.word} means ${item.meaning}!`, next, { rate: 0.9 });
            } else {
              firstTry = false;
              comboMiss(shell);
              btn.classList.add('wrong');
              A.sfx.buzz();
              haptic(false);
            }
          });
        });
      }

      next();
    }
  };

  /* =========================================================
     GAME — Opposites & Twins (synonyms / antonyms)
     ========================================================= */
  const TWINS_TOTAL = 8;

  const twinsGame = {
    title: 'Opposites & Twins',
    icon: '🪞',
    desc: 'Opposite or same — find it!',
    start(container, ctx) {
      const shell = roundShell(container, ctx, 'Opposites & Twins', TWINS_TOTAL);
      const data = (D.PAIRS && D.PAIRS[ctx.grade]) || { ant: [], syn: [] };
      const qs = shuffle(
        sample(data.ant, Math.min(4, data.ant.length)).map(pair => ({ kind: 'ant', pair }))
          .concat(sample(data.syn, Math.min(4, data.syn.length)).map(pair => ({ kind: 'syn', pair })))
      );
      if (!qs.length) { shell.die(); ctx.quit(); return; }
      /* distractor vocabulary: every word from the grade's other pairs */
      const allWords = data.ant.concat(data.syn).flat();
      let qi = 0;
      let firstTryCount = 0;
      let comboBonus = 0;

      function next() {
        if (!shell.live) return;
        if (qi >= qs.length) {
          shell.die();
          ctx.finish(quizResult(firstTryCount, qs.length, `${firstTryCount} of ${qs.length} matched on the first try!`, comboBonus));
          return;
        }
        shell.nowDot(qi);
        ask(qs[qi]);
      }

      function ask(q) {
        const flip = Math.random() < 0.5;
        const promptWord = flip ? q.pair[1] : q.pair[0];
        const answer = flip ? q.pair[0] : q.pair[1];
        const decoys = shuffle(allWords.filter(w => w !== promptWord && w !== answer)).slice(0, 2);
        const choices = shuffle([answer].concat(decoys));
        let firstTry = true;
        let answered = false;
        shell.area.innerHTML = `
          <div class="prompt">
            <div class="promptword">${promptWord}</div>
            <h2>${q.kind === 'ant' ? `Which is the <b>OPPOSITE</b> of ${promptWord}?` : `Which means the <b>SAME</b> as ${promptWord}?`}</h2>
          </div>
          <div class="choices words">
            ${choices.map((c, i) => `<button class="choice wordpick" data-i="${i}">${c}</button>`).join('')}
          </div>`;
        shell.after(350, () => A.speak(`${q.kind === 'ant' ? 'Which word is the opposite of' : 'Which word means the same as'} ${promptWord}?`, { rate: 0.9 }));
        shell.area.querySelectorAll('.choice').forEach(btn => {
          btn.addEventListener('click', () => {
            if (answered) return;
            if (choices[+btn.dataset.i] === answer) {
              answered = true;
              btn.classList.add('correct');
              A.sfx.ding();
              haptic(true);
              if (firstTry) { firstTryCount++; comboBonus += comboHit(shell); }
              shell.markDot(qi);
              qi++;
              speakAdvance(shell, `${promptWord} and ${answer}! ${q.kind === 'ant' ? 'Opposites!' : 'Twins!'}`, next, { rate: 0.9 });
            } else {
              firstTry = false;
              comboMiss(shell);
              btn.classList.add('wrong');
              A.sfx.buzz();
              haptic(false);
            }
          });
        });
      }

      next();
    }
  };

  /* =========================================================
     GAME — Word Chains (phoneme manipulation, grades K-2)
     cat → hat → hot → hop: change one letter at a time.
     ========================================================= */
  const chainsGame = {
    title: 'Word Chains',
    icon: '🔗',
    desc: 'Change one letter, new word!',
    grades: ['K', '1', '2'],
    start(container, ctx) {
      const pool = (D.CHAINS && D.CHAINS[ctx.grade]) || [];
      const picked = sample(pool, Math.min(2, pool.length));
      /* each chain of 4 steps = 3 letter-swap questions */
      const steps = [];
      picked.forEach(ch => {
        for (let i = 0; i < ch.steps.length - 1; i++) steps.push({ from: ch.steps[i], to: ch.steps[i + 1] });
      });
      const shell = roundShell(container, ctx, 'Word Chains', steps.length);
      if (!steps.length) { shell.die(); ctx.quit(); return; }
      let qi = 0;
      let firstTryCount = 0;
      let comboBonus = 0;

      function next() {
        if (!shell.live) return;
        if (qi >= steps.length) {
          shell.die();
          ctx.finish(quizResult(firstTryCount, steps.length, `${firstTryCount} of ${steps.length} swaps on the first try!`, comboBonus));
          return;
        }
        shell.nowDot(qi);
        ask(steps[qi]);
      }

      function ask(st) {
        let diff = 0;
        for (let i = 0; i < st.from.length; i++) if (st.from[i] !== st.to[i]) { diff = i; break; }
        const correct = st.to[diff];
        const decoys = shuffle('abcdefghijklmnopqrstuvwxyz'.split('').filter(l => l !== correct && l !== st.from[diff])).slice(0, 2);
        const choices = shuffle([correct].concat(decoys));
        let firstTry = true;
        let answered = false;
        shell.area.innerHTML = `
          <div class="prompt">
            <h2>Turn <b>${st.from}</b> into…</h2>
            <button class="speaker" data-act="say" aria-label="Hear the new word">🔊</button>
            <div class="tiles">
              ${st.from.split('').map((l, i) => `<span class="tile gaptile ${i === diff ? 'gap' : ''}" data-t="${i}">${l}</span>`).join('')}
            </div>
            <h2 class="chainhint">Which letter makes the new word?</h2>
          </div>
          <div class="choices letters">
            ${choices.map((c, i) => `<button class="choice letter" data-i="${i}">${c.toUpperCase()} <small>${c}</small></button>`).join('')}
          </div>`;
        const say = () => A.speak(`Make it say ${st.to}!`, { rate: 0.8 });
        shell.area.querySelector('[data-act="say"]').addEventListener('click', () => A.speak(st.to, { rate: 0.75 }));
        shell.after(350, say);
        shell.area.querySelectorAll('.choice').forEach(btn => {
          btn.addEventListener('click', () => {
            if (answered) return;
            if (choices[+btn.dataset.i] === correct) {
              answered = true;
              btn.classList.add('correct');
              const tile = shell.area.querySelector(`[data-t="${diff}"]`);
              if (tile) { tile.textContent = correct; tile.classList.add('lit'); tile.classList.remove('gap'); }
              A.sfx.ding();
              haptic(true);
              if (firstTry) { firstTryCount++; comboBonus += comboHit(shell); }
              shell.markDot(qi);
              qi++;
              speakAdvance(shell, `${st.from}… ${st.to}! You changed it!`, next, { rate: 0.85 });
            } else {
              firstTry = false;
              comboMiss(shell);
              btn.classList.add('wrong');
              A.sfx.buzz();
              haptic(false);
            }
          });
        });
      }

      next();
    }
  };

  /* =========================================================
     GAME — Real or Nonsense? (decoding discrimination)
     45-second lightning: pop only the real words. Pseudo-words
     are how reading science checks true decoding — disguised
     as an arcade round.
     ========================================================= */
  const NONSENSE_SECS = 45;
  const NONSENSE_CFG = { three: 14, two: 9 };

  const nonsenseGame = {
    title: 'Real or Nonsense?',
    icon: '👾',
    desc: 'Spot the made-up words!',
    start(container, ctx) {
      const shell = roundShell(container, ctx, 'Real or Nonsense?', 1);
      shell.dots.forEach(d => d.remove());
      const reals = sample(D.WORDS[ctx.grade].map(w => w.w).concat(D.SIGHT[ctx.grade] || []), 20);
      const fakes = sample((D.NONSENSE && D.NONSENSE[ctx.grade]) || [], 20);
      const deck = shuffle(reals.map(w => ({ w, real: true })).concat(fakes.map(w => ({ w, real: false }))));
      const wordKey = w => {
        if (D.WORDS[ctx.grade].some(x => x.w === w)) return 'w:' + w;
        if ((D.SIGHT[ctx.grade] || []).includes(w)) return 's:' + w;
        return null;
      };

      introCard(shell, {
        emoji: '👾',
        title: 'Real or Nonsense?',
        lines: [
          'Some of these are REAL words. Some are totally made up!',
          'Read each one and decide — fast!'
        ],
        buttonText: '🚦 Ready, set, read!',
        onStart: run
      });

      function run() {
        let i = 0;
        let score = 0;
        const outcomes = [];
        const tEnd = Date.now() + NONSENSE_SECS * 1000;

        const iv = setInterval(() => {
          if (!shell.live) { clearInterval(iv); return; }
          const left = Math.max(0, (tEnd - Date.now()) / 1000);
          const bar = shell.area.querySelector('.timebar i');
          const num = shell.area.querySelector('.timeleft');
          if (bar) bar.style.width = (left / NONSENSE_SECS * 100) + '%';
          if (num) num.textContent = Math.ceil(left) + 's';
          if (left <= 0) { clearInterval(iv); finish(); }
        }, 200);
        shell.timers.push(iv);

        function show() {
          if (!shell.live || Date.now() >= tEnd) return;
          const item = deck[i % deck.length];
          shell.area.innerHTML = `
            <div class="speedtop">
              <span class="timeleft">${NONSENSE_SECS}s</span>
              <div class="timebar"><i style="width:100%"></i></div>
              <span class="scorenum">⭐ ${score}</span>
            </div>
            <div class="flashcard words">${item.w}</div>
            <div class="bigjudge">
              <button class="btn good big" data-j="1">👍 Real word</button>
              <button class="btn big sillybtn" data-j="0">👾 Made up!</button>
            </div>`;
          shell.area.querySelectorAll('[data-j]').forEach(btn => {
            btn.addEventListener('click', () => {
              const saidReal = btn.dataset.j === '1';
              const key = item.real ? wordKey(item.w) : null;
              if (saidReal === item.real) {
                score++;
                if (key) outcomes.push({ k: key, ok: true });
                A.sfx.tick();
              } else {
                if (key) outcomes.push({ k: key, ok: false });
                A.sfx.buzz();
                haptic(false);
              }
              i++;
              show();
            });
          });
        }

        function finish() {
          if (!shell.live) return;
          const stars = score >= NONSENSE_CFG.three ? 3 : score >= NONSENSE_CFG.two ? 2 : 1;
          shell.die();
          ctx.finish({
            stars,
            score,
            coins: score * 2 + stars * 5,
            outcomes,
            line1: `You judged ${score} words in ${NONSENSE_SECS} seconds!`
          });
        }

        show();
      }
    }
  };

  /* =========================================================
     GAME — Story Scramble (sequencing comprehension)
     Put the pages of a book you've READ back in story order.
     ========================================================= */
  const scrambleGame = {
    title: 'Story Scramble',
    icon: '📜',
    desc: 'Put the story in order',
    start(container, ctx) {
      const shell = roundShell(container, ctx, 'Story Scramble', 1);
      const readBooks = (D.BOOKS[ctx.grade] || []).concat(S.customBooks())
        .filter(b => ((ctx.profile.stats['book-' + b.id] || {}).reads || 0) >= 1 && b.pages.length >= 3);

      if (!readBooks.length) {
        shell.dots.forEach(d => d.remove());
        introCard(shell, {
          emoji: '📜',
          title: 'Read a book first!',
          lines: ['Story Scramble mixes up a book you know.', 'Read any Story Book, then come back!'],
          buttonText: '📚 Go read a book!',
          onStart: () => { shell.die(); RR.nav.game('books'); }
        });
        return;
      }

      const rounds = sample(readBooks, Math.min(2, readBooks.length));
      /* dots = one per page-tap across all rounds */
      const totalTaps = rounds.reduce((n, b) => n + Math.min(4, b.pages.length), 0);
      shell.dots.forEach(d => d.remove());
      let ri = 0;
      let tapped = 0;
      let firstTryCount = 0;
      let comboBonus = 0;

      function next() {
        if (!shell.live) return;
        if (ri >= rounds.length) {
          shell.die();
          ctx.finish(quizResult(firstTryCount, totalTaps, `You put ${rounds.length} ${rounds.length === 1 ? 'story' : 'stories'} back together!`, comboBonus));
          return;
        }
        ask(rounds[ri]);
      }

      function ask(book) {
        const count = Math.min(4, book.pages.length);
        const start = (Math.random() * (book.pages.length - count + 1)) | 0;
        const pages = book.pages.slice(start, start + count).map((pg, order) => ({ pg, order }));
        const shown = shuffle(pages);
        let expect = 0;
        shell.area.innerHTML = `
          <div class="prompt">
            <h2>Put “${book.title}” in order!</h2>
            <p class="muted">Tap what happens first, then next…</p>
          </div>
          <div class="scramlist">
            ${shown.map((x, i) => `
              <button class="scramrow" data-i="${i}">
                <span class="scramnum empty">?</span>
                <span>${x.pg.a} ${x.pg.t}</span>
              </button>`).join('')}
          </div>`;
        shell.area.querySelectorAll('.scramrow').forEach(btn => {
          let firstTry = true;
          btn.addEventListener('click', () => {
            const x = shown[+btn.dataset.i];
            if (btn.classList.contains('locked')) return;
            if (x.order === expect) {
              expect++;
              tapped++;
              btn.classList.add('locked');
              const numEl = btn.querySelector('.scramnum');
              numEl.textContent = expect;
              numEl.classList.remove('empty');
              A.sfx.pop();
              if (firstTry) { firstTryCount++; comboBonus += comboHit(shell); }
              if (expect === count) {
                A.sfx.star();
                haptic(true);
                ri++;
                speakAdvance(shell, "That's the story! Great remembering!", next, { rate: 0.95 });
              }
            } else {
              firstTry = false;
              comboMiss(shell);
              btn.classList.add('shake');
              A.sfx.buzz();
              haptic(false);
              shell.after(450, () => btn.classList.remove('shake'));
            }
          });
        });
      }

      next();
    }
  };

  /* =========================================================
     GAME 4 — Rhyme Time (phonemic awareness)
     ========================================================= */
  function rimeOf(word) {
    const m = word.match(/[aeiou]/);
    return m ? word.slice(m.index) : word;
  }

  /* Grades 3+ mix in grade 2-3 words so there are enough rhyme partners —
     long multisyllable words rarely rhyme with each other. */
  function rhymePoolFor(grade) {
    if (grade === '3') return D.WORDS[2].concat(D.WORDS[3]);
    if (grade === '4' || grade === '5') return D.WORDS[2].concat(D.WORDS[3], D.WORDS[grade]);
    return D.WORDS[grade];
  }

  const rhymeGame = {
    title: 'Rhyme Time',
    icon: '🎵',
    desc: 'Find the word that rhymes',
    grades: ['K', '1', '2', '3'], /* phonemic-awareness skill — too easy past 3rd */
    start(container, ctx) {
      const shell = roundShell(container, ctx, 'Rhyme Time', TOTAL_Q);
      const pool = rhymePoolFor(ctx.grade);
      const families = {};
      for (const w of pool) (families[rimeOf(w.w)] = families[rimeOf(w.w)] || []).push(w);
      const rhymable = pool.filter(w => families[rimeOf(w.w)].length >= 2);

      const round = sample(rhymable, TOTAL_Q);
      let qi = 0;
      let firstTryCount = 0;
      let comboBonus = 0;

      function next() {
        if (!shell.live) return;
        if (qi >= TOTAL_Q) {
          shell.die();
          ctx.finish(quizResult(firstTryCount, TOTAL_Q, `${firstTryCount} of ${TOTAL_Q} rhymes on the first try!`, comboBonus));
          return;
        }
        shell.nowDot(qi);
        ask(round[qi]);
      }

      function ask(target) {
        const rime = rimeOf(target.w);
        const partner = sample(families[rime].filter(w => w.w !== target.w), 1)[0];
        const nonRhyming = pool.filter(w => rimeOf(w.w) !== rime);
        const dc = diffChoices(ctx);
        const choices = withDistractors(partner, nonRhyming, dc.n, x => x.w, dc.hard ? wordSim : null);
        let firstTry = true;
        let answered = false;

        shell.area.innerHTML = `
          <div class="prompt">
            <button class="bigpic" data-act="replay" aria-label="${target.w}">${target.e}</button>
            <div class="promptword">${target.w}</div>
            <h2>Which one rhymes with <b>${target.w}</b>?</h2>
          </div>
          <div class="choices pics">
            ${choices.map((c, i) => `
              <button class="choice pic labeled" data-i="${i}">
                <span class="pemoji">${c.e}</span>
                <span class="plabel">${c.w}</span>
              </button>`).join('')}
          </div>`;

        const say = () => A.speak(`Which one rhymes with ${target.w}?`, { rate: 0.9 });
        shell.area.querySelector('[data-act="replay"]').addEventListener('click', () => A.speak(target.w));
        shell.after(350, say);

        shell.area.querySelectorAll('.choice').forEach(btn => {
          btn.addEventListener('click', () => {
            if (answered) return;
            const c = choices[+btn.dataset.i];
            if (c === partner) {
              answered = true;
              btn.classList.add('correct');
              A.sfx.ding();
              haptic(true);
              if (firstTry) { firstTryCount++; comboBonus += comboHit(shell); }
              shell.markDot(qi);
              qi++;
              speakAdvance(shell, `${target.w}… ${c.w}! They rhyme!`, next, { rate: 0.9 });
            } else {
              firstTry = false;
              comboMiss(shell);
              btn.classList.add('wrong');
              A.sfx.buzz();
              haptic(false);
              A.speak(c.w, { rate: 0.95 });
            }
          });
        });
      }

      next();
    }
  };

  /* =========================================================
     GAME 5 — Speed Reader (fluency)
     K/1: flash words.  2/3: read sentences. Honor system —
     a grown-up listens while the reader reads out loud.
     ========================================================= */
  const SPEED_CFG = {
    K:   { mode: 'words', count: 10, three: 15, two: 8 },   /* thresholds in WPM */
    1:   { mode: 'words', count: 10, three: 25, two: 12 },
    2:   { mode: 'sentences', count: 5, three: 55, two: 30 },
    3:   { mode: 'sentences', count: 5, three: 75, two: 45 },
    4:   { mode: 'sentences', count: 5, three: 90, two: 55 },
    5:   { mode: 'sentences', count: 5, three: 100, two: 65 }
  };

  const flashGame = {
    title: 'Speed Reader',
    icon: '⚡',
    desc: 'Read out loud, beat the clock',
    start(container, ctx) {
      const cfg = SPEED_CFG[ctx.grade];
      const items = cfg.mode === 'words'
        ? sample(D.WORDS[ctx.grade], cfg.count).map(w => w.w)
        : sample(D.SENTENCES[ctx.grade], cfg.count);
      const totalWords = items.join(' ').split(/\s+/).length;

      const shell = roundShell(container, ctx, 'Speed Reader', items.length);
      let i = 0;
      let t0 = 0;
      let timerInt = null;

      introCard(shell, {
        emoji: '⚡',
        title: cfg.mode === 'words' ? 'Word Lightning!' : 'Sentence Sprint!',
        lines: [
          cfg.mode === 'words'
            ? 'Read each word OUT LOUD, then tap the big green check.'
            : 'Read each sentence OUT LOUD, then tap the big green check.',
          '👨‍👩‍👧 Grown-ups: listen along and cheer!'
        ],
        buttonText: '🚦 Ready, set, read!',
        onStart: run
      });

      function run() {
        t0 = Date.now();
        timerInt = setInterval(() => {
          const el = shell.area.querySelector('.clock');
          if (el) el.textContent = ((Date.now() - t0) / 1000).toFixed(0) + 's';
        }, 250);
        shell.timers.push(timerInt);
        show();
      }

      function show() {
        if (!shell.live) return;
        if (i >= items.length) { finish(); return; }
        shell.nowDot(i);
        const listening = RR.voice && RR.voice.enabled();
        shell.area.innerHTML = `
          <div class="speedtop"><span class="clock">0s</span>${listening ? '<span class="micchip">🎤 listening</span>' : ''}</div>
          <div class="flashcard ${cfg.mode}">${items[i]}</div>
          <div class="speedbtns">
            <button class="btn good big" data-act="done">✓ I read it!</button>
            ${cfg.mode === 'words' ? '<button class="btn ghost" data-act="hint">🔊 Help</button>' : ''}
          </div>`;
        const advance = () => {
          if (!shell.live) return;
          shell.markDot(i);
          i++;
          show();
        };
        shell.area.querySelector('[data-act="done"]').addEventListener('click', () => { A.sfx.tick(); advance(); });
        const hint = shell.area.querySelector('[data-act="hint"]');
        if (hint) hint.addEventListener('click', () => A.speak(items[i], { rate: 0.8 }));
        /* Listen mode: hearing the card read auto-advances — the tap stays as fallback */
        if (listening) RR.voice.listen({
          expect: items[i],
          minScore: cfg.mode === 'words' ? 1 : 0.75,
          timeoutMs: 30000,
          onMatch() {
            if (!shell.live) return;
            A.sfx.ding();
            const card = shell.area.querySelector('.flashcard');
            if (card) card.classList.add('heardcard');
            shell.after(350, advance);
          }
        });
      }

      function finish() {
        clearInterval(timerInt);
        const secs = Math.max(1, (Date.now() - t0) / 1000);
        const wpm = Math.round((totalWords / secs) * 60);
        const stars = wpm >= cfg.three ? 3 : wpm >= cfg.two ? 2 : 1;
        const secsRound = Math.max(1, Math.round(secs));
        shell.die();
        ctx.finish({
          stars,
          wpm,
          coins: stars * 5 + Math.min(30, Math.round(wpm / 4)),
          line1: `${totalWords} words in ${secsRound} ${secsRound === 1 ? 'second' : 'seconds'}`
        });
      }
    }
  };

  /* =========================================================
     GAME 6 — Sight Words (instant-recognition fluency)
     Warm-up mode (listen + read) and a 45s Lightning Round.
     ========================================================= */
  const SIGHT_CFG = { K: { three: 10, two: 6 }, 1: { three: 12, two: 8 }, 2: { three: 14, two: 9 }, 3: { three: 16, two: 10 }, 4: { three: 18, two: 12 }, 5: { three: 20, two: 13 } };
  const LIGHTNING_SECS = 45;

  const sightGame = {
    title: 'Sight Words',
    icon: '👀',
    desc: 'Know them in a snap',
    start(container, ctx) {
      const list = D.SIGHT[ctx.grade];
      const cfg = SIGHT_CFG[ctx.grade];
      const shell = roundShell(container, ctx, 'Sight Words', 1);
      shell.dots.forEach(d => d.remove());

      introCard(shell, {
        emoji: '👀',
        title: 'Sight Words',
        lines: [
          'Sight words are words your eyes should know in a snap — no sounding out!',
          'Warm up first, or jump into the Lightning Round.'
        ],
        buttonText: '⚡ Lightning Round',
        extraButtons: '<button class="btn ghost big" data-act="warmup">👂 Warm-up</button>',
        onStart: lightning
      });
      shell.area.querySelector('[data-act="warmup"]').addEventListener('click', warmup);

      /* Calm flashcards with audio. */
      function warmup() {
        const cards = sample(list, 8);
        let i = 0;
        function show() {
          if (!shell.live) return;
          if (i >= cards.length) {
            shell.die();
            ctx.finish({ stars: 1, coins: 5, line1: 'Warm-up complete — now try the Lightning Round!' });
            return;
          }
          shell.area.innerHTML = `
            <div class="speedtop"><span class="muted">${i + 1} of ${cards.length}</span></div>
            <button class="flashcard words tappable" data-act="say">${cards[i]}</button>
            <div class="speedbtns">
              <button class="btn ghost" data-act="say2">🔊 Hear it</button>
              <button class="btn big" data-act="next">Next →</button>
            </div>`;
          const say = () => A.speak(cards[i], { rate: 0.8 });
          shell.after(300, say);
          shell.area.querySelector('[data-act="say"]').addEventListener('click', say);
          shell.area.querySelector('[data-act="say2"]').addEventListener('click', say);
          shell.area.querySelector('[data-act="next"]').addEventListener('click', () => { A.sfx.tick(); i++; show(); });
        }
        show();
      }

      /* 45-second read-as-many-as-you-can. Unmastered words come first. */
      function lightning() {
        const deck = smartSample(ctx.profile, list, list.length, s => 's:' + s).concat(shuffle(list));
        let i = 0;
        let score = 0;
        const tricky = [];
        const outcomes = [];
        const tEnd = Date.now() + LIGHTNING_SECS * 1000;

        const iv = setInterval(() => {
          if (!shell.live) { clearInterval(iv); return; }
          const left = Math.max(0, (tEnd - Date.now()) / 1000);
          const bar = shell.area.querySelector('.timebar i');
          const num = shell.area.querySelector('.timeleft');
          if (bar) bar.style.width = (left / LIGHTNING_SECS * 100) + '%';
          if (num) num.textContent = Math.ceil(left) + 's';
          if (left <= 0) { clearInterval(iv); finish(); }
        }, 200);
        shell.timers.push(iv);

        function show() {
          if (!shell.live || Date.now() >= tEnd) return;
          const listening = RR.voice && RR.voice.enabled();
          shell.area.innerHTML = `
            <div class="speedtop">
              <span class="timeleft">${LIGHTNING_SECS}s</span>
              <div class="timebar"><i style="width:100%"></i></div>
              <span class="scorenum">⭐ ${score}</span>${listening ? '<span class="micchip">🎤</span>' : ''}
            </div>
            <div class="flashcard words">${deck[i]}</div>
            <div class="speedbtns">
              <button class="btn good big" data-act="got">✓ Read it!</button>
              <button class="btn ghost" data-act="skip">🤔 Tricky</button>
            </div>`;
          const got = () => {
            if (!shell.live || Date.now() >= tEnd) return;
            outcomes.push({ k: 's:' + deck[i], ok: true });
            score++; i = (i + 1) % deck.length; show();
          };
          shell.area.querySelector('[data-act="got"]').addEventListener('click', () => { A.sfx.tick(); got(); });
          shell.area.querySelector('[data-act="skip"]').addEventListener('click', () => {
            if (!tricky.includes(deck[i])) tricky.push(deck[i]);
            outcomes.push({ k: 's:' + deck[i], ok: false });
            A.sfx.pop(); i = (i + 1) % deck.length; show();
          });
          /* Listen mode: hearing the sight word scores it hands-free */
          if (listening) RR.voice.listen({
            expect: deck[i],
            minScore: 1,
            timeoutMs: 15000,
            onMatch() { A.sfx.ding(); got(); }
          });
        }

        function finish() {
          if (!shell.live) return;
          const stars = score >= cfg.three ? 3 : score >= cfg.two ? 2 : 1;
          shell.die();
          ctx.finish({
            stars,
            score,
            coins: score * 2 + stars * 5,
            outcomes,
            tricky,
            line1: `You read ${score} sight words in ${LIGHTNING_SECS} seconds!`,
            line2: tricky.length ? 'Tap the tricky words below to hear them:' : null
          });
        }

        show();
      }
    }
  };

  /* =========================================================
     Shared book reader — used by Story Books and the Story
     Campaign. The reader reads out loud; any word can be tapped
     for help, and a whole page can be read aloud. Fewer helps =
     more stars. opts: { onBack, onFinish(result) }.
     ========================================================= */
  function bookReader(container, book, opts) {
    let page = 0;
    let wordTaps = 0;
    let pageReads = 0;
    const totalWords = book.pages.reduce((n, p) => n + p.t.split(/\s+/).length, 0);

    function show() {
      A.stop();
      const pg = book.pages[page];
      const last = page === book.pages.length - 1;
      container.innerHTML = `
        <header class="gamebar">
          <button class="iconbtn" data-act="back" aria-label="Back">←</button>
          <div class="gametitle">${book.title}</div>
          <div class="dots">${book.pages.map((_, i) =>
            `<span class="dot ${i < page ? 'on' : i === page ? 'now' : ''}"></span>`).join('')}</div>
        </header>
        <div class="bookpage">
          <div class="bookart">${pg.a}</div>
          <p class="booktext">${pg.t.split(/\s+/).map(tok => {
            const clean = tok.replace(/[^a-zA-Z'’-]/g, '');
            return clean
              ? `<button class="word" data-w="${clean}">${tok}</button>`
              : `<span class="word plain">${tok}</span>`;
          }).join(' ')}</p>
        </div>
        <div class="bookctrl">
          <button class="iconbtn" data-act="prev" aria-label="Back a page" ${page === 0 ? 'disabled' : ''}>←</button>
          <button class="btn ghost" data-act="readme">🔊 Read to me</button>
          <button class="btn big ${last ? 'good' : ''}" data-act="next">${last ? 'Finish! 🎉' : 'Next →'}</button>
          ${RR.voice && RR.voice.enabled() ? '<span class="micchip">🎤 listening</span>' : ''}
        </div>`;

      /* Listen mode: words light up green as they're read out loud.
         Purely celebratory — Next is never blocked. */
      if (RR.voice && RR.voice.enabled()) {
        const toks = pg.t.split(/\s+/);
        const allWords = container.querySelectorAll('.booktext .word');
        const map = []; /* want-index (normalized words) -> token index */
        toks.forEach((tok, ti) => { if (RR.voice.norm(tok)) map.push(ti); });
        RR.voice.listen({
          expect: pg.t,
          minScore: 0.85,
          timeoutMs: 60000,
          onPartial(idxs) {
            idxs.forEach(wi => {
              const el2 = allWords[map[wi]];
              if (el2) el2.classList.add('heard');
            });
          },
          onMatch() {
            A.sfx.ding();
            const chip = container.querySelector('.micchip');
            if (chip) chip.textContent = '✨ Great reading!';
          }
        });
      }

      container.querySelector('[data-act="back"]').addEventListener('click', () => { A.stop(); if (RR.voice) RR.voice.stop(); opts.onBack(); });
      container.querySelectorAll('.word[data-w]').forEach(w =>
        w.addEventListener('click', () => {
          wordTaps++;
          w.classList.add('lit');
          setTimeout(() => w.classList.remove('lit'), 700);
          A.speak(w.dataset.w, { rate: 0.75 });
        }));
      container.querySelector('[data-act="readme"]').addEventListener('click', () => {
        pageReads++;
        A.speak(pg.t, { rate: 0.85 });
      });
      const prev = container.querySelector('[data-act="prev"]');
      if (!prev.disabled) prev.addEventListener('click', () => { page--; A.sfx.page(); show(); });
      container.querySelector('[data-act="next"]').addEventListener('click', () => {
        if (last) {
          /* Books/episodes with a recall quiz go through it first; ones
             without a quiz field finish exactly as before. */
          if (Array.isArray(book.quiz) && book.quiz.length) { startQuiz(); return; }
          finish();
          return;
        }
        page++;
        A.sfx.page();
        show();
      });
    }

    /* Base reward from the decoding read — stars are earned here and are
       NEVER changed by the quiz. */
    function computeResult() {
      const helpScore = wordTaps + 4 * pageReads;
      const stars = helpScore <= 4 ? 3 : helpScore <= 12 ? 2 : 1;
      return {
        stars,
        coins: book.pages.length * 4 + stars * 5,
        line1: `You read “${book.title}” — ${book.pages.length} pages, ${totalWords} words!`,
        line2: stars === 3 ? 'All by yourself — amazing!'
             : stars === 2 ? 'Great reading!'
             : 'Great practice — read it again soon!'
      };
    }

    function finish() {
      A.stop();
      if (RR.voice) RR.voice.stop();
      opts.onFinish(computeResult());
    }

    /* =========================================================
       Comprehension quiz — 2 recall questions after the reading.
       Bonus-only: right answers add coins + a proud line; a wrong
       answer just shows the right one kindly. Stars never drop.
       ========================================================= */
    function startQuiz() {
      A.stop();
      if (RR.voice) RR.voice.stop();
      const quiz = book.quiz;
      let qi = 0;
      let quizCorrect = 0;
      let quizLive = true;

      /* Speak a line, then advance once it's been heard — mirrors
         speakAdvance, but inline since we're outside a roundShell. */
      function speakThenAdvance(text) {
        let done = false;
        const go = () => {
          if (done || !quizLive) return;
          done = true;
          setTimeout(() => { if (quizLive) { qi++; showQuestion(); } }, 350);
        };
        A.speak(text, { rate: 0.9, onend: go });
        setTimeout(go, 8000);
      }

      function showQuestion() {
        if (!quizLive) return;
        if (qi >= quiz.length) { finishWithQuiz(); return; }
        const q = quiz[qi];
        container.innerHTML = `
          <header class="gamebar">
            <button class="iconbtn" data-act="back" aria-label="Back">←</button>
            <div class="gametitle">${book.title}</div>
            <div class="dots">${quiz.map((_, i) =>
              `<span class="dot ${i < qi ? 'on' : i === qi ? 'now' : ''}"></span>`).join('')}</div>
          </header>
          <div class="quizhead">🤔 Quiz time! What do you remember?</div>
          <div class="prompt">
            <button class="speaker" data-act="replay" aria-label="Hear the question">🔊</button>
            <h2>${q.q}</h2>
          </div>
          <div class="choices pics">
            ${q.choices.map((c, i) => `
              <button class="choice pic labeled" data-i="${i}">
                <span class="pemoji">${c.e}</span>
                <span class="plabel">${c.t}</span>
              </button>`).join('')}
          </div>`;

        const say = () => A.speak(q.q, { rate: 0.9 });
        container.querySelector('[data-act="replay"]').addEventListener('click', say);
        container.querySelector('[data-act="back"]').addEventListener('click', () => {
          quizLive = false;
          A.stop();
          if (RR.voice) RR.voice.stop();
          opts.onBack();
        });
        setTimeout(() => { if (quizLive) say(); }, 350);

        let answered = false;
        container.querySelectorAll('.choice').forEach(btn => {
          btn.addEventListener('click', () => {
            if (answered) return;
            answered = true;
            container.querySelectorAll('.choice').forEach(x => x.disabled = true);
            const right = q.choices[q.a].t;
            if (+btn.dataset.i === q.a) {
              btn.classList.add('correct');
              A.sfx.ding();
              haptic(true);
              quizCorrect++;
              speakThenAdvance(`That's right! ${right}.`);
            } else {
              btn.classList.add('wrong');
              const rb = container.querySelector(`.choice[data-i="${q.a}"]`);
              if (rb) rb.classList.add('correct');
              A.sfx.buzz();
              haptic(false);
              speakThenAdvance(`Good try! It was ${right}.`);
            }
          });
        });
      }

      function finishWithQuiz() {
        A.stop();
        if (RR.voice) RR.voice.stop();
        const total = quiz.length;
        const result = computeResult();
        result.coins += 4 * quizCorrect;
        result.quiz = { correct: quizCorrect, total };
        const qline = quizCorrect === total
          ? `🤔 Quiz: ${quizCorrect}/${total} — you remembered everything!`
          : quizCorrect === 0
            ? '🤔 Quiz done — read it again and try the quiz next time!'
            : `🤔 Quiz: ${quizCorrect}/${total} — good remembering!`;
        result.line2 = result.line2 ? `${result.line2} ${qline}` : qline;
        opts.onFinish(result);
      }

      showQuestion();
    }

    show();
  }

  /* =========================================================
     GAME 7 — Story Books (connected reading)
     A library of decodable books per grade, on the shared reader.
     ========================================================= */
  const booksGame = {
    title: 'Story Books',
    icon: '📚',
    desc: 'Read a real book!',
    start(container, ctx) {
      /* built-in grade books + parent-authored family books (shown on every
         grade's shelf). Custom ids flow through stats['book-'+id] unchanged. */
      const books = (D.BOOKS[ctx.grade] || []).concat(S.customBooks());

      function library() {
        A.stop();
        container.innerHTML = `
          <header class="gamebar">
            <button class="iconbtn" data-act="back" aria-label="Back">←</button>
            <div class="gametitle">📚 Story Books</div>
          </header>
          <div class="bookshelf">
            ${books.map((b, i) => {
              const st = ctx.profile.stats['book-' + b.id];
              return `
                <button class="bookcard" data-i="${i}">
                  <span class="bookcover">${b.cover}</span>
                  <span class="booktitle">${b.title}</span>
                  <span class="bookmeta">${b.pages.length} pages${st ? ` · ✓ read ${st.reads}×` : ''}${b.custom ? ' · ⭐ Our book' : ''}</span>
                </button>`;
            }).join('')}
          </div>
          <p class="shophint">👨‍👩‍👧 Read OUT LOUD together. Stuck on a word? Tap it!</p>`;
        container.querySelector('[data-act="back"]').addEventListener('click', ctx.quit);
        container.querySelectorAll('.bookcard').forEach(b =>
          b.addEventListener('click', () => { A.sfx.whoosh(); reader(books[+b.dataset.i]); }));
      }

      function reader(book) {
        bookReader(container, book, {
          onBack: library,
          onFinish(result) {
            const st = ctx.profile.stats['book-' + book.id] || { reads: 0 };
            st.reads++;
            ctx.profile.stats['book-' + book.id] = st; /* persisted by recordRound's save */
            ctx.finish(result);
          }
        });
      }

      library();
    }
  };

  /* =========================================================
     GAME — Word Rescue (personalized review)
     A short round that targets the kid's OWN stuck words: hear a
     tricky word, pick how it's written, and "rescue" it. Falls
     back to least-mastered grade words when nothing is stuck.
     ========================================================= */
  const RESCUE_TOTAL = 6;
  const RESCUE_GRADES = ['K', '1', '2', '3', '4', '5'];

  const rescueGame = {
    title: 'Word Rescue',
    icon: '🛟',
    desc: 'Save your tricky words!',
    start(container, ctx) {
      /* Resolve a stuck mastery key back to something we can quiz. A word
         may have been learned in another grade, so we search every grade;
         a sight word only needs its string and its home grade (for choices). */
      const findWord = word => {
        for (const g of RESCUE_GRADES) {
          const hit = (D.WORDS[g] || []).find(w => w.w === word);
          if (hit) return { kind: 'word', word: hit, grade: g };
        }
        return null;
      };
      const findSight = word => {
        for (const g of RESCUE_GRADES) {
          if ((D.SIGHT[g] || []).includes(word)) return { kind: 'sight', word, grade: g };
        }
        return null;
      };

      const mastery = ctx.profile.mastery || {};
      const MASTER_AT = RR.progress.MASTER_AT;
      const used = new Set();
      const items = [];
      /* worst-missed first, drop keys that no longer resolve */
      Object.entries(mastery)
        .filter(([k, r]) => r.w >= 2 && r.c < MASTER_AT && (k.startsWith('w:') || k.startsWith('s:')))
        .sort((a, b) => b[1].w - a[1].w)
        .forEach(([k]) => {
          const resolved = k.startsWith('w:') ? findWord(k.slice(2)) : findSight(k.slice(2));
          if (resolved && !used.has(k)) { used.add(k); items.push(resolved); }
        });

      const troubleCount = items.length;
      /* top up with least-mastered words from this grade (smartSample weights
         struggled/unseen words to the front) */
      if (items.length < RESCUE_TOTAL) {
        const gradeWords = D.WORDS[ctx.grade] || [];
        smartSample(ctx.profile, gradeWords, gradeWords.length, w => 'w:' + w.w)
          .filter(w => !used.has('w:' + w.w))
          .slice(0, RESCUE_TOTAL - items.length)
          .forEach(w => { used.add('w:' + w.w); items.push({ kind: 'word', word: w, grade: ctx.grade }); });
      }

      const round = shuffle(items).slice(0, RESCUE_TOTAL);
      const total = round.length || 1;
      const hadTrouble = troubleCount > 0;

      const shell = roundShell(container, ctx, 'Word Rescue', total);
      let qi = 0;
      let firstTryCount = 0;
      let comboBonus = 0;
      const outcomes = [];

      introCard(shell, {
        emoji: '🛟',
        title: 'Word Rescue',
        lines: hadTrouble
          ? ['Some words got stuck — let’s save them!', 'Hear the word, then tap how it’s written.']
          : ['No stuck words right now! 🎉', 'Let’s practice so they stick even harder.'],
        buttonText: '🛟 Start the rescue!',
        onStart: next
      });

      function next() {
        if (!shell.live) return;
        if (qi >= total) {
          shell.die();
          const line1 = hadTrouble
            ? `You rescued ${firstTryCount} of ${total} words!`
            : 'No stuck words — practice makes them stick even harder!';
          const r = quizResult(firstTryCount, total, line1, comboBonus);
          r.outcomes = outcomes;
          ctx.finish(r);
          return;
        }
        shell.nowDot(qi);
        ask(round[qi]);
      }

      function ask(item) {
        const dc = diffChoices(ctx);
        let firstTry = true;
        let answered = false;
        let choices, correct, sayWord, outKey, picHtml, labelOf;
        if (item.kind === 'word') {
          correct = item.word;
          sayWord = item.word.w;
          outKey = 'w:' + item.word.w;
          choices = withDistractors(item.word, D.WORDS[item.grade], dc.n, x => x.w, dc.hard ? wordSim : null);
          labelOf = c => c.w;
          picHtml = `<button class="bigpic" data-act="replay" aria-label="${item.word.w}">${item.word.e}</button>`;
        } else {
          correct = item.word;
          sayWord = item.word;
          outKey = 's:' + item.word;
          choices = withDistractors(item.word, D.SIGHT[item.grade], dc.n, x => x, null);
          labelOf = c => c;
          picHtml = `<button class="speaker" data-act="replay" aria-label="Hear the word">🔊</button>`;
        }

        shell.area.innerHTML = `
          <div class="prompt">
            ${picHtml}
            <h2>Which word did you hear?</h2>
          </div>
          <div class="choices words">
            ${choices.map((c, i) => `<button class="choice wordpick" data-i="${i}">${labelOf(c)}</button>`).join('')}
          </div>`;

        const say = () => A.speak(sayWord, { rate: 0.85 });
        shell.area.querySelector('[data-act="replay"]').addEventListener('click', say);
        shell.after(350, say);

        shell.area.querySelectorAll('.choice').forEach(btn => {
          btn.addEventListener('click', () => {
            if (answered) return;
            const c = choices[+btn.dataset.i];
            if (c === correct) {
              answered = true;
              btn.classList.add('correct');
              shell.area.querySelectorAll('.choice').forEach(x => x.disabled = true);
              A.sfx.ding();
              haptic(true);
              if (firstTry) { firstTryCount++; comboBonus += comboHit(shell); }
              outcomes.push({ k: outKey, ok: firstTry });
              shell.markDot(qi);
              const f = document.createElement('div');
              f.className = 'rescuefloat';
              f.textContent = '🛟 ' + sayWord;
              shell.area.appendChild(f);
              shell.after(1100, () => f.remove());
              qi++;
              speakAdvance(shell, `You saved ${sayWord}!`, next, { rate: 0.9 });
            } else {
              firstTry = false;
              comboMiss(shell);
              btn.classList.add('wrong');
              A.sfx.buzz();
              haptic(false);
            }
          });
        });
      }
    }
  };

  /* =========================================================
     GAME — Spell It (real spelling on a full keyboard)
     Hear the word, then tap letters on an A–Z keyboard to spell
     it. Harder than Word Builder's tiles. A gentle hint appears
     after two misses on the same slot so nobody gets stuck.
     ========================================================= */
  const SPELL_TOTAL = 6;
  const SPELL_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

  const spellGame = {
    title: 'Spell It',
    icon: '✏️',
    desc: 'Type the word you hear',
    start(container, ctx) {
      const shell = roundShell(container, ctx, 'Spell It', SPELL_TOTAL);
      const words = D.WORDS[ctx.grade];
      const round = smartSample(ctx.profile, words, SPELL_TOTAL, w => 'w:' + w.w);
      let qi = 0;
      let firstTryCount = 0;
      let comboBonus = 0;
      const outcomes = [];

      function next() {
        if (!shell.live) return;
        if (qi >= SPELL_TOTAL) {
          shell.die();
          const r = quizResult(firstTryCount, SPELL_TOTAL, `${firstTryCount} of ${SPELL_TOTAL} spelled without a slip!`, comboBonus);
          r.outcomes = outcomes;
          ctx.finish(r);
          return;
        }
        shell.nowDot(qi);
        ask(round[qi]);
      }

      function ask(target) {
        const letters = target.w.split('');
        let pos = 0;
        let firstTry = true;
        let wrongHere = 0; /* consecutive wrong presses at the current slot */

        shell.area.innerHTML = `
          <div class="prompt">
            <button class="bigpic" data-act="replay" aria-label="${target.w}">${target.e}</button>
            <h2>Spell the word!</h2>
            <div class="slots spell">
              ${letters.map(() => `<div class="slot spellslot"></div>`).join('')}
            </div>
          </div>
          <div class="spellkeys">
            ${SPELL_ROWS.map(row => `<div class="skrow">${row.split('').map(ch =>
              `<button class="skey" data-k="${ch}">${ch}</button>`).join('')}</div>`).join('')}
          </div>`;

        const slots = shell.area.querySelectorAll('.slot');
        const keys = shell.area.querySelectorAll('.skey');
        const keyFor = ch => shell.area.querySelector(`.skey[data-k="${ch}"]`);

        const say = () => A.speak(target.w, { rate: 0.8 });
        shell.area.querySelector('[data-act="replay"]').addEventListener('click', say);
        shell.after(350, say);

        keys.forEach(key => {
          key.addEventListener('click', () => {
            if (pos >= letters.length) return;
            const ch = key.dataset.k;
            if (ch === letters[pos]) {
              A.sfx.pop();
              slots[pos].textContent = ch;
              slots[pos].classList.add('filled');
              key.classList.add('flash');
              shell.after(220, () => key.classList.remove('flash'));
              keys.forEach(k => k.classList.remove('hint'));
              wrongHere = 0;
              pos++;
              if (pos === letters.length) {
                if (firstTry) { firstTryCount++; comboBonus += comboHit(shell); }
                outcomes.push({ k: 'w:' + target.w, ok: firstTry });
                shell.markDot(qi);
                slots.forEach(s => s.classList.add('done'));
                keys.forEach(k => k.disabled = true);
                A.sfx.star();
                haptic(true);
                qi++;
                shell.after(420, () => speakAdvance(shell, letters.join(' ') + ' spells ' + target.w + '!', next, { rate: 0.85 }));
              }
            } else {
              firstTry = false;
              comboMiss(shell);
              wrongHere++;
              A.sfx.buzz();
              haptic(false);
              key.classList.add('wrongkey');
              shell.after(450, () => key.classList.remove('wrongkey'));
              if (wrongHere >= 2) {
                const hk = keyFor(letters[pos]);
                if (hk) hk.classList.add('hint');
              }
            }
          });
        });
      }

      next();
    }
  };

  RR.games = {
    books: booksGame,
    sounds: soundsGame,
    blend: blendGame,
    build: buildGame,
    spell: spellGame,
    memory: memoryGame,
    sentence: sentenceGame,
    rescue: rescueGame,
    rhyme: rhymeGame,
    flash: flashGame,
    sight: sightGame
  };

  RR.games.silly = sillyGame;
  RR.games.riddle = riddleGame;
  RR.games.morph = morphGame;
  RR.games.twins = twinsGame;
  RR.games.chains = chainsGame;
  RR.games.nonsense = nonsenseGame;
  RR.games.scramble = scrambleGame;

  RR.gameOrder = ['books', 'sounds', 'blend', 'build', 'chains', 'spell', 'memory', 'sentence', 'morph', 'twins', 'rescue', 'silly', 'riddle', 'scramble', 'rhyme', 'sight', 'flash', 'nonsense'];

  /* Shared helpers for the adventure module. */
  RR.util = { shuffle, sample, smartSample, withDistractors, el, rimeOf, rhymePoolFor, wordSim, letterSim, haptic, bookReader };
})();
