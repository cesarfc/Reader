const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const serviceWorker = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const scriptSources = Array.from(
  index.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi),
  match => match[1]
);
const coreMatch = serviceWorker.match(/\bconst\s+CORE\s*=\s*(\[[\s\S]*?\]);/);

invariant(coreMatch, 'Could not find the CORE array in sw.js');

const core = vm.runInNewContext(coreMatch[1]);
invariant(Array.isArray(core), 'sw.js CORE must be an array');
invariant(scriptSources.length > 0, 'index.html must load at least one script');

const coreScripts = core.filter(
  entry => typeof entry === 'string' && /\.js(?:[?#]|$)/.test(entry)
);
const expectedScripts = [...scriptSources].sort();
const actualScripts = [...coreScripts].sort();

invariant(
  JSON.stringify(actualScripts) === JSON.stringify(expectedScripts),
  `sw.js CORE scripts do not match index.html\nExpected: ${expectedScripts.join(', ')}\nActual: ${actualScripts.join(', ')}`
);

const dataSource = fs.readFileSync(path.join(root, 'js', 'data.js'), 'utf8');
const sandbox = {};
sandbox.window = sandbox;
vm.runInNewContext(dataSource, sandbox, { filename: 'js/data.js' });

const data = sandbox.RR && sandbox.RR.DATA;
invariant(data, 'js/data.js did not define RR.DATA');

for (const name of ['LETTERS', 'DIGRAPHS']) {
  const entries = data[name];
  invariant(Array.isArray(entries), `${name} must be an array`);
  entries.forEach((entry, index) => {
    invariant(
      entry &&
        typeof entry.l === 'string' &&
        entry.l.length > 0 &&
        typeof entry.s === 'string' &&
        entry.s.length > 0,
      `${name}[${index}] must have non-empty l and s values`
    );
  });
}

invariant(data.WORDS && typeof data.WORDS === 'object', 'WORDS must be an object');

for (const [grade, words] of Object.entries(data.WORDS)) {
  invariant(Array.isArray(words), `WORDS.${grade} must be an array`);
  words.slice(0, 3).forEach((word, index) => {
    invariant(
      word &&
        typeof word.w === 'string' &&
        word.w.length > 0 &&
        typeof word.e === 'string' &&
        word.e.length > 0 &&
        Array.isArray(word.t) &&
        word.t.length > 0 &&
        Array.isArray(word.s) &&
        word.s.length > 0,
      `WORDS.${grade}[${index}] must have non-empty w, e, t, and s values`
    );
  });
}

invariant(
  Array.isArray(data.REVIEW_CHEERS) && data.REVIEW_CHEERS.length > 0,
  'REVIEW_CHEERS must contain at least one celebration'
);

const reviewSandbox = {
  RR: {
    DATA: data,
    audio: {},
    state: {}
  }
};
reviewSandbox.window = reviewSandbox;
const progressSource = fs.readFileSync(path.join(root, 'js', 'progress.js'), 'utf8');
vm.runInNewContext(progressSource, reviewSandbox, { filename: 'js/progress.js' });
const gamesSource = fs.readFileSync(path.join(root, 'js', 'games.js'), 'utf8');
vm.runInNewContext(gamesSource, reviewSandbox, { filename: 'js/games.js' });

invariant(reviewSandbox.RR.games.review, 'Daily Review must be registered with the review game id');
invariant(reviewSandbox.RR.gameOrder.includes('review'), 'Daily Review must be included in game order');

const dueReviewProfile = {
  grade: 'K',
  mastery: {
    'w:cat': { c: 3, w: 0, last: '2000-01-01' },
    'l:a': { c: 3, w: 0, last: '2000-01-01' }
  }
};
invariant(
  reviewSandbox.RR.games.review.available(dueReviewProfile),
  'Daily Review must be available for due words and letters'
);
invariant(
  reviewSandbox.RR.progress.nextActivity(dueReviewProfile).id === 'review',
  'PLAY must route to Daily Review when a review is due'
);

const currentReviewProfile = {
  grade: 'K',
  mastery: {
    'w:cat': { c: 3, w: 0, last: '2999-01-01' }
  }
};
invariant(
  !reviewSandbox.RR.games.review.available(currentReviewProfile),
  'Daily Review must stay hidden when nothing is due'
);

const savedProgress = {
  currentId: 'reader',
  customBooks: [],
  profiles: [
    {
      id: 'reader',
      name: 'Reader',
      grade: 'K',
      weekKey: '2026-07-13',
      weekStars: 14,
      weekMastered: 3,
      weekHistory: [
        { week: '2026-05-18', stars: 2, mastered: 0 },
        { week: '2026-05-25', stars: 4, mastered: 1 },
        { week: '2026-06-01', stars: 6, mastered: 1 },
        { week: '2026-06-08', stars: 8, mastered: 2 },
        { week: '2026-06-15', stars: 10, mastered: 2 },
        { week: '2026-06-22', stars: 12, mastered: 3 },
        { week: '2026-06-29', stars: 9, mastered: 2 },
        { week: '2026-07-06', stars: 11, mastered: 3 }
      ]
    },
    {
      id: 'new-reader',
      name: 'New Reader',
      grade: 'K'
    }
  ]
};
const stateWrites = [];
const stateSandbox = {
  RR: {
    progress: {
      MASTER_AT: 3,
      weekKey: () => '2026-07-20'
    }
  },
  localStorage: {
    getItem: key => key === 'rr.save.v1' ? JSON.stringify(savedProgress) : null,
    setItem: (key, value) => stateWrites.push({ key, value })
  }
};
stateSandbox.window = stateSandbox;
const stateSource = fs.readFileSync(path.join(root, 'js', 'state.js'), 'utf8');
vm.runInNewContext(stateSource, stateSandbox, { filename: 'js/state.js' });

const returningReader = stateSandbox.RR.state.profiles[0];
stateSandbox.RR.state.rollWeek(returningReader);
invariant(returningReader.weekKey === '2026-07-20', 'rollWeek must advance the week key');
invariant(returningReader.weekStars === 0, 'rollWeek must reset weekly stars');
invariant(returningReader.weekMastered === 0, 'rollWeek must reset weekly mastery');
invariant(returningReader.weekHistory.length === 8, 'weekly history must remain capped at eight entries');
invariant(returningReader.weekHistory[0].week === '2026-05-25', 'weekly history must discard the oldest entry');
invariant(
  JSON.stringify(returningReader.weekHistory[7]) ===
    JSON.stringify({ week: '2026-07-13', stars: 14, mastered: 3 }),
  'rollWeek must snapshot the completed week'
);
stateSandbox.RR.state.rollWeek(returningReader);
invariant(returningReader.weekHistory.length === 8, 'rollWeek must not duplicate the current week');
invariant(stateWrites.length === 1, 'rollWeek must persist one rollover once');

const newReader = stateSandbox.RR.state.profiles[1];
stateSandbox.RR.state.rollWeek(newReader);
invariant(newReader.weekHistory.length === 0, 'rollWeek must not snapshot an unstarted week');

console.log('Static-site invariants passed.');
