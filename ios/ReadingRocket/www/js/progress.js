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
    { id: 'lvl25',    e: '🌌', name: 'Level 25',         hint: 'Reach Reader Level 25',          test: p => levelOf(p.xp || 0).level >= 25 }
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

  return {
    MASTER_AT, localDate, weekKey,
    rec, isMastered, countMastered, troubleWords,
    gradeProgress, nextGrade, readyToGraduate,
    levelOf, titleOf,
    ensureQuests, questDef, applyEvent,
    badges,
    stickerCount, stickerTotal, rollSticker, nextActivity
  };
})();
