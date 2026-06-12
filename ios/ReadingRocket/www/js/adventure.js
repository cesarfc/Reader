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

    app.querySelector('[data-act="back"]').addEventListener('click', () => RR.nav.player());
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
    app.innerHTML = `
      <section class="screen">
        <header class="gamebar">
          <button class="iconbtn" data-act="back" aria-label="Back">←</button>
          <div class="gametitle">Adventure Map</div>
          ${coinPill(p)}
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
      </section>`;

    app.querySelector('[data-act="back"]').addEventListener('click', () => RR.nav.player());
    app.querySelectorAll('[data-fight]').forEach(b =>
      b.addEventListener('click', () => startBattle(+b.dataset.fight, !!b.dataset.rematch)));
    const train = app.querySelector('[data-act="train"]');
    if (train) train.addEventListener('click', () => RR.nav.player());
  }

  /* ==================== BOSS BATTLE ==================== */
  function startBattle(stageIdx, rematch = false) {
    const p = S.current();
    if (!p) { RR.nav.home(); return; }
    const stage = D.STAGES[stageIdx];
    const boss = stage.boss;
    const u = U();

    const maxHearts = S.hearts(p);
    let bossHp = boss.hp;
    let heartsLeft = maxHearts;
    let correctCount = 0;
    let qShownAt = 0;
    let over = false;
    let finishFlashed = false;
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
        <div class="battleq" id="battleq"></div>
      </section>`;

    const $ = sel => app.querySelector(sel);
    const battleq = $('#battleq');

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

    /* ----- intro ----- */
    battleq.innerHTML = `
      <div class="card intro">
        <p class="bosstaunt">“${boss.taunt}”</p>
        <p class="muted">⚔️ Right answers attack the boss${weapon ? ` (+${weapon.power} ${weapon.name})` : ''} ·
        💔 wrong answers cost a heart${armor ? ` (+${armor.power} from ${armor.name})` : ''}</p>
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

    let typeCycle = u.shuffle(['first', 'match', 'blend', 'rhyme']);
    let ti = 0;

    function nextQ() {
      if (over) return;
      const type = typeCycle[ti % typeCycle.length];
      ti++;
      makeQ[type]();
      qShownAt = Date.now();
    }

    function choiceButtons(items, render) {
      return items.map((c, i) => render(c, i)).join('');
    }

    function wire(choices, getCorrect, masteryKey) {
      battleq.querySelectorAll('.choice').forEach(btn => {
        btn.addEventListener('click', () => {
          if (over || btn.disabled) return;
          const c = choices[+btn.dataset.i];
          const correct = getCorrect(c);
          if (masteryKey) S.bump(p, masteryKey, correct);
          battleq.querySelectorAll('.choice').forEach(x => x.disabled = true);
          if (correct) {
            btn.classList.add('correct');
            heroStrike();
          } else {
            btn.classList.add('wrong');
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
        const choices = u.withDistractors(firstTile, others, 3, x => x.l);
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
        const choices = u.withDistractors(target, wordPool, 3, x => x.w);
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
        const choices = u.withDistractors(target, wordPool, 3, x => x.w);
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

      /* Which one rhymes? */
      rhyme() {
        const target = u.sample(rhymable, 1)[0];
        const rime = u.rimeOf(target.w);
        const partner = u.sample(families[rime].filter(w => w.w !== target.w), 1)[0];
        const nonRhyming = rhymePool.filter(w => u.rimeOf(w.w) !== rime);
        const choices = u.withDistractors(partner, nonRhyming, 3, x => x.w);
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
      const crit = Date.now() - qShownAt < 5000;
      const dmg = Math.round(S.attack(p) * (crit ? 1.5 : 1));
      bossHp = Math.max(0, bossHp - dmg);
      correctCount++;
      $('#hero-emoji').classList.add('lunge');
      after(180, () => {
        const bossSide = $('.bossside');
        $('#boss-emoji').classList.add('hit');
        floatText(bossSide, (crit ? '⚡CRIT! ' : '') + '-' + dmg, crit ? 'crit' : '');
        $('#boss-hp').style.width = (bossHp / boss.hp * 100) + '%';
        if (crit) {
          A.sfx.crit();
          buzz([40, 40, 90]);
          const field = $('.battlefield');
          field.classList.add('quake');
          setTimeout(() => field.classList.remove('quake'), 500);
        } else {
          A.sfx.hit();
          buzz(50);
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
      if (heartsLeft <= 0) after(900, lose);
      else after(1600, nextQ);
    }

    function win() {
      over = true;
      $('#boss-emoji').classList.add('defeated');
      A.sfx.victory();
      RR.confetti.burst(200);
      buzz([60, 60, 60, 60, 160]);
      const base = (rematch ? Math.floor(boss.reward / 2) : boss.reward) + correctCount * 2;
      const earned = S.earn(p, base);
      const advanced = !rematch && stageIdx === p.stage;
      let gems = 0;
      if (advanced) {
        p.stage++;
        p.stageWins = 0;
        gems = 3 + (p.stage >= D.STAGES.length ? 10 : 0); /* champion bonus */
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
