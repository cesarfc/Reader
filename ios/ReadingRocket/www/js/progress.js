/* Reading Rocket — progression brain: per-word mastery, Grade Journey meter,
   Reader XP levels, daily quests, and badges.

   Mastery keys are namespaced: 'w:cat' (words), 's:the' (sight words),
   'l:a' (letters). A key is mastered after 3 first-try corrects. */

window.RR = window.RR || {};

RR.progress = (function () {
  const D = () => RR.DATA;

  function localDate(d = new Date()) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function weekKey() {
    const d = new Date();
    const monday = new Date(d - ((d.getDay() + 6) % 7) * 864e5);
    return localDate(monday);
  }

  /* ---------------- mastery ---------------- */
  const MASTER_AT = 3;

  function rec(p, key) { return p.mastery[key] || { c: 0, w: 0 }; }
  function isMastered(p, key) { return rec(p, key).c >= MASTER_AT; }

  function countMastered(p, prefix) {
    let n = 0;
    for (const k in p.mastery) {
      if (k.startsWith(prefix) && p.mastery[k].c >= MASTER_AT) n++;
    }
    return n;
  }

  /* Words the kid keeps missing (for the grown-up corner). */
  function troubleWords(p, max = 6) {
    return Object.entries(p.mastery)
      .filter(([k, r]) => r.w >= 2 && r.c < MASTER_AT && (k.startsWith('w:') || k.startsWith('s:')))
      .sort((a, b) => b[1].w - a[1].w)
      .slice(0, max)
      .map(([k]) => k.slice(2));
  }

  /* ---------------- Grade Journey ---------------- */
  function gradeProgress(p, grade) {
    const d = D();
    const words = d.WORDS[grade] || [];
    let wGot = words.filter(w => isMastered(p, 'w:' + w.w)).length;
    let wTotal = words.length;
    if (grade === 'K') { /* kindergarten counts the alphabet too */
      wGot += d.LETTERS.filter(l => isMastered(p, 'l:' + l.l)).length;
      wTotal += d.LETTERS.length;
    }
    const sightList = d.SIGHT[grade] || [];
    const sGot = sightList.filter(s => isMastered(p, 's:' + s)).length;
    const books = d.BOOKS[grade] || [];
    const bGot = books.filter(b => (p.stats['book-' + b.id] || {}).reads >= 1).length;
    const speedTarget = ({ K: 15, 1: 25, 2: 55, 3: 75, 4: 90, 5: 100 })[grade] || 60;
    const bestWpm = (p.stats['flash-' + grade] || {}).bestWpm || 0;

    const pct = (a, b) => (b ? Math.min(1, a / b) : 1);
    const overall =
      0.5 * pct(wGot, wTotal) +
      0.25 * pct(sGot, sightList.length) +
      0.15 * pct(bGot, books.length) +
      0.10 * pct(bestWpm, speedTarget);

    return {
      words: { got: wGot, total: wTotal },
      sight: { got: sGot, total: sightList.length },
      books: { got: bGot, total: books.length },
      speed: { wpm: bestWpm, target: speedTarget },
      overall: Math.min(1, overall)
    };
  }

  const GRADE_ORDER = ['K', '1', '2', '3', '4', '5'];
  function nextGrade(grade) {
    const i = GRADE_ORDER.indexOf(grade);
    return i >= 0 && i < GRADE_ORDER.length - 1 ? GRADE_ORDER[i + 1] : null;
  }
  function readyToGraduate(p) {
    return !!nextGrade(p.grade) &&
      !p.celebrated[p.grade] &&
      gradeProgress(p, p.grade).overall >= 0.8;
  }

  /* ---------------- Reader XP ---------------- */
  const TITLES = ['New Reader', 'Word Explorer', 'Sound Sleuth', 'Page Turner', 'Word Wizard',
    'Story Master', 'Reading Rocketeer', 'Galaxy Brain', 'Reading Legend', 'Reading Royalty'];

  function levelNeed(level) { return 80 + (level - 1) * 45; }
  function levelOf(xp) {
    let level = 1;
    let left = xp;
    while (level < 50 && left >= levelNeed(level)) {
      left -= levelNeed(level);
      level++;
    }
    return { level, into: left, need: levelNeed(level) };
  }
  function titleOf(level) { return TITLES[Math.min(TITLES.length - 1, ((level - 1) / 5) | 0)]; }

  /* ---------------- Daily quests ---------------- */
  const QUEST_TYPES = [
    { id: 'rounds', name: 'Finish 3 training rounds', e: '🎮', target: 3, reward: 20, ev: ev => ev.type === 'round' ? 1 : 0 },
    { id: 'coins', name: 'Earn 60 coins', e: '🪙', target: 60, reward: 20, ev: ev => ev.coins || 0 },
    { id: 'book', name: 'Finish a story book', e: '📚', target: 1, reward: 25, ev: ev => ev.gameId === 'books' ? 1 : 0 },
    { id: 'threestar', name: 'Get a 3-star round', e: '⭐', target: 1, reward: 25, ev: ev => ev.stars === 3 ? 1 : 0 },
    { id: 'boss', name: 'Battle a boss', e: '⚔️', target: 1, reward: 25, ev: ev => ev.type === 'battle' ? 1 : 0 },
    { id: 'sight10', name: 'Read 10+ words in one Lightning Round', e: '👀', target: 1, reward: 20, ev: ev => (ev.gameId === 'sight' && (ev.score || 0) >= 10) ? 1 : 0 }
  ];

  function ensureQuests(p) {
    const today = localDate();
    if (p.quests && p.quests.date === today) return;
    const picks = QUEST_TYPES.slice().sort(() => Math.random() - 0.5).slice(0, 3);
    p.quests = { date: today, bonus: false, items: picks.map(q => ({ id: q.id, progress: 0, done: false })) };
  }
  function questDef(id) { return QUEST_TYPES.find(q => q.id === id); }

  /* Feed a gameplay event into today's quests. Returns completions to show. */
  function applyEvent(p, ev) {
    ensureQuests(p);
    const completed = [];
    for (const item of p.quests.items) {
      if (item.done) continue;
      const def = questDef(item.id);
      item.progress += def.ev(ev);
      if (item.progress >= def.target) {
        item.done = true;
        p.coins += def.reward;
        p.lifetime.coins += def.reward;
        completed.push({ name: def.name, e: def.e, reward: def.reward });
      }
    }
    if (!p.quests.bonus && p.quests.items.every(i => i.done)) {
      p.quests.bonus = true;
      p.gems += 2;
      p.lifetime.gems += 2;
      completed.push({ name: 'All quests done!', e: '🎁', reward: 0, gems: 2 });
    }
    return completed;
  }

  /* ---------------- Badges ---------------- */
  function bookReads(p) {
    return Object.keys(p.stats).filter(k => k.startsWith('book-') && p.stats[k].reads >= 1).length;
  }

  /* Total plays of one game across all grades (stats keys are 'gameId-grade'). */
  function gamePlays(p, gameId) {
    return Object.keys(p.stats)
      .filter(k => k.startsWith(gameId + '-'))
      .reduce((n, k) => n + (p.stats[k].plays || 0), 0);
  }

  const BADGES = [
    { id: 'book1',    e: '📖', name: 'First Book',       hint: 'Finish a story book',            test: p => bookReads(p) >= 1 },
    { id: 'book5',    e: '📚', name: 'Bookworm',         hint: 'Finish 5 different books',       test: p => bookReads(p) >= 5 },
    { id: 'letters',  e: '🔠', name: 'Alphabet Ace',     hint: 'Master all 26 letter sounds',    test: p => countMastered(p, 'l:') >= 26 },
    { id: 'words10',  e: '🔤', name: 'Word Collector',   hint: 'Master 10 words',                test: p => countMastered(p, 'w:') >= 10 },
    { id: 'words50',  e: '🧠', name: 'Word Wizard',      hint: 'Master 50 words',                test: p => countMastered(p, 'w:') >= 50 },
    { id: 'sight20',  e: '👀', name: 'Sight Sniper',     hint: 'Master 20 sight words',          test: p => countMastered(p, 's:') >= 20 },
    { id: 'stars25',  e: '⭐', name: 'Star Catcher',     hint: 'Collect 25 stars',               test: p => (p.stars || 0) >= 25 },
    { id: 'stars100', e: '🌟', name: 'Star Hoarder',     hint: 'Collect 100 stars',              test: p => (p.stars || 0) >= 100 },
    { id: 'streak3',  e: '🔥', name: 'On a Roll',        hint: 'Play 3 days in a row',           test: p => (p.streak || 0) >= 3 },
    { id: 'streak7',  e: '☄️', name: 'Unstoppable',      hint: 'Play 7 days in a row',           test: p => (p.streak || 0) >= 7 },
    { id: 'coins500', e: '💰', name: 'Coin Collector',   hint: 'Earn 500 coins in total',        test: p => (p.lifetime.coins || 0) >= 500 },
    { id: 'gems10',   e: '💎', name: 'Gem Hunter',       hint: 'Earn 10 gems in total',          test: p => (p.lifetime.gems || 0) >= 10 },
    { id: 'boss1',    e: '👺', name: 'Goblin Buster',    hint: 'Beat your first boss',           test: p => p.stage >= 1 },
    { id: 'boss4',    e: '🐉', name: 'Dragon Tamer',     hint: 'Beat the first four bosses',     test: p => p.stage >= 4 },
    { id: 'champ',    e: '🏆', name: 'Galaxy Champion',  hint: 'Beat every boss',                test: p => p.stage >= 8 },
    { id: 'gradK',    e: '🎓', name: 'Kindergarten Grad', hint: 'Graduate from Kindergarten',    test: p => !!p.celebrated.K },
    { id: 'grad1',    e: '🎓', name: '1st Grade Grad',   hint: 'Graduate from 1st grade',        test: p => !!p.celebrated['1'] },
    { id: 'grad2',    e: '🎓', name: '2nd Grade Grad',   hint: 'Graduate from 2nd grade',        test: p => !!p.celebrated['2'] },
    { id: 'grad3',    e: '🎓', name: '3rd Grade Grad',   hint: 'Graduate from 3rd grade',        test: p => !!p.celebrated['3'] },
    { id: 'grad4',    e: '🎓', name: '4th Grade Grad',   hint: 'Graduate from 4th grade',        test: p => !!p.celebrated['4'] },
    { id: 'lvl10',    e: '🚀', name: 'Level 10',         hint: 'Reach Reader Level 10',          test: p => levelOf(p.xp || 0).level >= 10 },
    { id: 'lvl25',    e: '🌌', name: 'Level 25',         hint: 'Reach Reader Level 25',          test: p => levelOf(p.xp || 0).level >= 25 },
    { id: 'memory10',   e: '🧠', name: 'Memory Master',  hint: 'Play Memory Match 10 times',     test: p => gamePlays(p, 'memory') >= 10 },
    { id: 'sentence10', e: '📝', name: 'Sentence Smith', hint: 'Play Sentence Builder 10 times', test: p => gamePlays(p, 'sentence') >= 10 },
    { id: 'petstar',    e: '🐾', name: 'Best Friend',    hint: 'Grow your pet to Star Form',     test: p => ((p.petState || {}).xp || 0) >= 400 },
    { id: 'decorator',  e: '🛋️', name: 'Decorator',      hint: 'Decorate every spot in your base', test: p => p.base && Object.values(p.base.placed).filter(Boolean).length >= 6 },
    { id: 'story3',     e: '🌠', name: 'Story Fan',      hint: 'Read 3 story episodes',          test: p => episodesRead(p) >= 3 },
    { id: 'story8',     e: '🌟', name: 'Star Reader',    hint: 'Finish the whole story',         test: p => episodesRead(p) >= 8 },
    { id: 'story16',    e: '🔔', name: 'Galaxy Storyteller', hint: 'Finish Season 2 of the story', test: p => episodesRead(p) >= 16 },
    { id: 'duelist',    e: '⚔️', name: 'Duelist',        hint: 'Win a Sibling Duel',             test: p => (p.duelWins || 0) >= 1 },
    { id: 'rescue10',   e: '🛟', name: 'Word Lifeguard',  hint: 'Play Word Rescue 10 times',      test: p => gamePlays(p, 'rescue') >= 10 },
    { id: 'spell10',    e: '✏️', name: 'Spelling Star',   hint: 'Play Spell It 10 times',         test: p => gamePlays(p, 'spell') >= 10 }
  ];

  function badges(p) {
    return BADGES.map(b => ({ id: b.id, e: b.e, name: b.name, hint: b.hint, earned: b.test(p) }));
  }

  /* ---------------- Stickers ---------------- */
  function stickerCount(p) {
    return Object.keys(p.stickers || {}).length;
  }
  function stickerTotal() {
    return Object.values(D().STICKERS).reduce((n, pk) => n + pk.list.length, 0);
  }

  /* Roll one sticker (called for 2+ star rounds). Mutates the profile. */
  function rollSticker(p) {
    const packs = Object.keys(D().STICKERS);
    const packId = packs[(Math.random() * packs.length) | 0];
    const pack = D().STICKERS[packId];
    const idx = (Math.random() * pack.list.length) | 0;
    const id = packId + ':' + idx;
    const shiny = Math.random() < 0.05;
    const owned = p.stickers[id] || 0; /* 0 none, 1 normal, 2 shiny */
    let dupeCoins = 0;
    let isNew = false;
    let upgraded = false;
    if (!owned) {
      p.stickers[id] = shiny ? 2 : 1;
      isNew = true;
    } else if (shiny && owned === 1) {
      p.stickers[id] = 2;
      upgraded = true;
    } else {
      dupeCoins = shiny ? 15 : 5;
      p.coins += dupeCoins;
      p.lifetime.coins += dupeCoins;
    }
    return { id, e: pack.list[idx], packName: pack.name, packE: pack.e, shiny, isNew, upgraded, dupeCoins };
  }

  /* ---------------- Weekly event ---------------- */
  /* Deterministic pick from the week key: no server, same event for
     every profile, rotates each Monday. Missing data = no-op event. */
  function weeklyEvent() {
    const evs = D().EVENTS || [];
    if (!evs.length) return {};
    const wk = weekKey();
    let h = 0;
    for (let i = 0; i < wk.length; i++) h = (h * 31 + wk.charCodeAt(i)) | 0;
    return evs[Math.abs(h) % evs.length];
  }
  function eventDaysLeft() {
    return 7 - ((new Date().getDay() + 6) % 7); /* days until next Monday, counting today */
  }

  /* ---------------- Story campaign ---------------- */
  function totalRounds(p) {
    return Object.values(p.stats).reduce((n, s) => n + (s.plays || 0), 0);
  }
  function episodeRead(p, epId) { return ((p.stats['story-' + epId] || {}).reads || 0) > 0; }
  function episodesRead(p) {
    return (D().CAMPAIGN || []).filter(ep => episodeRead(p, ep.id)).length;
  }
  /* An episode opens when the one before it is read AND the rounds gate is met.
     Returns { open, reason } where reason explains a lock in kid words. */
  function campaignStatus(p, ep) {
    const eps = D().CAMPAIGN || [];
    const i = eps.indexOf(ep);
    if (i > 0 && !episodeRead(p, eps[i - 1].id)) {
      return { open: false, reason: `Read "${eps[i - 1].title}" first!` };
    }
    const need = (ep.unlock && ep.unlock.rounds) || 0;
    const have = totalRounds(p);
    if (have < need) {
      const left = need - have;
      return { open: false, reason: `Play ${left} more round${left === 1 ? '' : 's'} to unlock` };
    }
    return { open: true };
  }

  /* ---------------- Smart "PLAY" routing ---------------- */
  /* Picks the next best activity: unfinished quest first, then the game
     with the most unmastered content. Returns {kind:'game'|'battle', id}. */
  function nextActivity(p) {
    const d = D();
    const grade = p.grade;
    const available = id => {
      const g = RR.games[id];
      return g && (!g.grades || g.grades.includes(grade));
    };
    const unmastered = (list, prefix, keyFn) =>
      list.filter(it => !isMastered(p, prefix + keyFn(it))).length;

    const trainingPick = () => {
      const cand = [];
      if (available('blend')) cand.push({ id: 'blend', n: unmastered(d.WORDS[grade], 'w:', w => w.w) });
      if (available('build')) cand.push({ id: 'build', n: unmastered(d.WORDS[grade], 'w:', w => w.w) - 1 });
      if (available('sounds')) cand.push({ id: 'sounds', n: unmastered(d.LETTERS, 'l:', l => l.l) });
      if (available('sight')) cand.push({ id: 'sight', n: unmastered(d.SIGHT[grade], 's:', s => s) });
      if (available('memory')) cand.push({ id: 'memory', n: unmastered(d.WORDS[grade], 'w:', w => w.w) - 2 });
      if (available('rescue')) cand.push({ id: 'rescue', n: troubleWords(p, 99).length * 3 });
      if (available('spell')) cand.push({ id: 'spell', n: unmastered(d.WORDS[grade], 'w:', w => w.w) - 3 });
      cand.sort((a, b) => b.n - a.n);
      return cand[0] && cand[0].n > 0 ? cand[0].id : 'books';
    };

    ensureQuests(p);
    const open = p.quests.items.find(i => !i.done);
    if (open) {
      switch (open.id) {
        case 'book': return { kind: 'game', id: 'books' };
        case 'sight10': return { kind: 'game', id: 'sight' };
        case 'boss': {
          const stage = D().STAGES[p.stage];
          if (stage && p.stageWins >= stage.wins) return { kind: 'battle' };
          return { kind: 'game', id: trainingPick() };
        }
        default: return { kind: 'game', id: trainingPick() };
      }
    }
    /* no open quests: unread book beats training */
    const unread = (d.BOOKS[grade] || []).some(b => !(p.stats['book-' + b.id] || {}).reads);
    if (unread && Math.random() < 0.4) return { kind: 'game', id: 'books' };
    return { kind: 'game', id: trainingPick() };
  }

  /* ---------------- Difficulty ---------------- */
  function diffId(p) {
    return (p.diff && D().DIFF[p.diff]) ? p.diff : 'normal';
  }
  function diffCfg(p) { return D().DIFF[diffId(p)]; }

  /* Update rolling accuracy and, in auto mode, nudge the tier:
     3 strong rounds bump up, 2 weak rounds bump down. Returns a bump
     descriptor for a celebration toast, or null. */
  function tuneDifficulty(p, roundAcc) {
    p.acc = (p.acc == null) ? roundAcc : (p.acc * 0.6 + roundAcc * 0.4);
    if (p.diffMode === 'locked') return null;
    if (roundAcc >= 0.85) { p.consecHigh = (p.consecHigh || 0) + 1; p.consecLow = 0; }
    else if (roundAcc <= 0.5) { p.consecLow = (p.consecLow || 0) + 1; p.consecHigh = 0; }
    else { p.consecHigh = 0; p.consecLow = 0; }

    const order = D().DIFF_ORDER;
    let i = order.indexOf(diffId(p));
    if ((p.consecHigh || 0) >= 3 && i < order.length - 1) {
      p.diff = order[i + 1]; p.consecHigh = 0;
      return { dir: 'up', id: p.diff, cfg: D().DIFF[p.diff] };
    }
    if ((p.consecLow || 0) >= 2 && i > 0) {
      p.diff = order[i - 1]; p.consecLow = 0;
      return { dir: 'down', id: p.diff, cfg: D().DIFF[p.diff] };
    }
    return null;
  }

  function confusablesOf(token) {
    const out = [];
    for (const grp of D().CONFUSE) {
      if (grp.includes(token)) for (const t of grp) if (t !== token) out.push(t);
    }
    return out;
  }

  return {
    MASTER_AT, localDate, weekKey,
    rec, isMastered, countMastered, troubleWords,
    gradeProgress, nextGrade, readyToGraduate,
    levelOf, titleOf,
    ensureQuests, questDef, applyEvent,
    badges,
    stickerCount, stickerTotal, rollSticker, nextActivity,
    diffId, diffCfg, tuneDifficulty, confusablesOf,
    weeklyEvent, eventDaysLeft,
    totalRounds, episodeRead, episodesRead, campaignStatus
  };
})();
