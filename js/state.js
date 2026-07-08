/* Reading Rocket — profiles, coins, gear, mastery & progress in localStorage. */

window.RR = window.RR || {};

RR.state = (function () {
  const KEY = 'rr.save.v1';

  function uid() { return 'p' + Math.random().toString(36).slice(2, 9); }

  /* Fill in any fields missing from older saves. */
  function ensure(p) {
    p.stars = p.stars || 0;
    p.stats = p.stats || {};
    p.coins = p.coins || 0;
    p.gems = p.gems || 0;
    p.owned = p.owned || [];
    p.equipped = p.equipped || {};   /* {skin, weapon, armor, pet} -> item ids */
    p.stage = p.stage || 0;          /* index into RR.DATA.STAGES */
    p.stageWins = p.stageWins || 0;  /* training rounds done in current stage */
    p.lastGift = p.lastGift || '';   /* date of last daily gift */
    p.streak = p.streak || 0;        /* consecutive days played */
    p.mastery = p.mastery || {};     /* 'w:cat'/'s:the'/'l:a' -> {c, w} */
    p.xp = p.xp || 0;                /* Reader XP (never spent) */
    p.lifetime = p.lifetime || { coins: 0, gems: 0 };
    p.weekKey = p.weekKey || '';     /* for weekly counters */
    p.weekStars = p.weekStars || 0;
    p.weekMastered = p.weekMastered || 0;
    p.quests = p.quests || null;     /* today's quests, see progress.js */
    p.celebrated = p.celebrated || {}; /* grades graduated, e.g. {K:1} */
    p.stickers = p.stickers || {};   /* sticker id -> 1 normal | 2 shiny */
    p.diff = p.diff || (p.grade === 'K' ? 'chill' : 'normal');
    p.diffMode = p.diffMode || 'auto'; /* 'auto' or 'locked' */
    p.consecHigh = p.consecHigh || 0;
    p.consecLow = p.consecLow || 0;
    p.powerups = p.powerups || { shield: 0, double: 0, freeze: 0 }; /* battle boosts from perfect rounds */
    p.petState = p.petState || { xp: 0, happy: 100, lastTick: '' }; /* buddy growth + mood */
    p.base = p.base || { owned: [], placed: {} }; /* rocket-base decorations */
    p.duelWins = p.duelWins || 0;
    return p;
  }

  function defaults() {
    return {
      currentId: null,
      family: null, /* {target, reward, doneKey} — weekly family star goal */
      customBooks: [], /* parent-authored family books (Book Maker) */
      profiles: [
        ensure({ id: uid(), name: 'Little Reader', avatar: '🐣', grade: 'K' }),
        ensure({ id: uid(), name: 'Big Reader',    avatar: '🚀', grade: '3' })
      ]
    };
  }

  /* Backfill root-level fields missing from older or imported saves.
     Runs on every load AND after importSave swaps in a new object. */
  function ensureRoot(d) {
    d.customBooks = Array.isArray(d.customBooks) ? d.customBooks : [];
    return d;
  }

  let data;
  try {
    data = JSON.parse(localStorage.getItem(KEY)) || defaults();
    if (!Array.isArray(data.profiles) || !data.profiles.length) data = defaults();
    data.profiles.forEach(ensure);
  } catch (e) {
    data = defaults();
  }
  ensureRoot(data);

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* storage full/blocked */ }
  }

  function current() {
    return data.profiles.find(p => p.id === data.currentId) || null;
  }

  function setCurrent(id) { data.currentId = id; save(); }

  function addProfile(p) {
    const prof = ensure(Object.assign({ id: uid(), name: 'Reader', avatar: '⭐', grade: 'K' }, p));
    data.profiles.push(prof);
    save();
    return prof;
  }

  function removeProfile(id) {
    if (data.profiles.length <= 1) return;
    data.profiles = data.profiles.filter(p => p.id !== id);
    if (data.currentId === id) data.currentId = null;
    save();
  }

  /* ---------- gear ---------- */
  function item(id) { return RR.DATA.SHOP.find(s => s.id === id) || null; }
  function gear(p, slot) { return item(p.equipped[slot]); }
  function attack(p) { const w = gear(p, 'weapon'); return RR.DATA.HERO_BASE_ATTACK + (w ? w.power : 0); }
  function hearts(p) { const a = gear(p, 'armor'); return RR.DATA.HERO_BASE_HEARTS + (a ? a.power : 0); }
  function coinBoost(p) { const pet = gear(p, 'pet'); return pet ? pet.power : 0; }
  function streakBoost(p) { return Math.min(Math.max((p.streak || 1) - 1, 0) * 10, 50); }
  function heroEmoji(p) { const s = gear(p, 'skin'); return s ? s.e : p.avatar; }

  /* Add coins with pet + daily-streak bonuses applied; returns what was earned. */
  function earn(p, base) {
    const earned = Math.ceil(base * (1 + (coinBoost(p) + streakBoost(p)) / 100));
    p.coins += earned;
    p.lifetime.coins += earned;
    save();
    return earned;
  }

  function buy(p, id) {
    const it = item(id);
    if (!it || p.owned.includes(id)) return false;
    if (it.gems) {
      if (p.gems < it.gems) return false;
      p.gems -= it.gems;
    } else {
      if (p.coins < it.price) return false;
      p.coins -= it.price;
    }
    p.owned.push(id);
    p.equipped[it.slot] = id;
    save();
    return true;
  }

  function equip(p, id) {
    const it = item(id);
    if (!it || !p.owned.includes(id)) return;
    p.equipped[it.slot] = p.equipped[it.slot] === id ? null : id; /* tap again to unequip */
    save();
  }

  /* ---------- rocket base ---------- */
  function baseItem(id) { return RR.DATA.BASE.items.find(i => i.id === id) || null; }
  function buyBase(p, id) {
    const it = baseItem(id);
    if (!it || p.base.owned.includes(id) || p.coins < it.price) return false;
    p.coins -= it.price;
    p.base.owned.push(id);
    p.base.placed[it.slot] = id;
    save();
    return true;
  }
  function placeBase(p, id) { /* tap an owned item to place it; tap again to clear the spot */
    const it = baseItem(id);
    if (!it || !p.base.owned.includes(id)) return;
    p.base.placed[it.slot] = p.base.placed[it.slot] === id ? null : id;
    save();
  }

  /* ---------- mastery ---------- */
  /* Returns true when this bump just crossed the mastery line. */
  function bump(p, key, ok) {
    const r = p.mastery[key] || { c: 0, w: 0 };
    if (ok) r.c++; else r.w++;
    p.mastery[key] = r;
    return ok && r.c === RR.progress.MASTER_AT;
  }

  function rollWeek(p) {
    const wk = RR.progress.weekKey();
    if (p.weekKey !== wk) {
      p.weekKey = wk;
      p.weekStars = 0;
      p.weekMastered = 0;
    }
  }

  /* ---------- custom books (Book Maker) ---------- */
  function customBooks() { return data.customBooks; }
  /* Insert or update a family book. New books get a stable id; existing ones
     (matched by id) are replaced in place. Book shape mirrors DATA.BOOKS
     entries plus custom:true. Always persists; returns the saved book. */
  function saveCustomBook(book) {
    if (!book.id) book.id = 'custom-' + Date.now().toString(36);
    const i = data.customBooks.findIndex(b => b.id === book.id);
    if (i >= 0) data.customBooks[i] = book;
    else data.customBooks.push(book);
    save();
    return book;
  }
  function removeCustomBook(id) {
    data.customBooks = data.customBooks.filter(b => b.id !== id);
    save();
  }

  /* ---------- family goal ---------- */
  function familyGoal() { return data.family; }
  function setFamilyGoal(goal) { data.family = goal; save(); }
  function familyWeekStars() {
    data.profiles.forEach(rollWeek);
    return data.profiles.reduce((n, p) => n + (p.weekStars || 0), 0);
  }

  /* ---------- backup & transfer ---------- */
  /* Compact JSON with a wrapper so imports can sanity-check the payload. */
  function exportSave() {
    return JSON.stringify({ app: 'reading-rocket', v: 1, data });
  }

  /* Replace the whole save from a code. Accepts the wrapped { app, v, data }
     form or a bare legacy { profiles:[...] } object. Validates into a temp
     var and only swaps `data` on success, so a bad code never corrupts the
     live save. Never throws — returns true/false. */
  function importSave(text) {
    try {
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== 'object') return false;
      const next = Array.isArray(parsed.profiles) ? parsed : parsed.data;
      if (!next || typeof next !== 'object') return false;
      if (!Array.isArray(next.profiles) || !next.profiles.length) return false;
      if (!next.profiles.every(p => p && typeof p === 'object' && p.id && p.name)) return false;
      next.profiles.forEach(ensure); /* backfill fields missing from older exports */
      ensureRoot(next);              /* backfill root-level fields (e.g. customBooks) */
      data = next;
      save();
      return true;
    } catch (e) {
      return false;
    }
  }

  /* ---------- record a finished training round ---------- */
  function recordRound(profile, gameId, grade, result) {
    rollWeek(profile);

    const key = gameId + '-' + grade;
    const s = profile.stats[key] || { best: 0, plays: 0, bestWpm: 0, bestScore: 0 };
    s.plays += 1;
    s.best = Math.max(s.best, result.stars || 0);
    if (result.wpm)   s.bestWpm   = Math.max(s.bestWpm || 0, result.wpm);
    if (result.score) s.bestScore = Math.max(s.bestScore || 0, result.score);
    profile.stats[key] = s;
    profile.stars = (profile.stars || 0) + (result.stars || 0);
    profile.weekStars += (result.stars || 0);

    /* per-word mastery from this round's answers */
    const newlyMastered = [];
    for (const o of result.outcomes || []) {
      if (bump(profile, o.k, o.ok)) {
        profile.weekMastered++;
        newlyMastered.push(o.k.slice(2));
      }
    }

    /* difficulty: harder tiers pay a reward multiplier and auto-adapt */
    const rewardMul = RR.progress.diffCfg(profile).reward;
    const roundAcc = result.total ? (result.correct || 0) / result.total : null;
    const diffBump = roundAcc != null ? RR.progress.tuneDifficulty(profile, roundAcc) : null;

    /* this week's event may boost coins — combined multiplier is capped */
    const event = RR.progress.weeklyEvent();
    const totalMul = Math.min(2.5, rewardMul * (event.coinMul || 1));
    const coinsEarned = earn(profile, Math.round((result.coins || 0) * totalMul));

    /* gems: 1 for a 3-star round, +1 more for a perfect round */
    let gemsEarned = 0;
    if ((result.stars || 0) === 3) gemsEarned += 1;
    if (result.total && result.correct === result.total) gemsEarned += 1;
    profile.gems += gemsEarned;
    profile.lifetime.gems += gemsEarned;

    /* a perfect round also earns one battle power-up (whichever is lowest,
       capped at 3 each so the economy stays honest) */
    let powerupEarned = null;
    if (result.total && result.correct === result.total) {
      const pick = ['shield', 'double', 'freeze']
        .sort((a, b) => profile.powerups[a] - profile.powerups[b])[0];
      if (profile.powerups[pick] < 3) {
        profile.powerups[pick] += 1;
        powerupEarned = pick;
      }
    }

    /* Reader XP (same base as coins, but never spent) */
    const before = RR.progress.levelOf(profile.xp).level;
    const xpGained = Math.round(((result.coins || 0) + 8) * rewardMul);
    profile.xp += xpGained;
    const after = RR.progress.levelOf(profile.xp).level;

    /* daily quests */
    const questsDone = RR.progress.applyEvent(profile, {
      type: 'round', gameId, stars: result.stars, score: result.score, coins: coinsEarned
    });

    /* sticker reward for a solid round (Sticker Fest week: every round) */
    const sticker = ((result.stars || 0) >= 2 || event.stickerAll) ? RR.progress.rollSticker(profile) : null;

    /* the pet buddy grows a little with every finished round */
    if (profile.petState) profile.petState.xp += 4 + (result.stars || 0);

    /* progress toward waking the current boss */
    let bossJustReady = false;
    const stage = RR.DATA.STAGES[profile.stage];
    if (stage && profile.stageWins < stage.wins) {
      profile.stageWins += 1;
      bossJustReady = profile.stageWins >= stage.wins;
    }
    save();
    return {
      coinsEarned, gemsEarned, bossJustReady, newlyMastered, questsDone, sticker,
      xpGained, diffBump, rewardMul, powerupEarned,
      levelUp: after > before ? after : null,
      graduate: RR.progress.readyToGraduate(profile)
    };
  }

  return {
    get profiles() { return data.profiles; },
    current, setCurrent, addProfile, removeProfile, recordRound, save,
    item, gear, attack, hearts, coinBoost, streakBoost, heroEmoji, earn, buy, equip,
    baseItem, buyBase, placeBase,
    bump, rollWeek, familyGoal, setFamilyGoal, familyWeekStars,
    customBooks, saveCustomBook, removeCustomBook,
    exportSave, importSave
  };
})();
