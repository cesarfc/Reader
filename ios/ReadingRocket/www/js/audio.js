/* Reading Rocket — speech (Web Speech API) + sound effects (WebAudio synth).
   Voices vary wildly by device: macOS/iOS ship many robotic "novelty" voices
   that must never be picked. We rank every English voice by quality
   (Natural/Neural > Premium > Enhanced > Google > known-good names) and use
   the best one unless the grown-up picked a voice in Settings. */

window.RR = window.RR || {};

RR.audio = (function () {
  let muted = localStorage.getItem('rr.muted') === '1';
  let voiceName = localStorage.getItem('rr.voice') || '';
  let rateMul = parseFloat(localStorage.getItem('rr.rate')) || 1;
  let voice = null;
  let actx = null;

  /* ---------- Voice ranking ---------- */
  const NOVELTY = [
    'albert', 'bad news', 'bahh', 'bells', 'boing', 'bubbles', 'cellos',
    'deranged', 'eddy', 'flo', 'fred', 'good news', 'grandma', 'grandpa',
    'jester', 'junior', 'kathy', 'organ', 'ralph', 'reed', 'rocko', 'sandy',
    'shelley', 'superstar', 'trinoids', 'whisper', 'wobble', 'zarvox'
  ];

  function score(v) {
    if (!/^en/i.test(v.lang)) return -1;
    const base = v.name.split('(')[0].trim().toLowerCase();
    if (NOVELTY.some(n => base === n || base.startsWith(n + ' '))) return -1;
    let s = 0;
    if (/en[-_]US/i.test(v.lang)) s += 4;
    if (/natural|neural/i.test(v.name)) s += 14;  /* Edge neural voices */
    if (/premium/i.test(v.name)) s += 12;
    if (/enhanced/i.test(v.name)) s += 10;
    if (/google/i.test(v.name)) s += 9;           /* beats basic system voices */
    if (/^(ava|zoe|allison|samantha|susan|joelle|nicky|evan|nathan|noelle|tom|aaron|karen|moira|tessa)\b/i.test(v.name.trim())) s += 5;
    if (/samantha/i.test(v.name)) s += 2;         /* best built-in Apple default */
    if (v.localService) s += 1;
    return s;
  }

  function ranked() {
    if (!('speechSynthesis' in window)) return [];
    return speechSynthesis.getVoices()
      .map(v => ({ v, s: score(v) }))
      .filter(x => x.s >= 0)
      .sort((a, b) => b.s - a.s)
      .map(x => x.v);
  }

  function qualityLabel(v) {
    if (/natural|neural|premium/i.test(v.name)) return '✨ most natural';
    if (/enhanced/i.test(v.name)) return '✨ natural';
    if (/google/i.test(v.name) || /^(ava|zoe|samantha|allison)\b/i.test(v.name)) return 'good';
    return 'basic';
  }

  function pickVoice() {
    const list = ranked();
    voice = list.find(v => v.name === voiceName) || list[0] || null;
  }
  if ('speechSynthesis' in window) {
    pickVoice();
    speechSynthesis.addEventListener('voiceschanged', pickVoice);
  }

  /* ---------- Speech ---------- */
  /* Keep utterances referenced until they finish — Chrome can garbage-collect
     them mid-sentence, which cuts speech off and drops onend. */
  const pending = new Set();

  /* pitch defaults to 1.0 — raising it makes every voice sound more synthetic */
  function speak(text, opts = {}) {
    const { rate = 0.85, pitch = 1.0, interrupt = true, onend = null } = opts;
    if (muted || !('speechSynthesis' in window) || !text) {
      /* No audio, but callers waiting on speech still need their callback. */
      if (onend) setTimeout(onend, 250);
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.rate = Math.min(1.5, Math.max(0.5, rate * rateMul));
    u.pitch = pitch;
    pending.add(u);
    let done = false;
    const fin = () => {
      if (done) return;
      done = true;
      pending.delete(u);
      if (onend) onend();
    };
    u.onend = fin;
    u.onerror = fin;
    /* Safety net in case onend never fires (some mobile browsers). */
    setTimeout(fin, Math.max(2000, text.length * 160));

    const fire = () => {
      speechSynthesis.resume();
      speechSynthesis.speak(u);
    };
    if (interrupt && (speechSynthesis.speaking || speechSynthesis.pending)) {
      /* iOS clips the start of an utterance spoken immediately after cancel —
         give the engine a beat to reset. */
      speechSynthesis.cancel();
      setTimeout(fire, 60);
    } else {
      fire();
    }
  }

  /* Speak a list of items one after another with a small gap.
     Each item: {text, opts} or a plain string. cb runs at the end. */
  function speakSeq(items, gapMs = 350, cb = null, onEach = null) {
    let i = 0;
    function nextItem() {
      if (i >= items.length) { if (cb) cb(); return; }
      const item = typeof items[i] === 'string' ? { text: items[i] } : items[i];
      if (onEach) onEach(i);
      i++;
      speak(item.text, Object.assign({}, item.opts, {
        interrupt: false,
        onend: () => setTimeout(nextItem, gapMs)
      }));
    }
    if (muted || !('speechSynthesis' in window)) { if (cb) cb(); return; }
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
      setTimeout(nextItem, 60); /* avoid iOS start-of-speech clipping */
    } else {
      nextItem();
    }
  }

  function stop() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  }

  function sample() {
    speak("Hi! Let's sound it out together. kuh… ah… tuh… cat! Great job!", { rate: 0.9 });
  }

  /* ---------- Sound effects ---------- */
  function ctx() {
    if (!actx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      actx = new AC();
    }
    if (actx.state === 'suspended') actx.resume();
    return actx;
  }

  function tone(freq, start, dur, type = 'sine', vol = 0.18) {
    const ac = ctx();
    if (!ac || muted) return;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type;
    o.frequency.value = freq;
    const t0 = ac.currentTime + start;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(ac.destination);
    o.start(t0);
    o.stop(t0 + dur + 0.05);
  }

  /* Optional listener (the on-screen pet buddy reacts to these). */
  function feedback(kind) {
    if (RR.onFeedback) try { RR.onFeedback(kind); } catch (e) { /* never break audio */ }
  }

  const sfx = {
    pop()     { tone(520, 0, 0.07, 'triangle', 0.22); },
    ding()    { feedback('happy'); tone(660, 0, 0.12); tone(880, 0.1, 0.18); },
    buzz()    { feedback('sad'); tone(140, 0, 0.2, 'square', 0.08); },
    star()    { feedback('party'); [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.16, 'triangle', 0.2)); },
    fanfare() { feedback('party'); [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.12, 0.22, 'triangle', 0.2)); },
    page()    { tone(700, 0, 0.05, 'triangle', 0.1); tone(420, 0.04, 0.1, 'sine', 0.07); },
    tick()    { tone(900, 0, 0.04, 'sine', 0.1); },
    whoosh()  { tone(300, 0, 0.25, 'sawtooth', 0.05); tone(600, 0.05, 0.2, 'sawtooth', 0.04); },
    coin()    { tone(988, 0, 0.07, 'square', 0.08); tone(1319, 0.07, 0.16, 'square', 0.08); },
    coins()   { [988, 1175, 1319, 1568].forEach((f, i) => tone(f, i * 0.06, 0.1, 'square', 0.07)); },
    gem()     { [1319, 1760, 2093].forEach((f, i) => tone(f, i * 0.08, 0.2, 'sine', 0.14)); },
    hit()     { feedback('happy'); tone(220, 0, 0.1, 'square', 0.12); tone(110, 0.03, 0.16, 'sawtooth', 0.1); },
    crit()    { tone(440, 0, 0.08, 'square', 0.14); tone(880, 0.06, 0.1, 'square', 0.14); tone(1760, 0.12, 0.2, 'square', 0.12); tone(80, 0, 0.22, 'sawtooth', 0.12); },
    hurt()    { feedback('sad'); tone(196, 0, 0.18, 'sawtooth', 0.1); tone(147, 0.12, 0.22, 'sawtooth', 0.09); },
    victory() { feedback('party'); [523, 523, 523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.18, 'triangle', 0.2)); },
    defeat()  { [392, 330, 262, 196].forEach((f, i) => tone(f, i * 0.16, 0.22, 'triangle', 0.12)); },
    chest()   { tone(330, 0, 0.12, 'triangle', 0.15); [659, 784, 988, 1319].forEach((f, i) => tone(f, 0.18 + i * 0.07, 0.12, 'square', 0.08)); }
  };

  /* Unlock audio on the first user touch (required on iOS). */
  function unlock() { ctx(); }
  document.addEventListener('pointerdown', unlock, { once: true });

  return {
    speak, speakSeq, stop, sfx, sample, qualityLabel,
    voices: ranked,
    get voiceName() { return voice ? voice.name : ''; },
    setVoice(name) {
      voiceName = name;
      localStorage.setItem('rr.voice', name);
      pickVoice();
    },
    get rateMul() { return rateMul; },
    setRate(m) {
      rateMul = m;
      localStorage.setItem('rr.rate', String(m));
    },
    get muted() { return muted; },
    setMuted(v) {
      muted = v;
      localStorage.setItem('rr.muted', v ? '1' : '0');
      if (v) stop();
    }
  };
})();
