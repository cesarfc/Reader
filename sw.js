/* Reading Rocket — service worker.
   Strategy: NETWORK-FIRST with cache fallback. The app is actively evolving,
   and cache-first caused mixed old/new file versions (broken buttons, stale
   voice code). Network-first means every online load gets fresh, consistent
   files; the cache only steps in when offline. */

const CACHE = 'reading-rocket-v20';
const CORE = [
  './',
  'index.html',
  'css/styles.css',
  'js/data.js',
  'js/audio.js',
  'js/voice.js',
  'js/recorder.js',
  'js/confetti.js',
  'js/state.js',
  'js/progress.js',
  'js/imgmap.js',
  'js/img.js',
  'js/games.js',
  'js/adventure.js',
  'js/base.js',
  'js/story.js',
  'js/duel.js',
  'js/app.js',
  'manifest.webmanifest',
  'icons/icon.svg'
];
const OPTIONAL = ['icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'fonts/Baloo2.woff2'];

/* Best-effort precache of the OpenMoji art referenced by imgmap.js, so the
   illustrated emoji work offline from the very first install. The map is
   parsed as text — imgmap.js references window and can't run in a worker. */
function precacheOpenmoji(cache) {
  return fetch(new Request('js/imgmap.js', { cache: 'no-cache' }))
    .then(res => (res.ok ? res.text() : ''))
    .then(text => {
      const codes = Array.from(text.matchAll(/:"([0-9A-F][0-9A-F-]*)"/g), m => m[1]);
      return Promise.all(codes.map(code => {
        const url = 'img/openmoji/' + code + '.svg';
        return fetch(new Request(url, { cache: 'no-cache' }))
          .then(res => { if (res.ok) return cache.put(url, res); })
          .catch(() => { /* art is optional — text emoji is the fallback */ });
      }));
    })
    .catch(() => { /* offline install: runtime caching will pick these up */ });
}

/* Pre-cache fresh copies, bypassing the HTTP cache so we never seed the
   service worker cache with stale files. */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.all(
        CORE.concat(OPTIONAL).map(url =>
          fetch(new Request(url, { cache: 'no-cache' }))
            .then(res => { if (res.ok) return cache.put(url, res); })
            .catch(() => { /* optional assets may be missing */ })
        ).concat(precacheOpenmoji(cache))
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  /* cache:'no-cache' forces revalidation with the server — without it the
     browser's heuristic HTTP cache can hand back stale files and the app
     ends up running mixed old/new code. */
  const req = e.request.mode === 'navigate'
    ? new Request(e.request.url, { cache: 'no-cache' })
    : new Request(e.request, { cache: 'no-cache' });
  e.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, copy));
        return res;
      })
      .catch(() =>
        caches.match(e.request).then(hit =>
          hit || (e.request.mode === 'navigate' ? caches.match('index.html') : undefined)
        )
      )
  );
});
