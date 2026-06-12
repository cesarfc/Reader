/* Reading Rocket — confetti celebration on a fixed canvas overlay. */

window.RR = window.RR || {};

RR.confetti = (function () {
  const canvas = document.getElementById('confetti-canvas');
  const cx = canvas.getContext('2d');
  const COLORS = ['#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#a855f7', '#ef4444', '#14b8a6'];
  let parts = [];
  let running = false;

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    cx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  function burst(n = 120) {
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
    if (!running) { running = true; requestAnimationFrame(tick); }
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
      } else {
        cx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      cx.restore();
    }
    if (parts.length) requestAnimationFrame(tick);
    else { running = false; cx.clearRect(0, 0, window.innerWidth, window.innerHeight); }
  }

  return { burst };
})();
