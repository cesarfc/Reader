/* Reading Rocket — screens & navigation. */

window.RR = window.RR || {};
RR.nav = RR.nav || {};

(function () {
  const D = RR.DATA;
  const A = RR.audio;
  const S = RR.state;
  const P = RR.progress;
  const app = document.getElementById('app');

  const AVATARS = ['🐣','🚀','🦄','🐯','🐸','🦊','🐼','🐙','🦖','🧚','🤖','🦁','🐬','🦉','⭐','🌈'];
  const GRADES = ['K','1','2','3','4','5'];
  const DAILY_GIFT = 25;

  function gradePill(g) {
    return g === 'K' ? 'K' : g + ({ 1: 'st', 2: 'nd', 3: 'rd' }[g] || 'th');
  }

  function starRow(n, max = 3) {
    let s = '';
    for (let i = 0; i < max; i++) s += `<span class="mini-star ${i < n ? 'on' : ''}">★</span>`;
    return `<span class="mini-stars">${s}</span>`;
  }

  function muteButton() {
    return `<button class="iconbtn" data-act="mute" aria-label="Sound on or off">${A.muted ? '🔇' : '🔊'}</button>`;
  }
  function wireMute(scope) {
    const btn = scope.querySelector('[data-act="mute"]');
    if (btn) btn.addEventListener('click', () => {
      A.setMuted(!A.muted);
      btn.textContent = A.muted ? '🔇' : '🔊';
    });
  }

  /* ---------------- Pet buddy (reacts to gameplay sounds) ---------------- */
  let petEl = null;
  function petShow() {
    const p = S.current();
    const pet = p && S.gear(p, 'pet');
    if (!pet) { petHide(); return; }
    if (!petEl) {
      petEl = document.createElement('div');
      petEl.id = 'petbuddy';
      petEl.setAttribute('aria-hidden', 'true');
      document.body.appendChild(petEl);
    }
    petEl.textContent = pet.e;
  }
  function petHide() {
    if (petEl) { petEl.remove(); petEl = null; }
  }
  RR.onFeedback = kind => {
    if (!petEl) return;
    const cls = kind === 'happy' ? 'petjump' : kind === 'sad' ? 'petsad' : 'petparty';
    petEl.classList.remove('petjump', 'petsad', 'petparty');
    void petEl.offsetWidth; /* restart the animation */
    petEl.classList.add(cls);
  };

  /* ---------------- Ollie's voice guide for early readers ---------------- */
  const spokenGuides = {};
  function guideSay(key, text) {
    const p = S.current();
    if (!p || (p.grade !== 'K' && p.grade !== '1') || spokenGuides[key]) return;
    spokenGuides[key] = true;
    setTimeout(() => A.speak(text, { rate: 0.95 }), 700);
  }

  /* Animated number count-up for reward reveals. Interval-based (not rAF)
     so it always reaches the final value even if the tab loses focus. */
  function countUp(el, to, ms, prefix, suffix) {
    const steps = 20;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (!el.isConnected || i >= steps) {
        clearInterval(iv);
        if (el.isConnected) el.textContent = prefix + to + suffix;
        return;
      }
      el.textContent = prefix + Math.round(to * i / steps) + suffix;
    }, Math.max(16, ms / steps));
  }

  /* ---------------- Home: who's reading today? ---------------- */
  function familyCardHtml() {
    const goal = S.familyGoal();
    if (!goal) {
      return '<button class="familycard empty" data-act="parent">🍿 Grown-ups: tap to set a family goal!</button>';
    }
    const got = S.familyWeekStars();
    const done = got >= goal.target;
    return `
      <div class="familycard ${done ? 'done' : ''}">
        <div class="famtop">🍿 Family goal: <b>${esc(goal.reward)}</b></div>
        <div class="timebar fambar"><i style="width:${Math.min(100, got / goal.target * 100)}%"></i></div>
        <div class="famnum">${got} / ${goal.target} ⭐ together this week${done ? ' — GOAL REACHED! 🎉' : ''}</div>
      </div>`;
  }

  function renderHome() {
    A.stop();
    petHide();
    document.body.className = '';
    const goal = S.familyGoal();
    app.innerHTML = `
      <section class="screen">
        <header class="apphead">
          <button class="iconbtn settingsbtn" data-act="settings" aria-label="Voice and speed settings">⚙️</button>
          <div class="logo">🚀</div>
          <h1>Reading Rocket</h1>
          <p class="tagline">Read. Earn. Battle. Blast off!</p>
          ${muteButton()}
        </header>
        <h2 class="sectiontitle">Who's reading today?</h2>
        <div class="profilegrid">
          ${S.profiles.map(p => {
            const lv = P.levelOf(p.xp).level;
            return `
            <div class="profilecard" data-id="${p.id}">
              <button class="profilemain" data-act="pick" data-id="${p.id}">
                <span class="pavatar">${S.heroEmoji(p)}</span>
                <span class="pname">${esc(p.name)}</span>
                <span class="pgrade">${D.GRADE_LABEL[p.grade]} · Lv ${lv}</span>
                <span class="pstars">🪙 ${p.coins} · 💎 ${p.gems} · ⭐ ${p.stars || 0}</span>
              </button>
              <button class="editbtn" data-act="edit" data-id="${p.id}" aria-label="Edit player">✏️</button>
            </div>`;
          }).join('')}
          ${S.profiles.length < 4 ? `
            <div class="profilecard add">
              <button class="profilemain" data-act="add">
                <span class="pavatar">➕</span>
                <span class="pname">New Reader</span>
              </button>
            </div>` : ''}
        </div>
        ${familyCardHtml()}
        <div class="parentrow"><button class="parentlink" data-act="parent">👨‍👩‍👧 Grown-up corner</button></div>
      </section>`;
    wireMute(app);
    app.querySelector('[data-act="settings"]').addEventListener('click', openSettings);
    app.querySelectorAll('[data-act="parent"]').forEach(b =>
      b.addEventListener('click', () => parentGate(renderParent)));
    app.querySelectorAll('[data-act="pick"]').forEach(b =>
      b.addEventListener('click', () => {
        S.setCurrent(b.dataset.id);
        A.sfx.whoosh();
        renderPlayer();
      }));
    app.querySelectorAll('[data-act="edit"]').forEach(b =>
      b.addEventListener('click', () => editProfile(S.profiles.find(p => p.id === b.dataset.id))));
    const add = app.querySelector('[data-act="add"]');
    if (add) add.addEventListener('click', () => editProfile(null));

    /* celebrate the family goal once per week */
    if (goal) {
      const wk = P.weekKey();
      if (S.familyWeekStars() >= goal.target && goal.doneKey !== wk) {
        goal.doneKey = wk;
        S.setFamilyGoal(goal);
        RR.confetti.burst(180);
        A.sfx.fanfare();
        setTimeout(() => A.speak(`Family goal reached! ${goal.reward}!`), 700);
      }
    }
  }

  /* ---------------- Player home ---------------- */
  function xpBarHtml(p) {
    const lv = P.levelOf(p.xp);
    return `
      <div class="xprow">
        <span class="xplv">Lv ${lv.level}</span>
        <div class="timebar xbar"><i style="width:${Math.round(lv.into / lv.need * 100)}%"></i></div>
        <span class="xptitle">${P.titleOf(lv.level)}</span>
      </div>`;
  }

  /* The journey is a rocket flying to the moon (the 80% graduation mark). */
  function journeyCardHtml(p) {
    const g = P.gradeProgress(p, p.grade);
    const pct = Math.round(g.overall * 100);
    const ready = P.readyToGraduate(p);
    const pos = Math.min(100, pct / 80 * 100);
    return `
      <button class="journeycard ${ready ? 'ready' : ''}" data-act="journey">
        <div class="jtop"><span>${D.GRADE_LABEL[p.grade]} Journey</span><b>${pct}%</b></div>
        <div class="jtrack">
          <div class="jtrail" style="width:${pos}%"></div>
          <span class="jtick" style="left:31%">☁️</span>
          <span class="jtick" style="left:62%">⭐</span>
          <span class="jmoon">🌙</span>
          <span class="jrocket" style="left:${pos}%">🚀</span>
        </div>
        ${ready ? '<div class="jready">🎓 YOU REACHED THE MOON — TAP TO GRADUATE!</div>'
                : '<div class="jhint">Fly your rocket to the moon to graduate!</div>'}
      </button>`;
  }

  function questCardHtml(p) {
    P.ensureQuests(p);
    S.save();
    return `
      <div class="questcard">
        <div class="questhead">🎯 Today's Quests ${p.quests.bonus ? '<span class="qbonus">🎁 all done! +2 💎</span>' : ''}</div>
        ${p.quests.items.map(it => {
          const def = P.questDef(it.id);
          const prog = Math.min(it.progress, def.target);
          const meter = def.target <= 5
            ? `<span class="qdots">${Array.from({ length: def.target }, (_, i) => `<i class="qdot ${i < prog ? 'on' : ''}"></i>`).join('')}</span>`
            : `<span class="qmini"><i style="width:${Math.round(prog / def.target * 100)}%"></i></span>`;
          return `
            <div class="questrow ${it.done ? 'done' : ''}">
              <span class="qicon">${it.done ? '✅' : def.e}</span>
              <span class="qname">${def.name}${it.done ? '' : meter}</span>
              <span class="qprog">${it.done ? `+${def.reward} 🪙` : ''}</span>
            </div>`;
        }).join('')}
      </div>`;
  }

  function renderPlayer() {
    const p = S.current();
    if (!p) { renderHome(); return; }
    S.rollWeek(p);
    document.body.className = 'stage-' + Math.min(p.stage, 7);
    petShow();
    const tip = D.TIPS[(Math.random() * D.TIPS.length) | 0];
    const stage = RR.adventure.stageOf(p);
    const champion = RR.adventure.isChampion(p);
    const ready = RR.adventure.bossReady(p);
    const weapon = S.gear(p, 'weapon');
    const armor = S.gear(p, 'armor');
    const pet = S.gear(p, 'pet');
    const gearChips = [weapon, armor, pet].filter(Boolean)
      .map(g => `<span class="gearchip">${g.e} ${g.name}</span>`).join('') ||
      '<span class="gearchip none">No gear yet — visit the shop!</span>';

    app.innerHTML = `
      <section class="screen">
        <header class="playerbar">
          <button class="iconbtn" data-act="back" aria-label="Back">←</button>
          <div class="playerid">
            <span class="pavatar small">${S.heroEmoji(p)}</span>
            <div>
              <div class="pname">${esc(p.name)}</div>
              <div class="pstars small">🪙 ${p.coins} · 💎 ${p.gems} · ⭐ ${p.stars || 0}</div>
            </div>
          </div>
          <button class="iconbtn" data-act="settings" aria-label="Voice and speed settings">⚙️</button>
          ${muteButton()}
        </header>
        ${xpBarHtml(p)}

        <button class="playbig" data-act="play">▶ PLAY!</button>

        <div class="herocard">
          <span class="heroemoji">${S.heroEmoji(p)}</span>
          <div class="heromid">
            <div class="statchips">
              <span class="statchip">⚔️ ${S.attack(p)}</span>
              <span class="statchip">❤️ ${S.hearts(p)}</span>
              ${S.coinBoost(p) ? `<span class="statchip">🪙+${S.coinBoost(p)}%</span>` : ''}
              ${S.streakBoost(p) ? `<span class="statchip">🔥+${S.streakBoost(p)}%</span>` : ''}
            </div>
            <div class="herogear">${gearChips}</div>
          </div>
          <div class="herobtns">
            <button class="btn shopgo" data-act="shop">🛒<br>Shop</button>
            <button class="btn ghost shopgo" data-act="stickers">📔<br>Stickers</button>
            <button class="btn ghost shopgo" data-act="badges">🏅<br>Stuff</button>
          </div>
        </div>

        ${champion ? `
          <div class="advcard champ">
            <div class="advtop"><span class="stageemoji">🏆</span>
              <div><div class="advname">Galaxy Champion!</div>
              <div class="advboss">Every boss defeated. Rematch them anytime!</div></div>
            </div>
            <button class="btn ghost" data-act="map">🗺️ Adventure Map</button>
          </div>` : `
          <div class="advcard" style="--s1:${stage.colors[0]};--s2:${stage.colors[1]}">
            <div class="advtop"><span class="stageemoji">${stage.e}</span>
              <div><div class="advname">Stage ${p.stage + 1}: ${stage.name}</div>
              <div class="advboss">Boss: ${stage.boss.name} ${stage.boss.e}</div></div>
            </div>
            <div class="stageprogress">
              <div class="timebar"><i style="width:${Math.min(100, p.stageWins / stage.wins * 100)}%"></i></div>
              <span class="muted">${Math.min(p.stageWins, stage.wins)}/${stage.wins} rounds</span>
            </div>
            <div class="advbtns">
              ${ready
                ? `<button class="btn big fightbtn pulse" data-act="fight">⚔️ FIGHT THE BOSS!</button>`
                : `<span class="advhint">Play ${stage.wins - p.stageWins} more round${stage.wins - p.stageWins === 1 ? '' : 's'} to wake the boss…</span>`}
              <button class="btn ghost" data-act="map">🗺️ Map</button>
            </div>
          </div>`}

        ${journeyCardHtml(p)}
        ${questCardHtml(p)}

        <div class="gradepick">
          ${GRADES.map(g => `<button class="gradepill ${g === p.grade ? 'on' : ''}" data-g="${g}">${gradePill(g)}</button>`).join('')}
        </div>

        <h2 class="trainhead">⚒️ Training Grounds <small>every round earns 🪙</small></h2>
        <div class="gamegrid">
          ${RR.gameOrder.filter(id => {
            const g = RR.games[id];
            return !g.grades || g.grades.includes(p.grade);
          }).map(id => {
            const g = RR.games[id];
            const best = (p.stats[id + '-' + p.grade] || {}).best || 0;
            return `
              <button class="gamecard" data-game="${id}">
                <span class="gicon">${g.icon}</span>
                <span class="gtitle">${g.title}</span>
                <span class="gdesc">${g.desc}</span>
                ${starRow(best)}
              </button>`;
          }).join('')}
        </div>

        <div class="tiprow">
          <span class="owl">🦉</span>
          <div class="bubble"><b>Grown-up tip:</b> ${tip}</div>
        </div>
      </section>`;
    wireMute(app);
    app.querySelector('[data-act="back"]').addEventListener('click', renderHome);
    app.querySelector('[data-act="settings"]').addEventListener('click', openSettings);
    app.querySelector('[data-act="play"]').addEventListener('click', () => {
      const act = P.nextActivity(p);
      S.save();
      A.sfx.whoosh();
      if (act.kind === 'battle') RR.nav.battle(p.stage);
      else startGame(act.id);
    });
    app.querySelector('[data-act="shop"]').addEventListener('click', () => RR.nav.shop());
    app.querySelector('[data-act="stickers"]').addEventListener('click', renderStickers);
    app.querySelector('[data-act="badges"]').addEventListener('click', renderBadges);
    guideSay('player', 'Tap the big play button to start!');
    app.querySelector('[data-act="journey"]').addEventListener('click', () => {
      if (P.readyToGraduate(p)) renderCeremony();
      else journeyModal(p);
    });
    app.querySelectorAll('[data-act="map"]').forEach(b => b.addEventListener('click', () => RR.nav.map()));
    const fight = app.querySelector('[data-act="fight"]');
    if (fight) fight.addEventListener('click', () => RR.nav.battle(p.stage));
    app.querySelectorAll('.gradepill').forEach(b =>
      b.addEventListener('click', () => {
        p.grade = b.dataset.g;
        S.save();
        A.sfx.pop();
        renderPlayer();
      }));
    app.querySelectorAll('.gamecard').forEach(b =>
      b.addEventListener('click', () => startGame(b.dataset.game)));

    maybeDailyGift(p);
  }

  /* ---------------- Journey breakdown ---------------- */
  function journeyModal(p) {
    const g = P.gradeProgress(p, p.grade);
    const row = (label, got, total, extra) => {
      const pct = total ? Math.min(100, Math.round(got / total * 100)) : 100;
      return `
        <div class="jrow">
          <span class="jlabel">${label}</span>
          <div class="timebar jminibar"><i style="width:${pct}%"></i></div>
          <span class="jnum">${extra || `${got}/${total}`}</span>
        </div>`;
    };
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="modal">
        <h2>🚀 ${D.GRADE_LABEL[p.grade]} Journey</h2>
        <p class="muted">${Math.round(g.overall * 100)}% — reach 80% to graduate!</p>
        ${row('🔤 Words', g.words.got, g.words.total)}
        ${row('👀 Sight words', g.sight.got, g.sight.total)}
        ${row('📚 Books', g.books.got, g.books.total)}
        ${row('⚡ Speed', g.speed.wpm, g.speed.target, `${g.speed.wpm}/${g.speed.target} wpm`)}
        <p class="jexplain">A word is mastered after 3 first-try correct answers. Keep playing — the games pick the words ${esc(p.name)} needs most!</p>
        <div class="modalbtns"><button class="btn" data-act="close">Got it!</button></div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('[data-act="close"]').addEventListener('click', () => overlay.remove());
  }

  /* ---------------- Graduation ceremony ---------------- */
  function renderCeremony() {
    const p = S.current();
    const from = p.grade;
    const to = P.nextGrade(from);
    if (!to || p.celebrated[from]) { renderPlayer(); return; }
    p.celebrated[from] = 1;
    p.grade = to;
    p.gems += 10;
    p.lifetime.gems += 10;
    S.save();
    app.innerHTML = `
      <section class="screen ceremony">
        <div class="cermortar">🎓</div>
        <h1>GRADUATION DAY!</h1>
        <p class="cerline">${esc(p.name)} finished the <b>${D.GRADE_LABEL[from]}</b> journey!</p>
        <p class="gemwin">+10 💎</p>
        <p class="cerline">Welcome to <b>${D.GRADE_LABEL[to]}</b> — new words, new books, tougher bosses!</p>
        <div class="resbtns">
          <button class="btn big" data-act="go">🚀 Blast off to ${gradePill(to)} grade!</button>
        </div>
      </section>`;
    RR.confetti.burst(220);
    setTimeout(() => RR.confetti.burst(150), 900);
    setTimeout(() => RR.confetti.burst(150), 1800);
    A.sfx.fanfare();
    setTimeout(() => A.speak(`Congratulations ${p.name}! You graduated! Welcome to ${D.GRADE_LABEL[to]}!`, { rate: 0.9 }), 800);
    app.querySelector('[data-act="go"]').addEventListener('click', renderPlayer);
  }

  /* ---------------- Sticker album ---------------- */
  function renderStickers() {
    const p = S.current();
    const got = P.stickerCount(p);
    const total = P.stickerTotal();
    app.innerHTML = `
      <section class="screen">
        <header class="gamebar">
          <button class="iconbtn" data-act="back" aria-label="Back">←</button>
          <div class="gametitle">📔 Sticker Album</div>
          <span class="coinpill">${got}/${total}</span>
        </header>
        <p class="shophint">Win a sticker with every 2-star or better round! ✨ Shiny ones are extra rare.</p>
        ${Object.entries(D.STICKERS).map(([pid, pack]) => `
          <h3 class="packhead">${pack.e} ${pack.name}</h3>
          <div class="stickgrid">
            ${pack.list.map((e, i) => {
              const own = p.stickers[pid + ':' + i] || 0;
              return `<div class="stickslot ${own ? 'own' : ''} ${own === 2 ? 'shiny' : ''}">${own ? e : '❔'}</div>`;
            }).join('')}
          </div>`).join('')}
      </section>`;
    app.querySelector('[data-act="back"]').addEventListener('click', renderPlayer);
    guideSay('stickers', 'Look at all your stickers! Win more by playing games!');
  }

  /* ---------------- My Stuff: gear, stickers, badges ---------------- */
  function renderBadges() {
    const p = S.current();
    const list = P.badges(p);
    const got = list.filter(b => b.earned).length;
    const owned = p.owned.map(id => S.item(id)).filter(Boolean);
    app.innerHTML = `
      <section class="screen">
        <header class="gamebar">
          <button class="iconbtn" data-act="back" aria-label="Back">←</button>
          <div class="gametitle">🏅 My Stuff</div>
          <span class="coinpill">${got}/${list.length}</span>
        </header>
        <h3 class="packhead">⚔️ My gear</h3>
        <div class="herogear stuffgear">
          ${owned.length
            ? owned.map(it => `<span class="gearchip ${p.equipped[it.slot] === it.id ? 'equippedchip' : ''}">${it.e} ${it.name}</span>`).join('')
            : '<span class="gearchip none">Nothing yet — visit the shop!</span>'}
        </div>
        <h3 class="packhead">📔 Stickers</h3>
        <div class="stuffrow">
          <span class="gearchip">${P.stickerCount(p)}/${P.stickerTotal()} collected</span>
          <button class="btn ghost" data-act="album">Open album</button>
        </div>
        <h3 class="packhead">🏅 Badges</h3>
        <div class="badgegrid">
          ${list.map(b => `
            <div class="badgecard ${b.earned ? '' : 'locked'}">
              <span class="badgeemoji">${b.earned ? b.e : '🔒'}</span>
              <span class="badgename">${b.name}</span>
              <span class="badgehint">${b.hint}</span>
            </div>`).join('')}
        </div>
      </section>`;
    app.querySelector('[data-act="back"]').addEventListener('click', renderPlayer);
    app.querySelector('[data-act="album"]').addEventListener('click', renderStickers);
  }

  /* ---------------- Daily gift + streak ---------------- */
  function maybeDailyGift(p) {
    const today = P.localDate();
    if (p.lastGift === today) return;
    const yesterday = P.localDate(new Date(Date.now() - 864e5));
    const newStreak = p.lastGift === yesterday ? (p.streak || 0) + 1 : 1;
    const gift = DAILY_GIFT + 5 * Math.min(newStreak - 1, 6);
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="modal giftmodal">
        <h2>Daily gift!</h2>
        ${newStreak > 1 ? `<p class="streakline">🔥 Day ${newStreak} streak!</p>` : ''}
        <button class="giftbox" aria-label="Open your gift">🎁</button>
        <p class="muted">Tap to open</p>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('.giftbox').addEventListener('click', () => {
      p.lastGift = today;
      p.streak = newStreak;
      p.coins += gift;
      p.lifetime.coins += gift;
      S.save();
      A.sfx.chest();
      RR.confetti.burst(70);
      const boost = S.streakBoost(p);
      overlay.querySelector('.giftmodal').innerHTML = `
        <h2>+${gift} 🪙</h2>
        ${boost ? `<p class="streakline">🔥 Day ${newStreak} streak — +${boost}% coins all day!</p>` : ''}
        <p class="muted">Come back tomorrow to grow your streak!</p>
        <button class="btn big" data-act="yay">⭐ Yay!</button>`;
      overlay.querySelector('[data-act="yay"]').addEventListener('click', () => {
        overlay.remove();
        renderPlayer();
      });
    }, { once: true });
  }

  /* ---------------- Voice & speed settings ---------------- */
  function openSettings() {
    const voices = A.voices();
    const hasNatural = voices.some(v => /natural|neural|premium|enhanced/i.test(v.name));
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="modal">
        <h2>⚙️ Voice & Speed</h2>
        ${voices.length && !hasNatural ? `
          <p class="gemhint">💡 This device only has basic voices right now — the tip below
          unlocks a much more natural one (takes 2 minutes).</p>` : ''}
        <label class="mlabel">Reading voice</label>
        ${voices.length ? `
          <select class="minput vselect">
            ${voices.slice(0, 20).map(v =>
              `<option value="${esc(v.name)}" ${v.name === A.voiceName ? 'selected' : ''}>${esc(v.name.replace(/\s*\([^)]*\)\s*$/, ''))} — ${A.qualityLabel(v)}</option>`).join('')}
          </select>`
          : '<p class="muted">No voices found yet — tap anywhere first, or use Safari/Chrome.</p>'}
        <label class="mlabel">Talking speed</label>
        <div class="gradepick modalgrades">
          ${[['0.8', '🐢 Slow'], ['1', 'Normal'], ['1.15', '🐰 Fast']].map(([r, label]) =>
            `<button class="gradepill ${A.rateMul === +r ? 'on' : ''}" data-r="${r}">${label}</button>`).join('')}
        </div>
        <button class="btn ghost trybtn" data-act="test">🔊 Try the voice</button>
        <div class="bubble settip">📱 <b>iPad/iPhone tip:</b> for the most natural voice, open
          <b>Settings → Accessibility → Spoken Content → Voices → English</b>, download an
          <b>Enhanced</b> voice (Ava or Zoe are great), then pick it here. On a Mac it's
          System Settings → Accessibility → Spoken Content.</div>
        <div class="modalbtns">
          <button class="btn" data-act="done">Done</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const sel = overlay.querySelector('.vselect');
    if (sel) sel.addEventListener('change', () => {
      A.setVoice(sel.value);
      A.sample();
    });
    overlay.querySelectorAll('.gradepill').forEach(b =>
      b.addEventListener('click', () => {
        A.setRate(+b.dataset.r);
        overlay.querySelectorAll('.gradepill').forEach(x => x.classList.toggle('on', x === b));
        A.speak("Let's read together!", { rate: 0.9 });
      }));
    overlay.querySelector('[data-act="test"]').addEventListener('click', () => A.sample());
    overlay.querySelector('[data-act="done"]').addEventListener('click', () => overlay.remove());
  }

  /* ---------------- Grown-up corner ---------------- */
  function parentGate(then) {
    const a = 3 + ((Math.random() * 7) | 0);
    const b = 3 + ((Math.random() * 7) | 0);
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="modal gatebox">
        <h2>👨‍👩‍👧 Grown-ups only</h2>
        <p class="muted">What is ${a} × ${b}?</p>
        <input class="minput gateinput" type="number" inputmode="numeric" placeholder="?">
        <div class="modalbtns">
          <button class="btn" data-act="go">Enter</button>
          <button class="btn ghost" data-act="cancel">Cancel</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const input = overlay.querySelector('.gateinput');
    input.focus();
    const tryGo = () => {
      if (+input.value === a * b) { overlay.remove(); then(); }
      else {
        input.value = '';
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 450);
      }
    };
    overlay.querySelector('[data-act="go"]').addEventListener('click', tryGo);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') tryGo(); });
    overlay.querySelector('[data-act="cancel"]').addEventListener('click', () => overlay.remove());
  }

  function renderParent() {
    const goal = S.familyGoal();
    app.innerHTML = `
      <section class="screen">
        <header class="gamebar">
          <button class="iconbtn" data-act="back" aria-label="Back">←</button>
          <div class="gametitle">👨‍👩‍👧 Grown-up Corner</div>
        </header>

        ${S.profiles.map(p => {
          S.rollWeek(p);
          const lv = P.levelOf(p.xp);
          const g = P.gradeProgress(p, p.grade);
          const trouble = P.troubleWords(p);
          const totalMastered = P.countMastered(p, 'w:') + P.countMastered(p, 's:');
          const books = Object.keys(p.stats).filter(k => k.startsWith('book-')).length;
          return `
            <div class="parentcard">
              <div class="ptop"><span class="pavatar small">${S.heroEmoji(p)}</span>
                <div><b>${esc(p.name)}</b> — Lv ${lv.level} ${P.titleOf(lv.level)}<br>
                <span class="muted">${D.GRADE_LABEL[p.grade]} · Journey ${Math.round(g.overall * 100)}% · 🔥 ${p.streak || 0}-day streak</span></div>
              </div>
              <div class="pstatsrow">
                🔤 Words ${g.words.got}/${g.words.total} · 👀 Sight ${g.sight.got}/${g.sight.total} ·
                📚 Books ${g.books.got}/${g.books.total} · ⚡ Best ${g.speed.wpm} wpm
              </div>
              <div class="pstatsrow">⭐ Mastered ${totalMastered} words total · <b>${p.weekMastered} this week</b> · ${books} books opened</div>
              ${trouble.length ? `
                <div class="troublerow"><span class="muted">Tricky words:</span>
                  ${trouble.map(w => `<button class="trickyword" data-w="${esc(w)}">🔊 ${esc(w)}</button>`).join('')}
                </div>` : '<div class="pstatsrow muted">No stuck words right now 🎉</div>'}
            </div>`;
        }).join('')}

        <div class="parentcard">
          <h3 class="famh">🍿 Weekly family goal</h3>
          <p class="muted">Everyone's stars count together. Hit the goal, win the prize you set!</p>
          <label class="mlabel">Stars needed this week</label>
          <div class="gradepick modalgrades famtargets">
            ${[30, 50, 80].map(t => `<button class="gradepill ${goal && goal.target === t ? 'on' : ''}" data-t="${t}">${t} ⭐</button>`).join('')}
          </div>
          <label class="mlabel">The prize</label>
          <input class="minput famreward" type="text" maxlength="40" placeholder="Movie night! Ice cream! Park trip!"
            value="${goal ? esc(goal.reward) : ''}">
          <div class="modalbtns">
            <button class="btn" data-act="savegoal">Save goal</button>
            ${goal ? '<button class="btn danger" data-act="cleargoal">Remove</button>' : ''}
          </div>
        </div>

        <div class="parentcard">
          <h3 class="famh">⚙️ Voice & speed</h3>
          <button class="btn ghost" data-act="voice">Open voice settings</button>
        </div>
      </section>`;

    app.querySelector('[data-act="back"]').addEventListener('click', renderHome);
    app.querySelectorAll('.trickyword').forEach(btn =>
      btn.addEventListener('click', () => A.speak(btn.dataset.w, { rate: 0.75 })));
    let target = goal ? goal.target : 50;
    app.querySelectorAll('.famtargets .gradepill').forEach(b =>
      b.addEventListener('click', () => {
        target = +b.dataset.t;
        app.querySelectorAll('.famtargets .gradepill').forEach(x => x.classList.toggle('on', x === b));
      }));
    app.querySelector('[data-act="savegoal"]').addEventListener('click', () => {
      const reward = app.querySelector('.famreward').value.trim() || 'A special surprise';
      S.setFamilyGoal({ target, reward, doneKey: (goal && goal.doneKey) || '' });
      A.sfx.coin();
      renderHome();
    });
    const clear = app.querySelector('[data-act="cleargoal"]');
    if (clear) clear.addEventListener('click', () => { S.setFamilyGoal(null); renderHome(); });
    app.querySelector('[data-act="voice"]').addEventListener('click', openSettings);
  }

  /* ---------------- Run a training game ---------------- */
  function startGame(gameId) {
    const p = S.current();
    if (!p) { renderHome(); return; }
    A.sfx.whoosh();
    const section = document.createElement('section');
    section.className = 'screen';
    app.innerHTML = '';
    app.appendChild(section);
    const ctx = {
      profile: p,
      grade: p.grade,
      quit: renderPlayer,
      finish(result) {
        const meta = S.recordRound(p, gameId, p.grade, result);
        renderResults(gameId, result, meta);
      }
    };
    RR.games[gameId].start(section, ctx);
  }

  /* ---------------- Results ---------------- */
  function renderResults(gameId, r, meta) {
    const p = S.current();
    const msg = r.stars === 3 ? 'Out of this world!' : r.stars === 2 ? 'Great flying!' : 'Good practice — go again!';
    const stage = RR.adventure.stageOf(p);
    const ready = RR.adventure.bossReady(p);
    app.innerHTML = `
      <section class="screen results">
        <div class="starsbig">
          ${[0, 1, 2].map(i => `<span class="star ${i < r.stars ? 'earn' : ''}" style="animation-delay:${0.15 + i * 0.3}s">★</span>`).join('')}
        </div>
        <h1>${msg}</h1>
        ${r.line1 ? `<p class="resline">${r.line1}</p>` : ''}
        ${r.wpm ? `<p class="wpm">⚡ ${r.wpm} <small>words per minute</small></p>` : ''}
        ${r.line2 ? `<p class="resline">${r.line2}</p>` : ''}
        <p class="coinwin"><span id="coincount">+0 🪙</span><span class="seq" id="bonuschips">${meta.gemsEarned ? ` <span class="gemwin">+${meta.gemsEarned} 💎</span>` : ''} <span class="xpwin">+${meta.xpGained} XP</span></span></p>
        ${meta.levelUp ? `<p class="levelup seq">⬆️ LEVEL ${meta.levelUp} — ${P.titleOf(meta.levelUp)}!</p>` : ''}
        ${!meta.gemsEarned && r.stars < 3 ? '<p class="gemhint seq">💎 Get 3 stars to win a gem!</p>' : ''}
        ${meta.newlyMastered && meta.newlyMastered.length ? `
          <div class="masteredrow seq">⭐ Mastered: ${meta.newlyMastered.map(w => `<span class="masterychip">${esc(w)}</span>`).join('')}</div>` : ''}
        ${(meta.questsDone || []).map(q => `<p class="questdone seq">🎯 ${q.e} ${q.name}${q.reward ? ` +${q.reward} 🪙` : ''}${q.gems ? ` +${q.gems} 💎` : ''}</p>`).join('')}
        ${meta.sticker ? `
          <div class="seq" id="stickerseq">
            <button class="stickpack" data-act="pack">${meta.sticker.packE}<span class="packlabel">Sticker pack — tap!</span></button>
            <div class="stickreveal" hidden></div>
          </div>` : ''}
        ${r.tricky && r.tricky.length ? `
          <div class="trickyrow">
            ${r.tricky.map(w => `<button class="trickyword" data-w="${esc(w)}">🔊 ${esc(w)}</button>`).join('')}
          </div>` : ''}
        <button class="chestbtn" data-act="chest" aria-label="Open the bonus chest">🧰<span class="chesthint">Tap the bonus chest!</span></button>
        ${meta.graduate
          ? `<button class="btn big fightbtn pulse" data-act="graduate">🎓 READY TO GRADUATE — CELEBRATE!</button>`
          : (ready && stage
            ? `<button class="btn big fightbtn pulse" data-act="fight">⚔️ THE BOSS IS AWAKE — FIGHT!</button>`
            : (stage ? `<p class="advnote">🗺️ ${Math.min(p.stageWins, stage.wins)}/${stage.wins} rounds toward ${stage.boss.name} ${stage.boss.e}</p>` : ''))}
        <div class="resbtns">
          <button class="btn ${ready || meta.graduate ? 'ghost' : ''} big" data-act="again">🔁 Play again</button>
          <button class="btn ghost big" data-act="menu">🎮 All games</button>
        </div>
      </section>`;
    /* celebration sequence: stars → coins count up → bonuses → extras */
    if (r.stars >= 2) RR.confetti.burst(r.stars === 3 ? 160 : 80);
    if (r.stars === 3) A.sfx.fanfare(); else A.sfx.star();
    setTimeout(() => {
      A.sfx.coins();
      const cc = document.getElementById('coincount');
      if (cc) countUp(cc, meta.coinsEarned, 800, '+', ' 🪙');
    }, 700);
    setTimeout(() => {
      const bc = document.getElementById('bonuschips');
      if (bc) bc.classList.add('show');
      if (meta.gemsEarned) A.sfx.gem();
    }, 1500);
    let t = 1900;
    app.querySelectorAll('.results .seq:not(#bonuschips)').forEach(el => {
      setTimeout(() => el.classList.add('show'), t);
      t += 320;
    });
    if (meta.levelUp) setTimeout(() => { A.sfx.victory(); RR.confetti.burst(80); }, 2000);
    const praise = D.PRAISE[(Math.random() * D.PRAISE.length) | 0];
    setTimeout(() => A.speak(`${praise}, ${p.name}!`), 600);

    /* sticker pack peel */
    const pack = app.querySelector('[data-act="pack"]');
    if (pack) pack.addEventListener('click', () => {
      const sk = meta.sticker;
      const reveal = app.querySelector('.stickreveal');
      pack.remove();
      reveal.hidden = false;
      reveal.innerHTML = `
        <span class="bigsticker ${sk.shiny ? 'shinybig' : ''}">${sk.e}</span>
        <span class="sticklabel">${sk.isNew ? (sk.shiny ? '✨ NEW SHINY STICKER! ✨' : 'NEW STICKER!')
          : sk.upgraded ? '✨ UPGRADED TO SHINY! ✨'
          : `Already have it — +${sk.dupeCoins} 🪙`}</span>`;
      A.sfx.chest();
      if (sk.isNew || sk.upgraded) {
        RR.confetti.burst(sk.shiny ? 140 : 70);
        A.speak(sk.shiny ? 'Wow! A shiny sticker!' : 'A new sticker!');
      }
    }, { once: true });

    app.querySelector('[data-act="chest"]').addEventListener('click', e => {
      const btn = e.currentTarget;
      const bonus = 5 + ((Math.random() * 21) | 0);
      p.coins += bonus;
      p.lifetime.coins += bonus;
      S.save();
      A.sfx.chest();
      RR.confetti.burst(40);
      btn.outerHTML = `<p class="coinwin chestwin">🧰 Bonus! +${bonus} 🪙</p>`;
    }, { once: true });

    const grad = app.querySelector('[data-act="graduate"]');
    if (grad) grad.addEventListener('click', renderCeremony);
    const fight = app.querySelector('[data-act="fight"]');
    if (fight) fight.addEventListener('click', () => RR.nav.battle(p.stage));
    app.querySelector('[data-act="again"]').addEventListener('click', () => startGame(gameId));
    app.querySelector('[data-act="menu"]').addEventListener('click', renderPlayer);
    app.querySelectorAll('.results .trickyword').forEach(b =>
      b.addEventListener('click', () => A.speak(b.dataset.w, { rate: 0.8 })));
  }

  /* ---------------- Profile editor modal ---------------- */
  function editProfile(profile) {
    const isNew = !profile;
    const p = profile || { name: '', avatar: AVATARS[(Math.random() * AVATARS.length) | 0], grade: 'K' };
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="modal">
        <h2>${isNew ? 'New Reader' : 'Edit Reader'}</h2>
        <label class="mlabel">Name</label>
        <input class="minput" type="text" maxlength="14" placeholder="Name" value="${esc(p.name)}">
        <label class="mlabel">Pick a buddy</label>
        <div class="avatargrid">
          ${AVATARS.map(a => `<button class="avatarbtn ${a === p.avatar ? 'on' : ''}" data-a="${a}">${a}</button>`).join('')}
        </div>
        <label class="mlabel">Grade</label>
        <div class="gradepick modalgrades">
          ${GRADES.map(g => `<button class="gradepill ${g === p.grade ? 'on' : ''}" data-g="${g}">${D.GRADE_LABEL[g]}</button>`).join('')}
        </div>
        <div class="modalbtns">
          <button class="btn" data-act="save">Save</button>
          <button class="btn ghost" data-act="cancel">Cancel</button>
          ${!isNew && S.profiles.length > 1 ? '<button class="btn danger" data-act="del">Remove</button>' : ''}
        </div>
      </div>`;
    document.body.appendChild(overlay);

    let avatar = p.avatar;
    let grade = p.grade;
    overlay.querySelectorAll('.avatarbtn').forEach(b =>
      b.addEventListener('click', () => {
        avatar = b.dataset.a;
        overlay.querySelectorAll('.avatarbtn').forEach(x => x.classList.toggle('on', x === b));
        A.sfx.pop();
      }));
    overlay.querySelectorAll('.gradepill').forEach(b =>
      b.addEventListener('click', () => {
        grade = b.dataset.g;
        overlay.querySelectorAll('.gradepill').forEach(x => x.classList.toggle('on', x === b));
      }));
    overlay.querySelector('[data-act="cancel"]').addEventListener('click', () => overlay.remove());
    overlay.querySelector('[data-act="save"]').addEventListener('click', () => {
      const name = overlay.querySelector('.minput').value.trim() || 'Reader';
      if (isNew) S.addProfile({ name, avatar, grade });
      else { p.name = name; p.avatar = avatar; p.grade = grade; S.save(); }
      overlay.remove();
      renderHome();
    });
    const del = overlay.querySelector('[data-act="del"]');
    if (del) del.addEventListener('click', () => {
      S.removeProfile(p.id);
      overlay.remove();
      renderHome();
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ---------------- PWA service worker ----------------
     Register, check for updates, and when a NEW worker takes control of a
     page that already had one, reload once so the app never runs a mix of
     old and new files. */
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    const hadController = !!navigator.serviceWorker.controller;
    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController || reloaded) return;
      reloaded = true;
      location.reload();
    });
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => reg.update())
        .catch(() => { /* offline support is optional */ });
    });
  }

  RR.nav.home = renderHome;
  RR.nav.player = renderPlayer;
  RR.nav.game = startGame;
  RR.nav.ceremony = renderCeremony;

  renderHome();
})();
