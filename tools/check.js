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

console.log('Static-site invariants passed.');
