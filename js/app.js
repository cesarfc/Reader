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

  /* Hero figure: equipped skin wearing its weapon/armor/pet as little pips,
     so shop purchases show off everywhere — not just in battles. */
  function heroFigureHtml(p) {
    const pips = ['weapon', 'armor', 'pet'].map(slot => {
      const g = S.gear(p, slot);
      return g ? `<span class="heropip pip-${slot}">${g.e}</span>` : '';
    }).join('');
    return `<span class="herofig"><span class="herofig-main">${S.heroEmoji(p)}</span>${pips}</span>`;
  }
  function wireMute(scope) {
    const btn = scope.querySelector('[data-act="mute"]');
    if (btn) btn.addEventListener('click', () => {
      A.setMuted(!A.muted);
      btn.textContent = A.muted ? '🔇' : '🔊';
    });
  }

  /* ---------------- Pet buddy (reacts to gameplay, grows with reading) ---------------- */
  const PET_STAGES = [
    { at: 0,   name: 'Hatchling', scale: 0.8 },
    { at: 50,  name: 'Kid',       scale: 0.95 },
    { at: 150, name: 'Grown',     scale: 1.1 },
    { at: 400, name: 'Star Form', scale: 1.25, aura: true }
  ];
  const FEED_COST = 15;
  function petStage(ps) {
    let s = PET_STAGES[0];
    for (const st of PET_STAGES) if ((ps.xp || 0) >= st.at) s = st;
    return s;
  }
  function petNextStage(ps) { return PET_STAGES.find(st => st.at > (ps.xp || 0)) || null; }

  /* Gentle daily mood decay — cosmetic only, floors at a friendly 40. */
  function petTick(p) {
    const ps = p.petState;
    const today = P.localDate();
    if (ps.lastTick === today) return;
    if (ps.lastTick) {
      const days = Math.max(0, Math.round((new Date(today) - new Date(ps.lastTick)) / 864e5));
      ps.happy = Math.max(40, (ps.happy != null ? ps.happy : 100) - 5 * days);
    }
    ps.lastTick = today;
    S.save();
  }

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
    const st = petStage(p.petState || { xp: 0 });
    petEl.style.fontSize = Math.round(44 * st.scale) + 'px';
    petEl.classList.toggle('petaura', !!st.aura);
  }
  function petHide() {
    if (petEl) { petEl.remove(); petEl = null; }
  }
  /* Read-only pet surface for other modules (e.g. My Base renders the pet in-room). */
  RR.pet = { stage: petStage, next: petNextStage, show: petShow, hide: petHide };

  /* ---------------- Tabbed shell: floating tab bar + top app bar ----------------
     Tab screens (Home/Play/Read/Adventure/Me) show the bar; drill-downs
     (games, battles, readers, shop, base, parent) hide it and use a back
     arrow that returns to their owning tab. */
  const TABS = [
    { id: 'home', e: '🏠', label: 'Home', go: () => renderPlayer() },
    { id: 'play', e: '🎮', label: 'Play', go: () => renderPlayTab() },
    { id: 'read', e: '📖', label: 'Read', go: () => RR.nav.story() },
    { id: 'adventure', e: '🗺️', label: 'Adventure', go: () => RR.nav.map() },
    { id: 'me', e: '🧑‍🚀', label: 'Me', go: () => renderMeTab() }
  ];
  let tabEl = null;
  function showTabs(active) {
    if (!tabEl) {
      tabEl = document.createElement('nav');
      tabEl.id = 'tabbar';
      tabEl.setAttribute('aria-label', 'Main');
      document.body.appendChild(tabEl);
    }
    tabEl.hidden = false;
    document.body.classList.add('tabs-on');
    tabEl.innerHTML = TABS.map(t => `
      <button class="tabitem ${t.id === active ? 'on' : ''}" data-tab="${t.id}" aria-label="${t.label}">
        <span class="tabicon">${t.e}</span><span class="tablabel">${t.label}</span>
      </button>`).join('');
    tabEl.querySelectorAll('.tabitem').forEach(b =>
      b.addEventListener('click', () => {
        if (b.dataset.tab === active) return;
        A.sfx.pop();
        TABS.find(t => t.id === b.dataset.tab).go();
      }));
  }
  function hideTabs() {
    if (tabEl) tabEl.hidden = true;
    document.body.classList.remove('tabs-on');
  }
  RR.ui = { showTabs, hideTabs, appBar: appBarHtml, wireAppBar };

  /* Slim top app bar shared by all five tabs. */
  function appBarHtml(p) {
    const lv = P.levelOf(p.xp).level;
    return `
      <header class="appbar">
        <button class="appbar-id" data-act="switch" aria-label="Switch reader">
          <span class="appbar-avatar">${S.heroEmoji(p)}</span>
          <span class="appbar-name"><b>${esc(p.name)}</b><small>Lv ${lv}</small></span>
        </button>
        <div class="appbar-pills">
          <span class="coinpill">🪙 ${p.coins}</span>
          <span class="coinpill gem">💎 ${p.gems}</span>
          <button class="iconbtn" data-act="settings" aria-label="Sound and voice settings">⚙️</button>
        </div>
      </header>`;
  }
  function wireAppBar() {
    wireMute(app);
    const st = app.querySelector('[data-act="settings"]');
    if (st) st.addEventListener('click', openSettings);
    const sw = app.querySelector('[data-act="switch"]');
    if (sw) sw.addEventListener('click', () => { A.sfx.whoosh(); renderHome(); });
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
    hideTabs();
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
                <span class="pavatar">${heroFigureHtml(p)}</span>
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
        ${S.profiles.length >= 2 ? '<div class="duelrow"><button class="btn ghost duelbtn" data-act="duel">⚔️ Sibling Duel — reader vs reader!</button></div>' : ''}
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
    const duel = app.querySelector('[data-act="duel"]');
    if (duel) duel.addEventListener('click', () => { A.sfx.whoosh(); RR.nav.duel(); });

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

  /* Pet growth panel — only shows once a pet buddy is equipped. */
  function petPanelHtml(p) {
    const pet = S.gear(p, 'pet');
    if (!pet) return '';
    petTick(p);
    const ps = p.petState;
    const st = petStage(ps);
    const next = petNextStage(ps);
    const prevAt = st.at;
    const xpPct = next ? Math.round((ps.xp - prevAt) / (next.at - prevAt) * 100) : 100;
    return `
      <div class="petcard">
        <button class="petface" data-act="petpet" aria-label="Pet your buddy">
          <span class="petemoji ${st.aura ? 'petaura' : ''}" style="font-size:${Math.round(46 * st.scale)}px">${pet.e}</span>
        </button>
        <div class="petmid">
          <div class="petname">${pet.name} · <b>${st.name}</b></div>
          <div class="petbar" title="Happiness"><span>💗</span><div class="timebar petmeter"><i style="width:${ps.happy}%"></i></div></div>
          ${next
            ? `<div class="petbar" title="Growth"><span>🌟</span><div class="timebar petmeter petxp"><i style="width:${xpPct}%"></i></div><small class="petnum">${ps.xp}/${next.at}</small></div>`
            : '<div class="petmax">⭐ A fully grown superstar!</div>'}
        </div>
        <button class="btn good feedbtn" data-act="feed">🍎 Feed<br><small>${FEED_COST} 🪙</small></button>
      </div>`;
  }

  function wirePetPanel(p) {
    const face = app.querySelector('[data-act="petpet"]');
    if (!face) return;
    face.addEventListener('click', () => {
      A.sfx.pop();
      RR.onFeedback('happy');
      const em = face.querySelector('.petemoji');
      em.classList.remove('petpetted');
      void em.offsetWidth;
      em.classList.add('petpetted');
    });
    app.querySelector('[data-act="feed"]').addEventListener('click', () => {
      const ps = p.petState;
      if (p.coins < FEED_COST) {
        A.sfx.buzz();
        A.speak('Earn a few more coins first, then we can feed your buddy!');
        return;
      }
      const before = petStage(ps);
      p.coins -= FEED_COST;
      ps.happy = Math.min(100, (ps.happy || 0) + 20);
      ps.xp += 8;
      S.save();
      A.sfx.coin();
      RR.onFeedback('happy');
      const after = petStage(ps);
      if (after !== before) {
        A.sfx.fanfare();
        RR.confetti.burst(120);
        A.speak(`Wow! Your buddy grew! It's a ${after.name} now!`);
      } else {
        A.speak(['Yum!', 'So tasty!', 'Nom nom nom!'][(Math.random() * 3) | 0]);
      }
      renderMeTab();
    });
  }

  /* This week's event banner (tap for details). */
  function eventBannerHtml() {
    const ev = P.weeklyEvent();
    if (!ev || !ev.id) return '';
    const d = P.eventDaysLeft();
    return `
      <button class="eventbanner" data-act="event">
        <span class="evemoji">${ev.e}</span>
        <span class="evtext"><b>${ev.name} week!</b> ${ev.blurb}</span>
        <span class="evdays">${d} day${d === 1 ? '' : 's'} left</span>
      </button>`;
  }

  function eventModal() {
    const ev = P.weeklyEvent();
    const d = P.eventDaysLeft();
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="modal giftmodal">
        <div class="intro-emoji">${ev.e}</div>
        <h2>${ev.name} week!</h2>
        <p class="muted">${ev.blurb}</p>
        <p class="gemhint">A new event starts every Monday — ${d} day${d === 1 ? '' : 's'} left in this one!</p>
        <div class="modalbtns"><button class="btn big" data-act="go">⭐ Let's go!</button></div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('[data-act="go"]').addEventListener('click', () => overlay.remove());
  }

  /* Story campaign teaser card. */
  function storyCardHtml(p) {
    const eps = D.CAMPAIGN || [];
    if (!eps.length) return '';
    const read = P.episodesRead(p);
    const next = eps.find(ep => !P.episodeRead(p, ep.id));
    const status = next ? P.campaignStatus(p, next) : null;
    const epLabel = ep => {
      const season = ep.season || 1;
      const n = eps.filter(e => (e.season || 1) === season).indexOf(ep) + 1;
      return season > 1 ? `Season ${season}, Episode ${n}` : `Episode ${n}`;
    };
    const line = !next ? '🌟 The End — read your favorites again!'
      : status.open ? `✨ ${epLabel(next)} is ready: “${next.title}”`
      : status.reason;
    return `
      <button class="storycard ${next && status.open ? 'fresh' : ''}" data-act="story">
        <span class="storycover big">${next ? next.cover : '🌟'}</span>
        <span class="storyinfo">
          <span class="storytitle">🌠 Milo's Star Stories</span>
          <span class="storymeta">${line}</span>
        </span>
        <span class="storycount">${read}/${eps.length}</span>
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

  /* "Keep going" rows on the Home tab: next story episode + adventure stage. */
  function storyRowHtml(p) {
    const eps = D.CAMPAIGN || [];
    if (!eps.length) return '';
    const next = eps.find(ep => !P.episodeRead(p, ep.id));
    const status = next ? P.campaignStatus(p, next) : null;
    const epLabel = ep => {
      const season = ep.season || 1;
      const n = eps.filter(e => (e.season || 1) === season).indexOf(ep) + 1;
      return (season > 1 ? `S${season} · ` : '') + `Episode ${n}`;
    };
    const line = !next ? 'The End — read your favorites again!'
      : status.open ? `${epLabel(next)} · ${next.title}`
      : status.reason;
    return `
      <button class="gorow" data-act="story">
        <span class="goicon lav">${next ? next.cover : '🌟'}</span>
        <span class="goinfo"><b>Milo's Star Stories</b><small>${esc(line)}</small></span>
        ${next && status.open ? '<span class="gochip new">NEW</span>' : '<span class="gochevron">›</span>'}
      </button>`;
  }

  function adventureRowHtml(p) {
    if (RR.adventure.isChampion(p)) {
      return `
        <button class="gorow" data-act="adventure">
          <span class="goicon yellow">🏆</span>
          <span class="goinfo"><b>Galaxy Champion!</b><small>Rematch any boss on the map</small></span>
          <span class="gochevron">›</span>
        </button>`;
    }
    const stage = RR.adventure.stageOf(p);
    const ready = RR.adventure.bossReady(p);
    return `
      <button class="gorow" data-act="adventure">
        <span class="goicon coral">${stage.e}</span>
        <span class="goinfo"><b>Stage ${p.stage + 1} · ${stage.name}</b>
          <small>${ready ? `Boss ready — ${stage.boss.name} ${stage.boss.e}` : `${Math.min(p.stageWins, stage.wins)}/${stage.wins} rounds to wake ${stage.boss.name}`}</small></span>
        ${ready ? '<span class="gochip fight">FIGHT</span>' : '<span class="gochevron">›</span>'}
      </button>`;
  }

  /* Quest sheet: the three daily quests, opened from the Home minicard. */
  function questSheet(p) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="modal">
        ${questCardHtml(p)}
        <div class="modalbtns"><button class="btn" data-act="close">Let's go!</button></div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('[data-act="close"]').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  }

  /* ---------------- Home tab: the "what do I do right now" dashboard ---------------- */
  function renderPlayer() {
    const p = S.current();
    if (!p) { renderHome(); return; }
    S.rollWeek(p);
    petShow();
    P.ensureQuests(p);
    S.save();
    const lv = P.levelOf(p.xp);
    const pct = Math.round(P.gradeProgress(p, p.grade).overall * 100);
    const pos = Math.min(100, pct / 80 * 100);
    const gradReady = P.readyToGraduate(p);
    const qDone = p.quests.items.filter(i => i.done).length;
    const tip = D.TIPS[(Math.random() * D.TIPS.length) | 0];
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    app.innerHTML = `
      <section class="screen">
        ${appBarHtml(p)}
        <div class="greet">
          <span class="eyebrow">${DAYS[new Date().getDay()]} · ready to read</span>
          <h1>Hi, ${esc(p.name)}! 👋</h1>
          <div class="xprow">
            <span class="xplv">Lv ${lv.level}</span>
            <div class="timebar xbar"><i style="width:${Math.round(lv.into / lv.need * 100)}%"></i></div>
            <span class="xptitle">${P.titleOf(lv.level)}</span>
          </div>
        </div>
        ${eventBannerHtml()}

        <button class="playbig" data-act="play">▶ PLAY<span>Continue where you left off</span></button>

        <div class="tworow">
          <button class="minicard" data-act="journey">
            <span class="minitop">🌙 <b>${pct}%</b></span>
            <span class="minilabel">${D.GRADE_LABEL[p.grade]} journey</span>
            <span class="jtrack"><i class="jtrail" style="width:${pos}%"></i><span class="jmoon">🌙</span><span class="jrocket" style="left:${pos}%">🚀</span></span>
            ${gradReady ? '<span class="readychip">🎓 Graduate!</span>' : ''}
          </button>
          <button class="minicard" data-act="quests">
            <span class="minitop">🎯 <b>${qDone}/3</b></span>
            <span class="minilabel">Today's quests</span>
            <span class="qdots">${p.quests.items.map(i => `<i class="qdot ${i.done ? 'on' : ''}"></i>`).join('')}</span>
          </button>
        </div>

        <span class="eyebrow section">Keep going</span>
        ${storyRowHtml(p)}
        ${adventureRowHtml(p)}

        <div class="tiprow">
          <span class="owl">🦉</span>
          <div class="bubble"><b>Grown-up tip:</b> ${tip}</div>
        </div>
      </section>`;
    wireAppBar();
    showTabs('home');
    app.querySelector('[data-act="play"]').addEventListener('click', () => {
      const act = P.nextActivity(p);
      S.save();
      A.sfx.whoosh();
      if (act.kind === 'battle') RR.nav.battle(p.stage);
      else startGame(act.id);
    });
    app.querySelector('[data-act="journey"]').addEventListener('click', () => {
      if (P.readyToGraduate(p)) renderCeremony();
      else journeyModal(p);
    });
    app.querySelector('[data-act="quests"]').addEventListener('click', () => questSheet(p));
    const evBtn = app.querySelector('[data-act="event"]');
    if (evBtn) evBtn.addEventListener('click', eventModal);
    const storyBtn = app.querySelector('[data-act="story"]');
    if (storyBtn) storyBtn.addEventListener('click', () => { A.sfx.whoosh(); RR.nav.story(); });
    const advBtn = app.querySelector('[data-act="adventure"]');
    if (advBtn) advBtn.addEventListener('click', () => { A.sfx.whoosh(); RR.nav.map(); });
    guideSay('player', 'Tap the big play button to start!');
    maybeDailyGift(p);
  }

  /* ---------------- Play tab: grade picker + sectioned Training Grounds ---------------- */
  const GAME_SECTIONS = [
    { label: '🔤 Sounds & letters', ids: ['sounds', 'blend', 'build', 'chains', 'rhyme'] },
    { label: '📝 Words & spelling', ids: ['spell', 'memory', 'morph', 'twins', 'rescue', 'sight'] },
    { label: '🤔 Meaning & thinking', ids: ['books', 'sentence', 'silly', 'riddle', 'scramble'] },
    { label: '⚡ Speed rounds', ids: ['flash', 'nonsense'] }
  ];

  function renderPlayTab() {
    const p = S.current();
    if (!p) { renderHome(); return; }
    petHide();
    const available = id => {
      const g = RR.games[id];
      return g && (!g.grades || g.grades.includes(p.grade));
    };
    const card = id => {
      const g = RR.games[id];
      const best = (p.stats[id + '-' + p.grade] || {}).best || 0;
      return `
        <button class="gamecard" data-game="${id}">
          <span class="gicon">${g.icon}</span>
          <span class="gtitle">${g.title}</span>
          <span class="gdesc">${g.desc}</span>
          ${starRow(best)}
        </button>`;
    };
    /* games registered but missing from the section map still show up */
    const listed = GAME_SECTIONS.flatMap(s => s.ids);
    const extras = RR.gameOrder.filter(id => !listed.includes(id) && available(id));
    app.innerHTML = `
      <section class="screen">
        ${appBarHtml(p)}
        <h2 class="trainhead">🎮 Training Grounds <small>every round earns 🪙</small></h2>
        <div class="gradepick">
          ${GRADES.map(g => `<button class="gradepill ${g === p.grade ? 'on' : ''}" data-g="${g}">${gradePill(g)}</button>`).join('')}
        </div>
        ${GAME_SECTIONS.map(sec => {
          const ids = sec.ids.filter(available);
          if (!ids.length) return '';
          return `
            <span class="eyebrow section">${sec.label}</span>
            <div class="gamegrid">${ids.map(card).join('')}</div>`;
        }).join('')}
        ${extras.length ? `
          <span class="eyebrow section">🎲 More games</span>
          <div class="gamegrid">${extras.map(card).join('')}</div>` : ''}
      </section>`;
    wireAppBar();
    showTabs('play');
    app.querySelectorAll('.gradepill').forEach(b =>
      b.addEventListener('click', () => {
        p.grade = b.dataset.g;
        S.save();
        A.sfx.pop();
        renderPlayTab();
      }));
    app.querySelectorAll('.gamecard').forEach(b =>
      b.addEventListener('click', () => startGame(b.dataset.game)));
  }

  /* ---------------- Me tab: hero, pet, and everything you own ---------------- */
  function renderMeTab() {
    const p = S.current();
    if (!p) { renderHome(); return; }
    petHide();
    const gearChips = ['weapon', 'armor', 'pet'].map(s => S.gear(p, s)).filter(Boolean)
      .map(g => `<span class="gearchip">${g.e} ${g.name}</span>`).join('') ||
      '<span class="gearchip none">No gear yet — visit the shop!</span>';
    app.innerHTML = `
      <section class="screen">
        ${appBarHtml(p)}
        <div class="herocard">
          <span class="heroemoji">${heroFigureHtml(p)}</span>
          <div class="heromid">
            <div class="statchips">
              <span class="statchip">⚔️ ${S.attack(p)}</span>
              <span class="statchip">❤️ ${S.hearts(p)}</span>
              <span class="statchip">⭐ ${p.stars || 0}</span>
              ${S.coinBoost(p) ? `<span class="statchip">🪙+${S.coinBoost(p)}%</span>` : ''}
              ${S.streakBoost(p) ? `<span class="statchip">🔥+${S.streakBoost(p)}%</span>` : ''}
            </div>
            <div class="herogear">${gearChips}</div>
          </div>
        </div>
        ${petPanelHtml(p)}
        <div class="megrid">
          <button class="mego" data-act="shop"><span class="goicon yellow">🛒</span><b>Star Shop</b><small>Gear up your hero</small></button>
          <button class="mego" data-act="base"><span class="goicon sky">🚀</span><b>My Base</b><small>Decorate your rocket</small></button>
          <button class="mego" data-act="stickers"><span class="goicon rose">📔</span><b>Stickers</b><small>${P.stickerCount(p)}/${P.stickerTotal()} collected</small></button>
          <button class="mego" data-act="badges"><span class="goicon teal">🏅</span><b>My Stuff</b><small>Badges & gear</small></button>
        </div>
        <div class="parentrow"><button class="parentlink" data-act="parent">👨‍👩‍👧 Grown-up corner</button></div>
      </section>`;
    wireAppBar();
    showTabs('me');
    wirePetPanel(p);
    app.querySelector('[data-act="shop"]').addEventListener('click', () => RR.nav.shop());
    app.querySelector('[data-act="base"]').addEventListener('click', () => RR.nav.base());
    app.querySelector('[data-act="stickers"]').addEventListener('click', renderStickers);
    app.querySelector('[data-act="badges"]').addEventListener('click', renderBadges);
    app.querySelector('[data-act="parent"]').addEventListener('click', () => parentGate(renderParent));
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
    hideTabs();
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
    setTimeout(() => RR.confetti.fireworks(6), 700);
    A.sfx.fanfare();
    setTimeout(() => A.speak(`Congratulations ${p.name}! You graduated! Welcome to ${D.GRADE_LABEL[to]}!`, { rate: 0.9 }), 800);
    app.querySelector('[data-act="go"]').addEventListener('click', renderPlayer);
  }

  /* ---------------- Sticker album ---------------- */
  function renderStickers() {
    const p = S.current();
    hideTabs();
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
    app.querySelector('[data-act="back"]').addEventListener('click', renderMeTab);
    guideSay('stickers', 'Look at all your stickers! Win more by playing games!');
  }

  /* ---------------- My Stuff: gear, stickers, badges ---------------- */
  function renderBadges() {
    const p = S.current();
    hideTabs();
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
    app.querySelector('[data-act="back"]').addEventListener('click', renderMeTab);
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
        <h2>⚙️ Sound & Voice</h2>
        <label class="mlabel">Sound</label>
        <div class="gradepick modalgrades soundopts">
          <button class="gradepill ${!A.muted ? 'on' : ''}" data-m="0">🔊 On</button>
          <button class="gradepill ${A.muted ? 'on' : ''}" data-m="1">🔇 Off</button>
        </div>
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
        ${RR.voice && RR.voice.supported() ? `
          <label class="mlabel">🎤 Listen mode (beta)</label>
          <div class="gradepick modalgrades listenopts">
            <button class="gradepill ${RR.voice.enabled() ? 'on' : ''}" data-l="1">🎤 On</button>
            <button class="gradepill ${!RR.voice.enabled() ? 'on' : ''}" data-l="0">Off</button>
          </div>
          <p class="muted listentip">When on, the app listens while your reader reads out loud in Speed Reader,
          Sight Words, and books — and cheers when it hears them! It never takes stars away,
          and the tap buttons always work too. Your browser will ask to use the microphone.</p>` : ''}
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
    overlay.querySelectorAll('.soundopts .gradepill').forEach(b =>
      b.addEventListener('click', () => {
        A.setMuted(b.dataset.m === '1');
        overlay.querySelectorAll('.soundopts .gradepill').forEach(x => x.classList.toggle('on', x === b));
        if (!A.muted) A.sfx.pop();
      }));
    overlay.querySelectorAll('.listenopts .gradepill').forEach(b =>
      b.addEventListener('click', () => {
        RR.voice.setEnabled(b.dataset.l === '1');
        overlay.querySelectorAll('.listenopts .gradepill').forEach(x => x.classList.toggle('on', x === b));
        A.sfx.pop();
      }));
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

  /* Confirm the destructive part of an import before it runs. */
  function confirmReplace(onReplace) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="modal">
        <h2>⚠️ Replace all progress?</h2>
        <p class="muted">This replaces ALL progress on this device with the code's progress. Continue?</p>
        <div class="modalbtns">
          <button class="btn danger" data-act="replace">Replace</button>
          <button class="btn ghost" data-act="cancel">Cancel</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('[data-act="replace"]').addEventListener('click', () => { overlay.remove(); onReplace(); });
    overlay.querySelector('[data-act="cancel"]').addEventListener('click', () => overlay.remove());
  }

  function renderParent() {
    hideTabs();
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
              <div class="diffctl">
                <div class="mlabel">Difficulty <span class="diffnow">now: ${D.DIFF[P.diffId(p)].e} ${D.DIFF[P.diffId(p)].label}${p.diffMode === 'auto' ? ' (auto)' : ' (locked)'}</span></div>
                <div class="diffrow">
                  <button class="diffopt ${p.diffMode === 'auto' ? 'on' : ''}" data-pid="${p.id}" data-d="auto">🤖 Auto</button>
                  ${D.DIFF_ORDER.map(id => `<button class="diffopt ${p.diffMode === 'locked' && p.diff === id ? 'on' : ''}" data-pid="${p.id}" data-d="${id}">${D.DIFF[id].e} ${D.DIFF[id].label}</button>`).join('')}
                </div>
                <div class="muted diffhelp">Auto raises the challenge when they're acing it, eases off when they struggle.</div>
              </div>
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
          <h3 class="famh">📖 Book Maker</h3>
          <p class="muted">Write books starring YOUR kids — their names, your pets, your places. Personal books are the ones they read again and again.</p>
          ${S.customBooks().length
            ? S.customBooks().map(b => `
              <div class="stuffrow">
                <span class="gearchip">${esc(b.cover)} ${esc(b.title)} · ${b.pages.length} pg</span>
                <button class="btn ghost" data-editbook="${esc(b.id)}">✏️ Edit</button>
                <button class="btn danger" data-delbook="${esc(b.id)}">🗑 Remove</button>
              </div>`).join('')
            : '<p class="pstatsrow muted">No family books yet — tap “New book” to write your first one!</p>'}
          <div class="modalbtns">
            <button class="btn" data-act="newbook">➕ New book</button>
          </div>
        </div>

        <div class="parentcard">
          <h3 class="famh">💾 Backup & transfer</h3>
          <p class="muted">Progress lives only on this device. Copy this code somewhere safe, or paste a code from another device.</p>
          <label class="mlabel">This device's backup code</label>
          <textarea class="minput backupout" readonly rows="3">${esc(S.exportSave())}</textarea>
          <div class="modalbtns">
            <button class="btn ghost" data-act="copybackup">📋 Copy backup code</button>
          </div>
          <label class="mlabel">Paste a code from another device</label>
          <textarea class="minput backupin" rows="3" placeholder="Paste a backup code here"></textarea>
          <p class="muted importerr" hidden>That code doesn't look right — check you copied all of it.</p>
          <div class="modalbtns">
            <button class="btn" data-act="importbackup">📥 Import</button>
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
    app.querySelectorAll('.diffopt').forEach(b =>
      b.addEventListener('click', () => {
        const prof = S.profiles.find(x => x.id === b.dataset.pid);
        if (!prof) return;
        if (b.dataset.d === 'auto') prof.diffMode = 'auto';
        else { prof.diffMode = 'locked'; prof.diff = b.dataset.d; }
        S.save();
        A.sfx.pop();
        renderParent();
      }));
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

    /* ----- Backup & transfer ----- */
    const backupOut = app.querySelector('.backupout');
    const copyBtn = app.querySelector('[data-act="copybackup"]');
    copyBtn.addEventListener('click', () => {
      const code = S.exportSave();
      const done = () => {
        A.sfx.coin();
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => { copyBtn.textContent = '📋 Copy backup code'; }, 1500);
      };
      /* execCommand fallback needs the code selected in a real textarea */
      const fallback = () => {
        backupOut.value = code;
        backupOut.focus();
        backupOut.select();
        try { if (document.execCommand('copy')) done(); } catch (e) { /* copy unavailable */ }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(done, fallback);
      } else {
        fallback();
      }
    });

    const importBtn = app.querySelector('[data-act="importbackup"]');
    const backupIn = app.querySelector('.backupin');
    const importErr = app.querySelector('.importerr');
    importBtn.addEventListener('click', () => {
      importErr.hidden = true;
      const text = backupIn.value;
      /* importing overwrites everything — confirm before touching the save */
      confirmReplace(() => {
        if (S.importSave(text)) {
          A.sfx.fanfare();
          RR.confetti.burst(80);
          renderHome();
        } else {
          importBtn.classList.add('shake');
          setTimeout(() => importBtn.classList.remove('shake'), 450);
          importErr.hidden = false;
        }
      });
    });

    /* ----- Book Maker ----- */
    app.querySelector('[data-act="newbook"]').addEventListener('click', () => bookMakerEditor(null));
    app.querySelectorAll('[data-editbook]').forEach(btn =>
      btn.addEventListener('click', () => {
        const book = S.customBooks().find(b => b.id === btn.dataset.editbook);
        if (book) bookMakerEditor(book);
      }));
    app.querySelectorAll('[data-delbook]').forEach(btn =>
      btn.addEventListener('click', () => {
        const book = S.customBooks().find(b => b.id === btn.dataset.delbook);
        if (!book) return;
        confirmRemoveBook(book, () => {
          S.removeCustomBook(book.id);
          A.sfx.pop();
          renderParent();
        });
      }));
  }

  /* Confirm removing a family book (no window.confirm — matches confirmReplace). */
  function confirmRemoveBook(book, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="modal">
        <h2>🗑 Remove this book?</h2>
        <p class="muted">“${esc(book.title)}” will be removed from every reader's bookshelf. This can't be undone.</p>
        <div class="modalbtns">
          <button class="btn danger" data-act="remove">Remove</button>
          <button class="btn ghost" data-act="cancel">Cancel</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('[data-act="remove"]').addEventListener('click', () => { overlay.remove(); onConfirm(); });
    overlay.querySelector('[data-act="cancel"]').addEventListener('click', () => overlay.remove());
  }

  /* Author or edit a family book. Works on a copy so Cancel discards changes;
     Save validates a title + at least one page with words, then persists. */
  function bookMakerEditor(existing) {
    const id = existing ? existing.id : null;
    const title0 = existing ? existing.title : '';
    const cover0 = existing ? existing.cover : '📕';
    const pages = existing
      ? existing.pages.map(pg => ({ t: pg.t, a: pg.a }))
      : [{ t: '', a: '' }, { t: '', a: '' }];

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="modal">
        <h2>📖 ${existing ? 'Edit book' : 'New book'}</h2>
        <p class="muted">Read it together when you're done — tap any word for help, or “Read to me”.</p>
        <label class="mlabel">Title</label>
        <input class="minput bmtitle" type="text" maxlength="30" placeholder="Sofia and the Big Dog" value="${esc(title0)}">
        <label class="mlabel">Cover emoji</label>
        <input class="minput bmcover" type="text" maxlength="2" value="${esc(cover0)}">
        <label class="mlabel">Pages</label>
        <div class="bmpages"></div>
        <div class="modalbtns">
          <button class="btn ghost" data-act="addpage">➕ Add page</button>
        </div>
        <p class="pstatsrow muted bmerr" hidden>Add a title and at least one page with words to save.</p>
        <div class="modalbtns">
          <button class="btn" data-act="save">💾 Save book</button>
          <button class="btn ghost" data-act="cancel">Cancel</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const pagesEl = overlay.querySelector('.bmpages');

    /* pull the on-screen values back into `pages` before we redraw the list */
    function syncPages() {
      pagesEl.querySelectorAll('.bmpagerow').forEach((row, i) => {
        if (!pages[i]) return;
        pages[i].t = row.querySelector('.bmptext').value;
        pages[i].a = row.querySelector('.bmpart').value;
      });
    }

    function renderPages() {
      pagesEl.innerHTML = pages.map((pg, i) => `
        <div class="bmpagerow">
          <label class="mlabel">Page ${i + 1}</label>
          <textarea class="minput bmptext" rows="2" placeholder="The cat sat on the mat.">${esc(pg.t)}</textarea>
          <input class="minput bmpart" type="text" maxlength="8" placeholder="🐱" value="${esc(pg.a)}">
          ${pages.length > 1 ? `<div class="modalbtns"><button class="btn ghost bmpdel" data-i="${i}">✕ Remove page ${i + 1}</button></div>` : ''}
        </div>`).join('');
      pagesEl.querySelectorAll('.bmpdel').forEach(btn =>
        btn.addEventListener('click', () => {
          syncPages();
          pages.splice(+btn.dataset.i, 1);
          renderPages();
          A.sfx.pop();
        }));
    }
    renderPages();

    overlay.querySelector('[data-act="addpage"]').addEventListener('click', () => {
      syncPages();
      pages.push({ t: '', a: '' });
      renderPages();
      A.sfx.pop();
    });
    overlay.querySelector('[data-act="cancel"]').addEventListener('click', () => overlay.remove());
    overlay.querySelector('[data-act="save"]').addEventListener('click', () => {
      syncPages();
      const title = overlay.querySelector('.bmtitle').value.trim();
      const cover = overlay.querySelector('.bmcover').value.trim() || '📕';
      const cleanPages = pages
        .map(pg => ({ t: pg.t.trim(), a: (pg.a || '').trim() || '📖' }))
        .filter(pg => pg.t);
      if (!title || !cleanPages.length) {
        overlay.querySelector('.bmerr').hidden = false;
        return;
      }
      const book = { title, cover, pages: cleanPages, custom: true };
      if (id) book.id = id; /* preserve id when editing */
      S.saveCustomBook(book);
      A.sfx.coins();
      overlay.remove();
      renderParent();
    });
  }

  /* ---------------- Run a training game ---------------- */
  function startGame(gameId) {
    const p = S.current();
    if (!p) { renderHome(); return; }
    hideTabs();
    A.sfx.whoosh();
    const section = document.createElement('section');
    section.className = 'screen';
    app.innerHTML = '';
    app.appendChild(section);
    const ctx = {
      profile: p,
      grade: p.grade,
      quit: renderPlayTab,
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
    hideTabs();
    const msg = r.stars === 3 ? 'Out of this world!' : r.stars === 2 ? 'Great flying!' : 'Good practice — go again!';
    const stage = RR.adventure.stageOf(p);
    const ready = RR.adventure.bossReady(p);
    app.innerHTML = `
      <section class="screen results">
        <div class="starsbig ${r.stars === 3 ? 'allstars' : ''}">
          ${[0, 1, 2].map(i => `<span class="star ${i < r.stars ? 'earn' : ''}" style="animation-delay:${0.15 + i * 0.3}s">★</span>`).join('')}
        </div>
        <div class="reshero">${heroFigureHtml(p)}</div>
        <h1>${msg}</h1>
        ${r.line1 ? `<p class="resline">${r.line1}</p>` : ''}
        ${r.wpm ? `<p class="wpm">⚡ ${r.wpm} <small>words per minute</small></p>` : ''}
        ${r.line2 ? `<p class="resline">${r.line2}</p>` : ''}
        <p class="coinwin"><span id="coincount">+0 🪙</span><span class="seq" id="bonuschips">${meta.gemsEarned ? ` <span class="gemwin">+${meta.gemsEarned} 💎</span>` : ''} <span class="xpwin">+${meta.xpGained} XP</span></span></p>
        ${meta.levelUp ? `<p class="levelup seq">⬆️ LEVEL ${meta.levelUp} — ${P.titleOf(meta.levelUp)}!</p>` : ''}
        ${meta.diffBump ? `<p class="difftoast seq">${meta.diffBump.dir === 'up' ? `${meta.diffBump.cfg.e} Difficulty UP — ${meta.diffBump.cfg.label}!` : `${meta.diffBump.cfg.e} Eased to ${meta.diffBump.cfg.label}`}</p>` : ''}
        ${meta.rewardMul > 1 ? `<p class="gemhint seq">⚡ ${P.diffCfg(p).label} bonus ×${meta.rewardMul}</p>` : ''}
        ${meta.powerupEarned ? `<p class="puwin seq">🎖️ Perfect round! Power-up earned: ${({ shield: '🛡️ Shield', double: '⚡ Double', freeze: '⏳ Freeze' })[meta.powerupEarned]} — use it on a boss!</p>` : ''}
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
    /* a golden pop where each star lands */
    app.querySelectorAll('.starsbig .star.earn').forEach((st, i) => {
      setTimeout(() => {
        if (!st.isConnected) return;
        const rc = st.getBoundingClientRect();
        RR.confetti.starTrail(rc.left + rc.width / 2, rc.top + rc.height / 2);
      }, 450 + i * 300);
    });
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
    if (meta.levelUp) setTimeout(() => { A.sfx.victory(); RR.confetti.fireworks(4); }, 2000);
    if (meta.diffBump && meta.diffBump.dir === 'up') setTimeout(() => { A.sfx.fanfare(); RR.confetti.burst(90); A.speak(`${meta.diffBump.cfg.label} mode unlocked!`); }, 2200);
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
    app.querySelector('[data-act="menu"]').addEventListener('click', renderPlayTab);
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
  RR.nav.play = renderPlayTab;
  RR.nav.me = renderMeTab;
  RR.nav.game = startGame;
  RR.nav.ceremony = renderCeremony;

  renderHome();
})();
