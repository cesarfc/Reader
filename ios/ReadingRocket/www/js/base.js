/* Reading Rocket — My Base: a per-profile rocket interior to decorate.
   Fixed named slots, tap a spot to open its catalog, buy with coins.
   Pure coin sink — no stats, just a room that fills in as you read. */

window.RR = window.RR || {};
RR.nav = RR.nav || {};

(function () {
  const D = RR.DATA;
  const A = RR.audio;
  const S = RR.state;
  const app = document.getElementById('app');

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function renderBase(openSlot = null) {
    const p = S.current();
    if (!p) { RR.nav.home(); return; }
    const placedCount = Object.values(p.base.placed).filter(Boolean).length;
    const slotDef = id => D.BASE.slots.find(s => s.id === id);
    const item = id => S.baseItem(id);

    app.innerHTML = `
      <section class="screen">
        <header class="gamebar">
          <button class="iconbtn" data-act="back" aria-label="Back">←</button>
          <div class="gametitle">🚀 My Base</div>
          <span class="coinpill">🪙 ${p.coins}</span>
        </header>
        <p class="shophint">${placedCount === D.BASE.slots.length
          ? '🌟 Every spot is decorated — what a ship!'
          : 'Tap a spot on your rocket to decorate it!'}</p>
        <div class="baseroom">
          <div class="basenose">▲</div>
          ${D.BASE.slots.map(s => {
            const placed = item(p.base.placed[s.id]);
            return `
              <button class="baseslot ${placed ? 'filled' : ''} ${openSlot === s.id ? 'picked' : ''}"
                      data-slot="${s.id}" style="left:${s.x}%;top:${s.y}%"
                      aria-label="${s.name}">
                ${placed ? placed.e : `<span class="slotghost">${s.e}</span>`}
              </button>`;
          }).join('')}
        </div>
        ${openSlot ? (() => {
          const s = slotDef(openSlot);
          return `
            <div class="basedrawer">
              <h3 class="packhead">${s.e} ${s.name}</h3>
              <div class="shopgrid">
                ${D.BASE.items.filter(i => i.slot === openSlot).map(it => {
                  const owned = p.base.owned.includes(it.id);
                  const placed = p.base.placed[openSlot] === it.id;
                  return `
                    <div class="shopcard ${placed ? 'equipped' : ''}">
                      <div class="shopemoji">${it.e}</div>
                      <div class="shopname">${esc(it.name)}</div>
                      <button class="btn shopbtn ${placed ? 'good' : owned ? 'ghost' : ''}" data-id="${it.id}">
                        ${placed ? '✓ Placed' : owned ? 'Place' : `🪙 ${it.price}`}
                      </button>
                    </div>`;
                }).join('')}
              </div>
            </div>`;
        })() : ''}
      </section>`;

    app.querySelector('[data-act="back"]').addEventListener('click', () => RR.nav.player());
    app.querySelectorAll('.baseslot').forEach(b =>
      b.addEventListener('click', () => {
        A.sfx.pop();
        renderBase(b.dataset.slot === openSlot ? null : b.dataset.slot);
      }));
    app.querySelectorAll('.shopbtn').forEach(b =>
      b.addEventListener('click', () => {
        const it = item(b.dataset.id);
        if (p.base.owned.includes(it.id)) {
          S.placeBase(p, it.id);
          A.sfx.pop();
          renderBase(openSlot);
        } else if (S.buyBase(p, it.id)) {
          A.sfx.coins();
          RR.confetti.burst(60);
          A.speak(`The ${it.name} looks great in your rocket!`);
          renderBase(openSlot);
        } else {
          A.sfx.buzz();
          b.classList.add('shake');
          setTimeout(() => b.classList.remove('shake'), 450);
          A.speak('Keep reading to earn more coins!');
        }
      }));
  }

  RR.nav.base = renderBase;
})();
