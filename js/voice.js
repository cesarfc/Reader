/* Reading Rocket — Listen mode (speech recognition), strictly assistive.
   When the app can hear the child read, a match adds praise and auto-advances.
   A non-match NEVER punishes: the tap buttons stay, stars are unchanged, and
   everything silently falls back to today's honor system.

   Unavailable inside the iOS WKWebView wrapper (Web Speech recognition does
   not exist there) and anywhere else without SpeechRecognition — in those
   places supported() is false and the feature hides entirely. */

window.RR = window.RR || {};

RR.voice = (function () {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const inWrapper = location.protocol === 'rocket:' ||
    !!(window.webkit && window.webkit.messageHandlers);

  function supported() { return !!SR && !inWrapper; }
  function enabled() { return supported() && localStorage.getItem('rr.listen') === '1'; }
  function setEnabled(v) { localStorage.setItem('rr.listen', v ? '1' : '0'); }

  /* ---------- forgiving matching ---------- */
  const HOMOPHONES = [
    ['to', 'too', 'two'], ['see', 'sea'], ['be', 'bee'], ['hear', 'here'],
    ['no', 'know'], ['for', 'four'], ['one', 'won'], ['ate', 'eight'],
    ['blue', 'blew'], ['red', 'read'], ['right', 'write'], ['sun', 'son'],
    ['there', 'their'], ['by', 'buy', 'bye'], ['our', 'hour'], ['new', 'knew'],
    ['would', 'wood'], ['i', 'eye'], ['you', 'u'], ['oh', 'o']
  ];
  function homosOf(word) {
    for (const grp of HOMOPHONES) if (grp.includes(word)) return grp;
    return [word];
  }

  function norm(s) {
    return String(s).toLowerCase()
      .replace(/[’']/g, "'")
      .replace(/[^a-z0-9' ]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* edit distance ≤ 1 — forgives one slipped letter on longer words */
  function lev1(a, b) {
    if (Math.abs(a.length - b.length) > 1) return false;
    let i = 0, j = 0, edits = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++edits > 1) return false;
      if (a.length > b.length) i++;
      else if (b.length > a.length) j++;
      else { i++; j++; }
    }
    return edits + (a.length - i) + (b.length - j) <= 1;
  }

  function wordMatch(said, want) {
    if (said === want) return true;
    if (homosOf(want).includes(said)) return true;
    if (want.length >= 4 && lev1(said, want)) return true;
    return false;
  }

  /* Which of the expected words were heard (greedy, order-free).
     Returns an array of matched indices into norm(expect).split(' '). */
  function matchedIndices(transcript, expect) {
    const saids = norm(transcript).split(' ').filter(Boolean);
    const wants = norm(expect).split(' ').filter(Boolean);
    const hit = [];
    const pool = saids.slice();
    wants.forEach((w, wi) => {
      const i = pool.findIndex(s => wordMatch(s, w));
      if (i >= 0) { hit.push(wi); pool.splice(i, 1); }
    });
    return hit;
  }
  function matchScore(transcript, expect) {
    const wants = norm(expect).split(' ').filter(Boolean);
    return wants.length ? matchedIndices(transcript, expect).length / wants.length : 0;
  }

  /* ---------- listening ---------- */
  let rec = null;

  function stop() {
    if (rec) { const r = rec; rec = null; try { r.abort ? r.abort() : r.stop(); } catch (e) { /* already stopped */ } }
  }

  /* listen({expect, minScore, timeoutMs, onPartial, onMatch, onEnd})
     onPartial(matchedIdxs) on every interim result; onMatch() once when the
     expected text is heard well enough; onEnd(matched) always fires once. */
  function listen(opts) {
    if (!enabled()) { if (opts.onEnd) opts.onEnd(false); return null; }
    stop();
    const minScore = opts.minScore != null ? opts.minScore : 0.7;
    let done = false;
    let matched = false;
    const r = new SR();
    rec = r;
    r.lang = 'en-US';
    r.interimResults = true;
    r.continuous = true;
    r.maxAlternatives = 3;

    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(tId);
      if (rec === r) rec = null;
      try { r.stop(); } catch (e) { /* already stopped */ }
      if (opts.onEnd) opts.onEnd(matched);
    };
    const tId = setTimeout(finish, opts.timeoutMs || 15000);

    r.onresult = e => {
      if (done) return;
      let text = '';
      for (let i = 0; i < e.results.length; i++) {
        for (let k = 0; k < e.results[i].length; k++) text += ' ' + e.results[i][k].transcript;
      }
      if (opts.onPartial) opts.onPartial(matchedIndices(text, opts.expect));
      if (!matched && matchScore(text, opts.expect) >= minScore) {
        matched = true;
        if (opts.onMatch) opts.onMatch();
        finish();
      }
    };
    r.onerror = finish; /* mic denied / no speech / anything → silent fallback */
    r.onend = finish;
    try { r.start(); } catch (e) { finish(); }
    return r;
  }

  return { supported, enabled, setEnabled, listen, stop, norm, matchScore, matchedIndices };
})();
