/* Reading Rocket — parent-voice recordings.
   Grown-ups record themselves reading Book Maker pages; kids play the real
   family voice instead of TTS. Audio blobs live in IndexedDB (localStorage
   is far too small for audio) keyed '<bookId>:<pageIndex>'.
   Letter-sound clips from the Family Voice studio use keys 'snd:<sound>'
   (e.g. 'snd:kuh') and are preloaded into an in-memory bank at boot so
   audio.speak() can check for them synchronously.
   Recording needs getUserMedia + MediaRecorder — supported() gates recording
   UI only; playback of existing clips works on mic-less devices too. */

window.RR = window.RR || {};

RR.rec = (function () {
  const DB = 'rr-audio';
  const STORE = 'clips';

  function db() {
    return new Promise((res, rej) => {
      const rq = indexedDB.open(DB, 1);
      rq.onupgradeneeded = () => rq.result.createObjectStore(STORE);
      rq.onsuccess = () => res(rq.result);
      rq.onerror = () => rej(rq.error);
    });
  }

  function save(key, blob) {
    return db().then(d => new Promise((res, rej) => {
      const t = d.transaction(STORE, 'readwrite');
      t.objectStore(STORE).put(blob, key);
      t.oncomplete = () => res(true);
      t.onerror = () => rej(t.error);
    }));
  }

  function get(key) {
    return db().then(d => new Promise((res, rej) => {
      const rq = d.transaction(STORE).objectStore(STORE).get(key);
      rq.onsuccess = () => res(rq.result || null);
      rq.onerror = () => rej(rq.error);
    }));
  }

  function remove(key) {
    return db().then(d => new Promise((res, rej) => {
      const t = d.transaction(STORE, 'readwrite');
      t.objectStore(STORE).delete(key);
      t.oncomplete = () => res(true);
      t.onerror = () => rej(t.error);
    }));
  }

  function supported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia &&
      window.MediaRecorder && window.indexedDB);
  }

  /* ---------- Family Voice sound bank ----------
     All 'snd:*' clips held in memory as object URLs, keyed by the bare sound
     string ('kuh'), so speak() can consult the bank without an async hop. */
  const SND = 'snd:';
  let bank = {};

  function loadSounds() {
    if (!window.indexedDB) return Promise.resolve(bank);
    return db().then(d => new Promise(res => {
      const store = d.transaction(STORE).objectStore(STORE);
      const keysRq = store.getAllKeys();
      const valsRq = store.getAll();
      let keys = null, vals = null;
      const finish = () => {
        if (!keys || !vals) return;
        Object.keys(bank).forEach(k => URL.revokeObjectURL(bank[k]));
        bank = {};
        keys.forEach((k, i) => {
          if (typeof k === 'string' && k.startsWith(SND) && vals[i]) {
            bank[k.slice(SND.length)] = URL.createObjectURL(vals[i]);
          }
        });
        res(bank);
      };
      keysRq.onsuccess = () => { keys = keysRq.result || []; finish(); };
      valsRq.onsuccess = () => { vals = valsRq.result || []; finish(); };
      keysRq.onerror = valsRq.onerror = () => res(bank);
    })).catch(() => bank);
  }
  loadSounds();

  function sound(str) { return bank[str] || null; }
  function soundCount() { return Object.keys(bank).length; }

  let rec = null;
  let stream = null;
  let chunks = [];

  function start() {
    if (!supported()) return Promise.reject(new Error('recording unsupported'));
    return navigator.mediaDevices.getUserMedia({ audio: true }).then(st => {
      stream = st;
      chunks = [];
      rec = new MediaRecorder(st);
      rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
      rec.start();
    });
  }

  function stop() {
    return new Promise(res => {
      if (!rec) { res(null); return; }
      const r = rec;
      r.onstop = () => {
        const blob = new Blob(chunks, { type: r.mimeType || 'audio/webm' });
        if (stream) stream.getTracks().forEach(t => t.stop());
        rec = null;
        stream = null;
        chunks = [];
        res(blob.size ? blob : null);
      };
      try { r.stop(); } catch (e) { res(null); }
    });
  }

  return {
    supported, save, get, remove, start, stop,
    loadSounds, sound, soundCount, SND,
    get recording() { return !!rec; }
  };
})();
