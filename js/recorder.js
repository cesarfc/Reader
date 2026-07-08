/* Reading Rocket — parent-voice recordings.
   Grown-ups record themselves reading Book Maker pages; kids play the real
   family voice instead of TTS. Audio blobs live in IndexedDB (localStorage
   is far too small for audio) keyed '<bookId>:<pageIndex>'.
   Recording needs getUserMedia + MediaRecorder — supported() gates all UI. */

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

  return { supported, save, get, remove, start, stop, get recording() { return !!rec; } };
})();
