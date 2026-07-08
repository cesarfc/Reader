/* Reading Rocket — confetti, fireworks & star trails on a fixed canvas overlay. */

window.RR = window.RR || {};

RR.confetti = (function () {
  const canvas = document.getElementById('confetti-canvas');
  const cx = canvas.getContext('2d');
  const COLORS = ['#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#a855f7', '#ef4444', '#14b8a6'];
  const GOLDS = ['#f59e0b', '#fbbf24', '#fde047'];
  let parts = [];
  let running = false;
  let timers = [];

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    cx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  function noMotion() {
    return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function go() {
    if (!running) { running = true; requestAnimationFrame(tick); }
  }

  function burst(n = 120) {
    if (noMotion()) return;
    const w = window.innerWidth;
    for (let i = 0; i < n; i++) {
      parts.push({
        x: w / 2 + (Math.random() - 0.5) * w * 0.5,
        y: -20 - Math.random() * 60,
        vx: (Math.random() - 0.5) * 3.4,
        vy: 2 + Math.random() * 3.2,
        size: 6 + Math.random() * 7,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.25,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        shape: Math.random() < 0.25 ? 'circle' : 'rect'
      });
    }
    go();
  }

  /* Radial explosion from a point (viewport CSS px). */
  function spawnAt(x, y, n, opt = {}) {
    if (noMotion()) return;
    const colors = opt.colors || COLORS;
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2;
      const sp = (opt.speed || 5) * (0.35 + Math.random() * 0.65);
      parts.push({
        x, y,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp - (opt.lift || 1),
        size: 5 + Math.random() * 6,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        color: colors[(Math.random() * colors.length) | 0],
        shape: opt.shape || (Math.random() < 0.25 ? 'circle' : 'rect')
      });
    }
    go();
  }

  /* Staggered multi-origin explosions across the upper screen. */
  function fireworks(count = 4) {
    if (noMotion()) return;
    for (let k = 0; k < count; k++) {
      timers.push(setTimeout(() => {
        const x = window.innerWidth * (0.15 + Math.random() * 0.7);
        const y = window.innerHeight * (0.12 + Math.random() * 0.33);
        spawnAt(x, y, 34, { speed: 6, shape: Math.random() < 0.5 ? 'star' : null });
      }, k * 380));
    }
  }

  /* Little golden pop of stars at a point (e.g. where a result star lands). */
  function starTrail(x, y) {
    spawnAt(x, y, 14, { speed: 3.4, shape: 'star', colors: GOLDS });
  }

  function drawStar(size) {
    cx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = i * 2 * Math.PI / 5 - Math.PI / 2;
      const b = a + Math.PI / 5;
      cx.lineTo(Math.cos(a) * size / 2, Math.sin(a) * size / 2);
      cx.lineTo(Math.cos(b) * size / 5, Math.sin(b) * size / 5);
    }
    cx.closePath();
    cx.fill();
  }

  function tick() {
    cx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const h = window.innerHeight;
    parts = parts.filter(p => p.y < h + 30);
    for (const p of parts) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.045;
      p.rot += p.vr;
      cx.save();
      cx.translate(p.x, p.y);
      cx.rotate(p.rot);
      cx.fillStyle = p.color;
      if (p.shape === 'circle') {
        cx.beginPath();
        cx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        cx.fill();
      } else if (p.shape === 'star') {
        drawStar(p.size * 1.4);
      } else {
        cx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      cx.restore();
    }
    if (parts.length) requestAnimationFrame(tick);
    else { running = false; cx.clearRect(0, 0, window.innerWidth, window.innerHeight); }
  }

  return { burst, fireworks, starTrail };
})();
