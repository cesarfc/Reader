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

  function renderBase(openSlot = null, celebrate = false) {
    const p = S.current();
    if (!p) { RR.nav.home(); return; }
    RR.pet.hide(); /* one pet on screen: use the in-room pet, not the fixed corner buddy */
    if (RR.ui) RR.ui.hideTabs();
    const placedCount = Object.values(p.base.placed).filter(Boolean).length;
    const slotDef = id => D.BASE.slots.find(s => s.id === id);
    const item = id => S.baseItem(id);

    /* The equipped pet lives in the room and grows with reading (RR.pet.stage). */
    const pet = S.gear(p, 'pet');
    let petHtml = '';
    if (pet) {
      const st = RR.pet.stage(p.petState || { xp: 0 });
      const seatFilled = !!p.base.placed.seat;
      const px = seatFilled ? 63 : 50; /* perch beside the seat, else stand center floor */
      const py = seatFilled ? 56 : 74;
      const size = Math.round(34 * st.scale);
      const style = `position:absolute;left:${px}%;top:${py}%;transform:translate(-50%,-50%);`
        + `border:0;background:none;cursor:pointer;line-height:1;padding:4px;font-size:${size}px;`
        + 'filter:drop-shadow(0 3px 2px rgba(29,69,102,0.3));z-index:2';
      petHtml = `<button class="basepet" aria-label="Your pet" style="${style}"><span class="petemoji ${st.aura ? 'petaura' : ''}">${pet.e}</span></button>`;
    }

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
          ${petHtml}
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

    /* Tap the pet: pop, a quick jump, and a happy line by name.
       Reuse the stylesheet's .petemoji.petpetted (petjump keyframes) — no new CSS. */
    const petBtn = app.querySelector('.basepet');
    if (petBtn) {
      const em = petBtn.querySelector('.petemoji');
      const jump = () => { em.classList.remove('petpetted'); void em.offsetWidth; em.classList.add('petpetted'); };
      petBtn.addEventListener('click', () => {
        A.sfx.pop();
        jump();
        const lines = [
          `${pet.name} loves your rocket!`,
          `Wheee! ${pet.name} did a happy jump!`,
          `${pet.name} feels right at home!`
        ];
        A.speak(lines[(Math.random() * lines.length) | 0]);
      });
      if (celebrate) jump(); /* one-shot cheer after a buy or place re-render */
    }

    app.querySelector('[data-act="back"]').addEventListener('click', () => RR.nav.me());
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
          renderBase(openSlot, true);
        } else if (S.buyBase(p, it.id)) {
          A.sfx.coins();
          RR.confetti.burst(60);
          A.speak(`The ${it.name} looks great in your rocket!`);
          renderBase(openSlot, true);
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
