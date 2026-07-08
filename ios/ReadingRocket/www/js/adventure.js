/* Reading Rocket — adventure layer: Star Shop, stage map, and boss battles.
   Boss battles ARE reading quizzes: a correct answer attacks the boss
   (damage = base attack + weapon power, 1.5x crit for fast answers), a wrong
   answer lets the boss attack you (armor grants extra hearts). */

window.RR = window.RR || {};
RR.nav = RR.nav || {};

(function () {
  const D = RR.DATA;
  const A = RR.audio;
  const S = RR.state;
  const app = document.getElementById('app');
  const U = () => RR.util; /* defined in games.js */

  const stageOf = p => D.STAGES[p.stage] || null;
  const isChampion = p => p.stage >= D.STAGES.length;
  const bossReady = p => !isChampion(p) && p.stageWins >= D.STAGES[p.stage].wins;
  RR.adventure = { stageOf, isChampion, bossReady };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const coinPill = p => `<span class="pillrow"><span class="coinpill" id="coinpill">🪙 ${p.coins}</span><span class="coinpill gem" id="gempill">💎 ${p.gems}</span></span>`;
  function refreshCoins(p) {
    const c = document.getElementById('coinpill');
    const g = document.getElementById('gempill');
    if (c) c.textContent = `🪙 ${p.coins}`;
    if (g) g.textContent = `💎 ${p.gems}`;
  }
  const buzz = pattern => { if (navigator.vibrate) navigator.vibrate(pattern); };

  /* ==================== STAR SHOP ==================== */
  const SLOT_TABS = [
    { slot: 'skin',   label: '🦸 Heroes'  },
    { slot: 'weapon', label: '🗡️ Weapons' },
    { slot: 'armor',  label: '🛡️ Armor'   },
    { slot: 'pet',    label: '🐾 Pets'    },
    { slot: 'gem',    label: '💎 Legendary' }
  ];

  function statLine(it) {
    if (it.slot === 'weapon') return `⚔️ Attack +${it.power}`;
    if (it.slot === 'armor')  return `❤️ Hearts +${it.power}`;
    if (it.slot === 'pet')    return `🪙 Coins +${it.power}%`;
    return '✨ Epic style';
  }

  function renderShop(tab = 'weapon') {
    const p = S.current();
    if (!p) { RR.nav.home(); return; }
    if (RR.ui) RR.ui.hideTabs();
    const items = tab === 'gem'
      ? D.SHOP.filter(i => i.gems)
      : D.SHOP.filter(i => i.slot === tab && !i.gems);
    app.innerHTML = `
      <section class="screen">
        <header class="gamebar">
          <button class="iconbtn" data-act="back" aria-label="Back">←</button>
          <div class="gametitle">Star Shop</div>
          ${coinPill(p)}
        </header>
        <div class="shoptabs">
          ${SLOT_TABS.map(t => `<button class="shoptab ${t.slot === tab ? 'on' : ''}" data-tab="${t.slot}">${t.label}</button>`).join('')}
        </div>
        <div class="shopgrid">
          ${items.map(it => {
            const owned = p.owned.includes(it.id);
            const equipped = p.equipped[it.slot] === it.id;
            return `
              <div class="shopcard ${equipped ? 'equipped' : ''} ${it.gems ? 'legendary' : ''}">
                <div class="shopemoji">${it.e}</div>
                <div class="shopname">${it.name}</div>
                <div class="shopstat">${statLine(it)}</div>
                <div class="shopblurb">${it.blurb}</div>
                <button class="btn shopbtn ${equipped ? 'good' : owned ? 'ghost' : it.gems ? 'gembtn' : ''}" data-id="${it.id}">
                  ${equipped ? '✓ Equipped' : owned ? 'Equip' : it.gems ? `💎 ${it.gems}` : `🪙 ${it.price}`}
                </button>
              </div>`;
          }).join('')}
        </div>
        <p class="shophint">${tab === 'gem'
          ? '💎 Gems come from 3-star rounds, perfect rounds, and first boss wins!'
          : 'Earn coins by playing training games and beating bosses!'}</p>
      </section>`;

    app.querySelector('[data-act="back"]').addEventListener('click', () => RR.nav.me());
    app.querySelectorAll('.shoptab').forEach(b =>
      b.addEventListener('click', () => { A.sfx.pop(); renderShop(b.dataset.tab); }));
    app.querySelectorAll('.shopbtn').forEach(b =>
      b.addEventListener('click', () => {
        const it = S.item(b.dataset.id);
        if (p.owned.includes(it.id)) {
          S.equip(p, it.id);
          A.sfx.pop();
          renderShop(tab);
        } else if (S.buy(p, it.id)) {
          it.gems ? A.sfx.gem() : A.sfx.coins();
          RR.confetti.burst(it.gems ? 90 : 50);
          A.speak(`You got the ${it.name}!`);
          renderShop(tab);
        } else {
          A.sfx.buzz();
          b.classList.add('shake');
          setTimeout(() => b.classList.remove('shake'), 450);
          A.speak(it.gems
            ? 'You need more gems! Get three stars in a round to earn one.'
            : 'Keep training to earn more coins!');
        }
      }));
  }

  /* ==================== ADVENTURE MAP ==================== */
  function renderMap() {
    const p = S.current();
    if (!p) { RR.nav.home(); return; }
    if (RR.ui) RR.ui.showTabs('adventure');
    app.innerHTML = `
      <section class="screen">
        ${RR.ui ? RR.ui.appBar(p) : ''}
        <header class="gamebar">
          <div class="gametitle">🗺️ Adventure Map</div>
        </header>
        ${isChampion(p) ? `
          <div class="champbanner">🏆 GALAXY CHAMPION! 🏆<br><small>You beat every boss! Rematch any of them below.</small></div>` : ''}
        <div class="mappath">
          ${D.STAGES.map((st, i) => {
            const done = i < p.stage;
            const cur = i === p.stage;
            const ready = cur && bossReady(p);
            return `
              <div class="stagecard ${done ? 'done' : cur ? 'current' : 'locked'}"
                   style="--s1:${st.colors[0]};--s2:${st.colors[1]}">
                <div class="stagetop">
                  <span class="stageemoji">${st.e}</span>
                  <div class="stageinfo">
                    <div class="stagename">${i + 1}. ${st.name}</div>
                    <div class="stageboss">${done ? `✅ ${st.boss.name} defeated!` : cur ? `Boss: ${st.boss.name} ${st.boss.e}` : '🔒 Locked'}</div>
                  </div>
                  ${done ? '<span class="stagebadge">🏅</span>' : ''}
                </div>
                ${cur && !done ? `
                  <div class="stageprogress">
                    <div class="timebar"><i style="width:${Math.min(100, p.stageWins / st.wins * 100)}%"></i></div>
                    <span class="muted">${Math.min(p.stageWins, st.wins)}/${st.wins} training rounds</span>
                  </div>
                  ${ready
                    ? `<button class="btn big fightbtn pulse" data-fight="${i}">⚔️ FIGHT ${st.boss.name.toUpperCase()}!</button>`
                    : `<button class="btn ghost" data-act="train">🎮 Train to wake the boss</button>`}` : ''}
                ${done ? `<button class="btn ghost rematchbtn" data-fight="${i}" data-rematch="1">⚔️ Rematch (🪙 ${Math.floor(st.boss.reward / 2)})</button>` : ''}
              </div>`;
          }).join('')}
        </div>
        ${S.profiles.length >= 2 ? `
          <button class="gorow" data-act="duel">
            <span class="goicon yellow">⚔️</span>
            <span class="goinfo"><b>Sibling Duel</b><small>Reader vs reader — fair questions for each!</small></span>
            <span class="gochevron">›</span>
          </button>` : ''}
      </section>`;

    if (RR.ui) RR.ui.wireAppBar();
    const duelBtn = app.querySelector('[data-act="duel"]');
    if (duelBtn) duelBtn.addEventListener('click', () => { A.sfx.whoosh(); RR.nav.duel(); });
    app.querySelectorAll('[data-fight]').forEach(b =>
      b.addEventListener('click', () => startBattle(+b.dataset.fight, !!b.dataset.rematch)));
    const train = app.querySelector('[data-act="train"]');
    if (train) train.addEventListener('click', () => RR.nav.player());
  }

  /* ==================== BOSS BATTLE ==================== */
  function startBattle(stageIdx, rematch = false) {
    const p = S.current();
    if (!p) { RR.nav.home(); return; }
    if (RR.ui) RR.ui.hideTabs();
    const stage = D.STAGES[stageIdx];
    const boss = stage.boss;
    const u = U();

    const dcfg = RR.progress.diffCfg(p);
    const maxHearts = Math.max(1, S.hearts(p) + dcfg.hearts);
    const bossMaxHp = Math.round(boss.hp * dcfg.hp);
    let bossHp = bossMaxHp;
    let heartsLeft = maxHearts;
    let correctCount = 0;
    let qShownAt = 0;
    let over = false;
    let finishFlashed = false;
    let enragedFlag = false;
    let combo = 0;
    let movesUsed = 0;        /* boss signature moves used this battle (max 2) */
    let blockNextHit = false; /* boss's block is up: the hero's next hit lands flat */
    let qTimer = null;
    let lastChoices = null, lastGetCorrect = null;
    let shieldOn = false, doubleOn = false, freezeOn = false; /* armed power-ups */
    const timers = [];
    const after = (ms, fn) => timers.push(setTimeout(() => { if (!over || fn.allow) fn(); }, ms));

    const weapon = S.gear(p, 'weapon');
    const armor = S.gear(p, 'armor');
    const pet = S.gear(p, 'pet');

    app.innerHTML = `
      <section class="screen battle" style="--s1:${stage.colors[0]};--s2:${stage.colors[1]}">
        <header class="gamebar">
          <button class="iconbtn" data-act="back" aria-label="Back">←</button>
          <div class="gametitle">${stage.e} ${stage.name}</div>
          ${coinPill(p)}
        </header>
        <div class="battlefield">
          <div class="fighter hero">
            <div class="femoji" id="hero-emoji">${S.heroEmoji(p)}</div>
            <div class="fgear">${weapon ? weapon.e : ''}${armor ? armor.e : ''}${pet ? pet.e : ''}</div>
            <div class="hearts" id="hearts"></div>
            <div class="fname">${esc(p.name)}</div>
          </div>
          <div class="vsflash">⚡</div>
          <div class="fighter bossside">
            <div class="femoji bossmoji" id="boss-emoji">${boss.e}</div>
            <div class="hpbar"><i id="boss-hp" style="width:100%"></i></div>
            <div class="fname">${boss.name}</div>
          </div>
        </div>
        <div class="putray" id="putray"></div>
        <div class="qtimer" id="qtimer" hidden><i></i></div>
        <div class="battleq" id="battleq"></div>
      </section>`;

    const $ = sel => app.querySelector(sel);
    const battleq = $('#battleq');

    /* ----- power-ups (earned with perfect training rounds) ----- */
    const POWERUPS = {
      shield: { e: '🛡️', name: 'Shield', say: 'Shield up! The next hit is blocked.' },
      double: { e: '⚡', name: 'Double', say: 'Double power! Your next hit hits twice as hard.' },
      freeze: { e: '⏳', name: 'Freeze', say: 'Time freeze! The next question is nice and slow.' }
    };
    const armed = { shield: () => shieldOn, double: () => doubleOn, freeze: () => freezeOn };

    function renderTray() {
      const tray = $('#putray');
      if (!tray) return;
      const ids = Object.keys(POWERUPS).filter(id => id !== 'freeze' || dcfg.timer); /* freeze only matters with a timer */
      tray.innerHTML = ids.map(id => {
        const n = p.powerups[id] || 0;
        const on = armed[id]();
        return `
          <button class="pubtn ${on ? 'armed' : ''}" data-pu="${id}" ${(!n && !on) || over ? 'disabled' : ''}>
            ${POWERUPS[id].e} ${POWERUPS[id].name}
            <span class="pucount">${on ? 'ON' : '×' + n}</span>
          </button>`;
      }).join('');
      tray.querySelectorAll('[data-pu]').forEach(btn =>
        btn.addEventListener('click', () => {
          const id = btn.dataset.pu;
          if (over || armed[id]() || !(p.powerups[id] > 0)) return;
          p.powerups[id]--;
          if (id === 'shield') shieldOn = true;
          if (id === 'double') doubleOn = true;
          if (id === 'freeze') freezeOn = true;
          S.save();
          A.sfx.gem();
          buzz(30);
          floatText($('.fighter.hero'), POWERUPS[id].e + ' ' + POWERUPS[id].name + '!', 'combo');
          A.speak(POWERUPS[id].say);
          renderTray();
        }));
    }

    app.querySelector('[data-act="back"]').addEventListener('click', () => {
      over = true;
      timers.forEach(clearTimeout);
      A.stop();
      renderMap();
    });

    function renderHearts() {
      $('#hearts').innerHTML = '❤️'.repeat(heartsLeft) + '🤍'.repeat(maxHearts - heartsLeft);
    }
    renderHearts();
    renderTray();

    /* ----- intro ----- */
    battleq.innerHTML = `
      <div class="card intro">
        <p class="bosstaunt">“${boss.taunt}”</p>
        <p class="difftag">${dcfg.e} ${dcfg.label} mode · ❤️ ${maxHearts} hearts${dcfg.timer ? ` · ⏱️ ${dcfg.timer}s per question` : ''}</p>
        <p class="muted">⚔️ Right answers attack${weapon ? ` (+${weapon.power} ${weapon.name})` : ''} ·
        🔥 answer fast for combos &amp; crits · 💔 wrong or too slow costs a heart</p>
        <div class="introbtns"><button class="btn big" data-act="fight">⚔️ FIGHT!</button></div>
      </div>`;
    A.speak(`${boss.name} says: ${boss.taunt}`);
    battleq.querySelector('[data-act="fight"]').addEventListener('click', () => { A.sfx.whoosh(); nextQ(); });

    /* ----- question generation (all answerable, all reading practice) ----- */
    const grade = p.grade;
    const wordPool = D.WORDS[grade];
    const rhymePool = u.rhymePoolFor(grade);
    const families = {};
    for (const w of rhymePool) (families[u.rimeOf(w.w)] = families[u.rimeOf(w.w)] || []).push(w);
    const rhymable = rhymePool.filter(w => families[u.rimeOf(w.w)].length >= 2);

    const sightPool = (D.SIGHT[grade] || []).map(w => ({ w }));
    let typeCycle = u.shuffle(['first', 'match', 'blend', 'rhyme', 'sight', 'missing']);
    let ti = 0;

    function nextQ() {
      if (over) return;
      const type = typeCycle[ti % typeCycle.length];
      ti++;
      makeQ[type]();
      qShownAt = Date.now();
      startTimer();
    }

    /* Per-question countdown (Challenge/Expert only). Enrage shrinks it. */
    function startTimer() {
      clearInterval(qTimer);
      const bar = $('#qtimer');
      if (!bar) return;
      if (!dcfg.timer) { bar.hidden = true; return; }
      const enraged = bossHp <= bossMaxHp * 0.3;
      let dur = (enraged ? dcfg.timer * 0.6 : dcfg.timer) * 1000;
      if (freezeOn) { /* armed Time Freeze: this question runs slow */
        freezeOn = false;
        dur *= 2.5;
        renderTray();
      }
      const fill = bar.querySelector('i');
      bar.hidden = false;
      bar.classList.toggle('enraged', enraged);
      const t0 = Date.now();
      fill.style.width = '100%';
      qTimer = setInterval(() => {
        if (over) { clearInterval(qTimer); return; }
        const left = Math.max(0, 1 - (Date.now() - t0) / dur);
        fill.style.width = (left * 100) + '%';
        if (left <= 0) { clearInterval(qTimer); onTimeout(); }
      }, 80);
      timers.push(qTimer);
    }

    function onTimeout() {
      if (over) return;
      const qs = battleq.querySelectorAll('.choice');
      qs.forEach(x => x.disabled = true);
      if (lastGetCorrect) qs.forEach(x => { if (lastGetCorrect(lastChoices[+x.dataset.i])) x.classList.add('correct'); });
      combo = 0;
      floatText($('.bossside'), '⏰ Too slow!', '');
      bossStrike();
    }

    function choiceButtons(items, render) {
      return items.map((c, i) => render(c, i)).join('');
    }

    function wire(choices, getCorrect, masteryKey) {
      lastChoices = choices;
      lastGetCorrect = getCorrect;
      battleq.querySelectorAll('.choice').forEach(btn => {
        btn.addEventListener('click', () => {
          if (over || btn.disabled) return;
          clearInterval(qTimer);
          const c = choices[+btn.dataset.i];
          const correct = getCorrect(c);
          if (masteryKey) S.bump(p, masteryKey, correct);
          battleq.querySelectorAll('.choice').forEach(x => x.disabled = true);
          if (correct) {
            btn.classList.add('correct');
            heroStrike();
          } else {
            btn.classList.add('wrong');
            combo = 0;
            /* show the right answer so it's still a learning moment */
            battleq.querySelectorAll('.choice').forEach(x => {
              if (getCorrect(choices[+x.dataset.i])) x.classList.add('correct');
            });
            bossStrike();
          }
        });
      });
    }

    const makeQ = {
      /* What sound does this picture start with? */
      first() {
        const target = u.smartSample(p, wordPool, 1, w => 'l:' + w.t[0])[0];
        const firstTile = { l: target.t[0], s: target.s[0] };
        const others = [];
        for (const w of wordPool) {
          if (w.t[0] !== firstTile.l && w.s[0] !== firstTile.s) others.push({ l: w.t[0], s: w.s[0] });
        }
        const choices = u.withDistractors(firstTile, others, dcfg.choices, x => x.l, dcfg.hard ? u.letterSim : null);
        battleq.innerHTML = `
          <div class="bq" data-qtype="first">
            <div class="bqprompt"><button class="bigpic small" data-act="say" aria-label="${target.w}">${target.e}</button>
            <h3>What sound does it start with?</h3></div>
            <div class="choices letters">
              ${choiceButtons(choices, (c, i) => `<button class="choice letter" data-i="${i}">${c.l.toUpperCase()} <small>${c.l}</small></button>`)}
            </div>
          </div>`;
        const say = () => A.speak(target.w, { rate: 0.8 });
        battleq.querySelector('[data-act="say"]').addEventListener('click', say);
        after(250, say);
        wire(choices, c => c.l === firstTile.l, 'l:' + firstTile.l);
      },

      /* Hear the word, find it written. */
      match() {
        const target = u.smartSample(p, wordPool, 1, w => 'w:' + w.w)[0];
        const choices = u.withDistractors(target, wordPool, dcfg.choices, x => x.w, dcfg.hard ? u.wordSim : null);
        battleq.innerHTML = `
          <div class="bq" data-qtype="match">
            <div class="bqprompt"><button class="bigpic small" data-act="say" aria-label="${target.w}">${target.e}</button>
            <h3>Find the word!</h3></div>
            <div class="choices words">
              ${choiceButtons(choices, (c, i) => `<button class="choice wordchoice" data-i="${i}">${c.w}</button>`)}
            </div>
          </div>`;
        const say = () => A.speak(target.w, { rate: 0.8 });
        battleq.querySelector('[data-act="say"]').addEventListener('click', say);
        after(250, say);
        wire(choices, c => c === target, 'w:' + target.w);
      },

      /* Blend the sounds, pick the picture. */
      blend() {
        const target = u.smartSample(p, wordPool, 1, w => 'w:' + w.w)[0];
        const choices = u.withDistractors(target, wordPool, dcfg.choices, x => x.w, dcfg.hard ? u.wordSim : null);
        battleq.innerHTML = `
          <div class="bq" data-qtype="blend">
            <div class="bqprompt">
              <div class="tiles small">
                ${target.t.map((t, i) => `<button class="tile" data-i="${i}">${t}</button>`).join('')}
              </div>
              <h3>Blend it — which picture?</h3>
            </div>
            <div class="choices pics">
              ${choiceButtons(choices, (c, i) => `<button class="choice pic" data-i="${i}">${c.e}</button>`)}
            </div>
          </div>`;
        const tiles = battleq.querySelectorAll('.tile');
        tiles.forEach(tile => tile.addEventListener('click', () => {
          tiles.forEach(t => t.classList.remove('lit'));
          tile.classList.add('lit');
          A.speak(target.s[+tile.dataset.i], { rate: 0.8 });
        }));
        after(300, () => A.speakSeq(target.s.map(s => ({ text: s, opts: { rate: 0.8 } })), 300, null, i => {
          tiles.forEach(t => t.classList.remove('lit'));
          if (tiles[i]) tiles[i].classList.add('lit');
        }));
        wire(choices, c => c === target, 'w:' + target.w);
      },

      /* Hear a sight word, find it written. */
      sight() {
        const target = u.smartSample(p, sightPool, 1, x => 's:' + x.w)[0];
        const choices = u.withDistractors(target, sightPool, dcfg.choices, x => x.w, dcfg.hard ? u.wordSim : null);
        battleq.innerHTML = `
          <div class="bq" data-qtype="sight">
            <div class="bqprompt"><button class="bigpic small" data-act="say" aria-label="Hear the word">🔊</button>
            <h3>Find the word you hear!</h3></div>
            <div class="choices words">
              ${choiceButtons(choices, (c, i) => `<button class="choice wordchoice" data-i="${i}">${c.w}</button>`)}
            </div>
          </div>`;
        const say = () => A.speak(target.w, { rate: 0.8 });
        battleq.querySelector('[data-act="say"]').addEventListener('click', say);
        after(250, say);
        wire(choices, c => c === target, 's:' + target.w);
      },

      /* One sound is missing from the word — which is it? */
      missing() {
        const target = u.smartSample(p, wordPool, 1, w => 'w:' + w.w)[0];
        const idx = (Math.random() * target.t.length) | 0;
        const gapTile = target.t[idx];
        const pool = [];
        for (const w of wordPool) for (const t of w.t) {
          if (t !== gapTile && !pool.includes(t)) pool.push(t);
        }
        const sim = dcfg.hard ? ((a, b) => RR.progress.confusablesOf(a).includes(b) ? 4 : 0) : null;
        const choices = u.withDistractors(gapTile, pool, dcfg.choices, x => x, sim);
        battleq.innerHTML = `
          <div class="bq" data-qtype="missing">
            <div class="bqprompt">
              <button class="bigpic small" data-act="say" aria-label="${target.w}">${target.e}</button>
              <div class="tiles small">
                ${target.t.map((t, i) => `<span class="tile gaptile ${i === idx ? 'gap' : ''}">${i === idx ? '❓' : t}</span>`).join('')}
              </div>
              <h3>Which sound is missing?</h3>
            </div>
            <div class="choices letters">
              ${choiceButtons(choices, (c, i) => `<button class="choice letter" data-i="${i}">${c}</button>`)}
            </div>
          </div>`;
        const say = () => A.speak(target.w, { rate: 0.75 });
        battleq.querySelector('[data-act="say"]').addEventListener('click', say);
        after(250, say);
        wire(choices, c => c === gapTile, 'w:' + target.w);
      },

      /* Which one rhymes? */
      rhyme() {
        const target = u.sample(rhymable, 1)[0];
        const rime = u.rimeOf(target.w);
        const partner = u.sample(families[rime].filter(w => w.w !== target.w), 1)[0];
        const nonRhyming = rhymePool.filter(w => u.rimeOf(w.w) !== rime);
        const choices = u.withDistractors(partner, nonRhyming, dcfg.choices, x => x.w, dcfg.hard ? u.wordSim : null);
        battleq.innerHTML = `
          <div class="bq" data-qtype="rhyme">
            <div class="bqprompt">
              <div class="promptword">${target.e} ${target.w}</div>
              <h3>Which one rhymes?</h3>
            </div>
            <div class="choices pics">
              ${choiceButtons(choices, (c, i) => `
                <button class="choice pic labeled" data-i="${i}">
                  <span class="pemoji">${c.e}</span><span class="plabel">${c.w}</span>
                </button>`)}
            </div>
          </div>`;
        after(250, () => A.speak(`Which one rhymes with ${target.w}?`, { rate: 0.9 }));
        wire(choices, c => c === partner);
      }
    };

    /* ----- combat ----- */
    function floatText(parent, text, cls) {
      const span = document.createElement('span');
      span.className = 'dmgfloat ' + (cls || '');
      span.textContent = text;
      parent.appendChild(span);
      setTimeout(() => span.remove(), 950);
    }

    function heroStrike() {
      combo++;
      correctCount++;
      const blocked = blockNextHit; /* boss's block eats the extras on this one hit */
      if (blocked) blockNextHit = false;
      const comboMul = combo >= 5 ? 2 : combo >= 3 ? 1.5 : combo >= 2 ? 1.25 : 1;
      const crit = !blocked && Date.now() - qShownAt < 5000;
      const doubled = !blocked && doubleOn; /* a blocked hit does NOT spend Double — leave it armed */
      if (doubled) { doubleOn = false; renderTray(); }
      const dmg = blocked
        ? S.attack(p) /* flat base damage: no combo, no crit, no double */
        : Math.round(S.attack(p) * comboMul * (crit ? 1.5 : 1) * (doubled ? 2 : 1));
      bossHp = Math.max(0, bossHp - dmg);
      $('#hero-emoji').classList.add('lunge');
      after(180, () => {
        const bossSide = $('.bossside');
        $('#boss-emoji').classList.add('hit');
        const tag = (blocked ? '🛡️ blocked! ' : '') + (doubled ? '⚡x2! ' : '') + (crit ? '⚡CRIT! ' : '') + '-' + dmg;
        floatText(bossSide, tag, crit ? 'crit' : '');
        if (combo >= 2) floatText($('.fighter.hero'), '🔥 x' + combo, 'combo');
        $('#boss-hp').style.width = (bossHp / bossMaxHp * 100) + '%';
        if (crit || comboMul >= 1.5) {
          A.sfx.crit();
          buzz([40, 40, 90]);
          const field = $('.battlefield');
          field.classList.add('quake');
          setTimeout(() => field.classList.remove('quake'), 500);
        } else {
          A.sfx.hit();
          buzz(50);
        }
        /* boss enrages at low HP — questions get faster */
        if (!enragedFlag && bossHp > 0 && bossHp <= bossMaxHp * 0.3) {
          enragedFlag = true;
          $('#boss-emoji').classList.add('enraged');
          floatText(bossSide, '😡 ENRAGED!', 'crit');
        }
      });
      after(700, () => {
        $('#hero-emoji').classList.remove('lunge');
        $('#boss-emoji').classList.remove('hit');
      });
      /* near-victory tension: boss is one hit from defeat */
      if (bossHp > 0 && bossHp <= S.attack(p) && !finishFlashed) {
        finishFlashed = true;
        after(750, () => {
          const bar = $('#boss-hp');
          if (bar) bar.parentElement.classList.add('lowhp');
          floatText($('.bossside'), '💥 ONE MORE HIT!', 'crit');
          A.sfx.crit();
        });
      }
      if (bossHp <= 0) after(800, win);
      else after(1400, nextQ);
    }

    function bossStrike() {
      if (shieldOn) { /* the shield eats this hit */
        shieldOn = false;
        renderTray();
        floatText($('.fighter.hero'), '🛡️ Blocked!', 'combo');
        A.sfx.ding();
        buzz(30);
        after(1300, nextQ);
        return;
      }
      heartsLeft--;
      $('#boss-emoji').classList.add('lungeback');
      after(180, () => {
        $('#hero-emoji').classList.add('hit');
        floatText($('.fighter.hero'), '💔', '');
        renderHearts();
        const h = $('#hearts');
        h.classList.add('heartpop');
        after(520, () => h.classList.remove('heartpop'));
        A.sfx.hurt();
      });
      after(700, () => {
        $('#boss-emoji').classList.remove('lungeback');
        $('#hero-emoji').classList.remove('hit');
      });
      if (heartsLeft <= 0) { after(900, lose); return; }
      /* sometimes the boss follows up with its signature move before the next question */
      if (boss.move && bossHp > 0 && movesUsed < 2 && Math.random() < 0.4) {
        movesUsed++;
        after(1100, () => bossMove(boss.move));
        after(2200, nextQ); /* extra beat so the move gets to shine */
      } else {
        after(1600, nextQ);
      }
    }

    /* ----- boss signature move (max 2 per battle; always fair — never removes a heart) ----- */
    function bossMove(move) {
      const bossSide = $('.bossside');
      floatText(bossSide, move.e + ' ' + move.name, 'crit');
      const field = $('.battlefield');
      if (field) { field.classList.add('quake'); setTimeout(() => field.classList.remove('quake'), 500); }
      A.sfx.hurt();
      buzz([40, 40, 90]);
      A.speak(move.line);
      if (move.type === 'steal') {
        const grab = Math.min(p.coins, 5 + ((Math.random() * 6) | 0));
        p.coins = Math.max(0, p.coins - grab);
        S.save();
        refreshCoins(p);
        floatText($('.fighter.hero'), '-' + grab + ' 🪙', 'crit');
      } else if (move.type === 'heal') {
        const gain = Math.round(bossMaxHp * 0.1);
        bossHp = Math.min(bossMaxHp, bossHp + gain);
        const bar = $('#boss-hp');
        if (bar) bar.style.width = (bossHp / bossMaxHp * 100) + '%';
        floatText(bossSide, '+' + gain + ' 💚', 'combo');
      } else if (move.type === 'block') {
        blockNextHit = true; /* the hero's next hit only lands flat base damage */
        combo = 0;
      }
    }

    function win() {
      over = true;
      $('#boss-emoji').classList.add('defeated');
      A.sfx.victory();
      RR.confetti.burst(200);
      buzz([60, 60, 60, 60, 160]);
      const event = RR.progress.weeklyEvent();
      const base = (rematch ? Math.floor(boss.reward / 2) : boss.reward) + correctCount * 2;
      const earned = S.earn(p, Math.round(base * Math.min(2.5, dcfg.reward * (event.bossCoinMul || 1))));
      const advanced = !rematch && stageIdx === p.stage;
      let gems = 0;
      if (advanced) {
        p.stage++;
        p.stageWins = 0;
        gems = 3 + (p.stage >= D.STAGES.length ? 10 : 0); /* champion bonus */
        gems = Math.min(gems * (event.bossGemMul || 1), gems + 13); /* event boost, capped */
        p.gems += gems;
        p.lifetime.gems += gems;
      }
      const lvBefore = RR.progress.levelOf(p.xp).level;
      p.xp += 40;
      const lvAfter = RR.progress.levelOf(p.xp).level;
      const questsDone = RR.progress.applyEvent(p, { type: 'battle' });
      S.save();
      refreshCoins(p);
      const nextStage = D.STAGES[p.stage];
      const fin = () => {
        battleq.innerHTML = `
          <div class="card intro winpanel">
            <div class="intro-emoji">🏆</div>
            <h2>${boss.name} is defeated!</h2>
            <p class="coinwin">+${earned} 🪙${gems ? ` &nbsp; <span class="gemwin">+${gems} 💎</span>` : ''} <span class="xpwin">+40 XP</span></p>
            ${lvAfter > lvBefore ? `<p class="levelup">⬆️ LEVEL ${lvAfter}!</p>` : ''}
            ${questsDone.map(q => `<p class="questdone">🎯 ${q.e} ${q.name}${q.reward ? ` +${q.reward} 🪙` : ''}${q.gems ? ` +${q.gems} 💎` : ''}</p>`).join('')}
            ${advanced ? (nextStage
              ? `<p class="muted">🗺️ ${nextStage.name} ${nextStage.e} is now open!</p>`
              : `<p class="muted">🌟 You are the GALAXY CHAMPION! 🌟</p>`) : ''}
            <div class="introbtns">
              <button class="btn big" data-act="map">🗺️ Adventure Map</button>
              <button class="btn ghost" data-act="home">🎮 Keep training</button>
            </div>
          </div>`;
        battleq.querySelector('[data-act="map"]').addEventListener('click', renderMap);
        battleq.querySelector('[data-act="home"]').addEventListener('click', () => RR.nav.player());
      };
      fin.allow = true;
      after(900, fin);
      setTimeout(() => A.speak(`You did it, ${p.name}! ${boss.name} is defeated!`), 800);
    }

    function lose() {
      over = true;
      A.sfx.defeat();
      const earned = correctCount ? S.earn(p, correctCount * 2) : 0;
      p.xp += 10;
      RR.progress.applyEvent(p, { type: 'battle' });
      S.save();
      refreshCoins(p);
      const fin = () => {
        battleq.innerHTML = `
          <div class="card intro losepanel">
            <div class="intro-emoji">${boss.e}</div>
            <h2>${boss.name} blocked you!</h2>
            ${earned ? `<p class="coinwin">+${earned} 🪙 for the brave try</p>` : ''}
            <p class="muted">Train in the games to earn coins, grab better gear in the shop, and come back stronger!</p>
            <div class="introbtns">
              <button class="btn big" data-act="retry">⚔️ Try again</button>
              <button class="btn ghost" data-act="home">🎮 Go train</button>
            </div>
          </div>`;
        battleq.querySelector('[data-act="retry"]').addEventListener('click', () => startBattle(stageIdx, rematch));
        battleq.querySelector('[data-act="home"]').addEventListener('click', () => RR.nav.player());
      };
      fin.allow = true;
      after(700, fin);
      setTimeout(() => A.speak(`Oh no! Train a little more and try again, ${p.name}!`), 700);
    }
  }

  RR.nav.shop = renderShop;
  RR.nav.map = renderMap;
  RR.nav.battle = startBattle;
})();
