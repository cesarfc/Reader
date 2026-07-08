/* Reading Rocket — Sibling Duel: pass-the-device head-to-head.
   Each player answers questions from THEIR OWN grade and difficulty, so a
   kindergartener and a 3rd grader get a fair fight. Scoring is correctness
   plus a small speed bonus. Coins for both, extra for the winner — and it
   deliberately bypasses recordRound so competition never skews mastery,
   quests, or adaptive difficulty. */

window.RR = window.RR || {};
RR.nav = RR.nav || {};

(function () {
  const D = RR.DATA;
  const A = RR.audio;
  const S = RR.state;
  const app = document.getElementById('app');
  const U = () => RR.util;

  const ROUNDS = 5;      /* questions per player */
  const WIN_COINS = 40;
  const PLAY_COINS = 20;

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function renderDuel() {
    const profiles = S.profiles;
    if (profiles.length < 2) { RR.nav.home(); return; }
    if (profiles.length === 2) { startDuel(profiles[0], profiles[1]); return; }
    /* picker for 3-4 profile families */
    let a = profiles[0].id, b = profiles[1].id;
    const draw = () => {
      app.innerHTML = `
        <section class="screen">
          <header class="gamebar">
            <button class="iconbtn" data-act="back" aria-label="Back">←</button>
            <div class="gametitle">⚔️ Sibling Duel</div>
          </header>
          <h2 class="sectiontitle">Who's playing?</h2>
          ${['a', 'b'].map(side => `
            <div class="duelpickrow" data-side="${side}">
              <span class="duelpicklabel">${side === 'a' ? 'Player 1' : 'Player 2'}</span>
              ${profiles.map(p => `
                <button class="gradepill ${(side === 'a' ? a : b) === p.id ? 'on' : ''}" data-id="${p.id}">
                  ${p.avatar} ${esc(p.name)}
                </button>`).join('')}
            </div>`).join('')}
          <div class="resbtns"><button class="btn big good" data-act="go">⚔️ Start the duel!</button></div>
        </section>`;
      app.querySelector('[data-act="back"]').addEventListener('click', () => RR.nav.home());
      app.querySelectorAll('.duelpickrow .gradepill').forEach(btn =>
        btn.addEventListener('click', () => {
          const side = btn.closest('.duelpickrow').dataset.side;
          if (side === 'a') a = btn.dataset.id; else b = btn.dataset.id;
          A.sfx.pop();
          draw();
        }));
      app.querySelector('[data-act="go"]').addEventListener('click', () => {
        if (a === b) { A.sfx.buzz(); A.speak('Pick two different readers!'); return; }
        startDuel(profiles.find(p => p.id === a), profiles.find(p => p.id === b));
      });
    };
    draw();
  }

  function startDuel(pA, pB) {
    const players = [
      { p: pA, score: 0, correct: 0 },
      { p: pB, score: 0, correct: 0 }
    ];
    let turn = 0; /* total turns taken; player = turn % 2 */

    function scoreBarHtml() {
      return `
        <div class="duelscore">
          ${players.map((pl, i) => `
            <span class="duelside ${turn % 2 === i ? 'up' : ''}">
              ${S.heroEmoji(pl.p)} ${esc(pl.p.name)} <b>${pl.score}</b>
            </span>`).join('<span class="vsflash">⚡</span>')}
        </div>`;
    }

    function shellHtml(inner) {
      app.innerHTML = `
        <section class="screen">
          <header class="gamebar">
            <button class="iconbtn" data-act="back" aria-label="Quit duel">←</button>
            <div class="gametitle">⚔️ Sibling Duel</div>
            <span class="coinpill">${Math.min(turn, ROUNDS * 2)}/${ROUNDS * 2}</span>
          </header>
          ${scoreBarHtml()}
          <div class="duelarea">${inner}</div>
        </section>`;
      app.querySelector('[data-act="back"]').addEventListener('click', () => { A.stop(); RR.nav.home(); });
    }

    function handoff() {
      if (turn >= ROUNDS * 2) { finish(); return; }
      const pl = players[turn % 2];
      shellHtml(`
        <div class="card intro">
          <div class="intro-emoji">${S.heroEmoji(pl.p)}</div>
          <h2>Pass to ${esc(pl.p.name)}!</h2>
          <p>Question ${(turn >> 1) + 1} of ${ROUNDS} — your words, your level.</p>
          <div class="introbtns"><button class="btn big good" data-act="ready">✋ I'm ready!</button></div>
        </div>`);
      A.speak(`${pl.p.name}, your turn!`);
      app.querySelector('[data-act="ready"]').addEventListener('click', () => { A.sfx.whoosh(); question(pl); });
    }

    /* One question at THIS player's grade + difficulty. */
    function question(pl) {
      const u = U();
      const grade = pl.p.grade;
      const words = D.WORDS[grade];
      const dcfg = RR.progress.diffCfg(pl.p);
      const type = ['match', 'first', 'blend'][(Math.random() * 3) | 0];
      let promptHtml, choices, isCorrect, say, choiceHtml;

      if (type === 'match') {
        const target = u.sample(words, 1)[0];
        choices = u.withDistractors(target, words, dcfg.choices, x => x.w, dcfg.hard ? u.wordSim : null);
        promptHtml = `<button class="bigpic small" data-act="say">${target.e}</button><h3>Find the word!</h3>`;
        choiceHtml = c => `<span class="choice wordchoice">${c.w}</span>`;
        isCorrect = c => c === target;
        say = () => A.speak(target.w, { rate: 0.8 });
      } else if (type === 'first') {
        const target = u.sample(words, 1)[0];
        const firstTile = { l: target.t[0], s: target.s[0] };
        const others = [];
        for (const w of words) if (w.t[0] !== firstTile.l && w.s[0] !== firstTile.s) others.push({ l: w.t[0], s: w.s[0] });
        choices = u.withDistractors(firstTile, others, dcfg.choices, x => x.l, dcfg.hard ? u.letterSim : null);
        promptHtml = `<button class="bigpic small" data-act="say">${target.e}</button><h3>What sound does it start with?</h3>`;
        choiceHtml = c => `<span class="choice letter">${c.l.toUpperCase()} <small>${c.l}</small></span>`;
        isCorrect = c => c.l === firstTile.l;
        say = () => A.speak(target.w, { rate: 0.8 });
      } else {
        const target = u.sample(words, 1)[0];
        choices = u.withDistractors(target, words, dcfg.choices, x => x.w, dcfg.hard ? u.wordSim : null);
        promptHtml = `
          <div class="tiles small">${target.t.map(t => `<span class="tile gaptile">${t}</span>`).join('')}</div>
          <h3>Blend it — which picture?</h3>`;
        choiceHtml = c => `<span class="choice pic">${c.e}</span>`;
        isCorrect = c => c === target;
        say = () => A.speakSeq(target.s.map(s => ({ text: s, opts: { rate: 0.8 } })), 300);
      }

      shellHtml(`
        <div class="bq">
          <div class="bqprompt">${promptHtml}</div>
          <div class="choices ${type === 'first' ? 'letters' : type === 'blend' ? 'pics' : 'words'}">
            ${choices.map((c, i) => choiceHtml(c).replace('class="choice', `data-i="${i}" class="duelchoice choice`)).join('')}
          </div>
        </div>`);
      const sayBtn = app.querySelector('[data-act="say"]');
      if (sayBtn) sayBtn.addEventListener('click', say);
      setTimeout(say, 300);

      const t0 = Date.now();
      app.querySelectorAll('.duelchoice').forEach(el => {
        el.addEventListener('click', () => {
          if (el.dataset.done) return;
          app.querySelectorAll('.duelchoice').forEach(x => x.dataset.done = '1');
          const c = choices[+el.dataset.i];
          const ok = isCorrect(c);
          if (ok) {
            const secs = (Date.now() - t0) / 1000;
            const bonus = Math.max(0, Math.round(50 * (1 - Math.min(secs, 8) / 8)));
            pl.score += 100 + bonus;
            pl.correct++;
            el.classList.add('correct');
            A.sfx.ding();
            u.haptic(true);
          } else {
            el.classList.add('wrong');
            app.querySelectorAll('.duelchoice').forEach(x => {
              if (isCorrect(choices[+x.dataset.i])) x.classList.add('correct');
            });
            A.sfx.buzz();
            u.haptic(false);
          }
          turn++;
          setTimeout(handoff, ok ? 900 : 1500);
        });
      });
    }

    function finish() {
      const [a, b] = players;
      const tie = a.score === b.score;
      const winner = tie ? null : (a.score > b.score ? a : b);
      players.forEach(pl => {
        S.earn(pl.p, winner && pl === winner ? WIN_COINS : PLAY_COINS);
        if (winner && pl === winner) pl.p.duelWins = (pl.p.duelWins || 0) + 1;
      });
      S.save();
      shellHtml(`
        <div class="card intro">
          <div class="intro-emoji">${tie ? '🤝' : '👑'}</div>
          <h2>${tie ? "It's a tie — you're BOTH champions!" : `${esc(winner.p.name)} wins the duel!`}</h2>
          ${players.map(pl => `
            <p class="resline">${S.heroEmoji(pl.p)} <b>${esc(pl.p.name)}</b> — ${pl.score} points,
              ${pl.correct}/${ROUNDS} right, +${winner && pl === winner ? WIN_COINS : PLAY_COINS} 🪙</p>`).join('')}
          <p class="gemhint">Great reading, both of you! Rematch any time.</p>
          <div class="introbtns">
            <button class="btn big" data-act="again">⚔️ Rematch!</button>
            <button class="btn ghost big" data-act="home">🏠 Home</button>
          </div>
        </div>`);
      RR.confetti.burst(180);
      A.sfx.victory();
      A.speak(tie
        ? 'Wow, a tie! You are both reading champions!'
        : `${winner.p.name} wins! Great reading, everyone!`);
      app.querySelector('[data-act="again"]').addEventListener('click', () => startDuel(pA, pB));
      app.querySelector('[data-act="home"]').addEventListener('click', () => RR.nav.home());
    }

    handoff();
  }

  RR.nav.duel = renderDuel;
})();
