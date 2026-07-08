/* Reading Rocket — Story Campaign: "Milo and the Lost Star".
   One continuing story told in episodes. Reading rounds unlock the next
   episode; every episode ends on a cliffhanger so there's always a reason
   to come back. Uses the shared book reader from games.js. */

window.RR = window.RR || {};
RR.nav = RR.nav || {};

(function () {
  const D = RR.DATA;
  const A = RR.audio;
  const S = RR.state;
  const P = RR.progress;
  const app = document.getElementById('app');

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function renderStory() {
    const p = S.current();
    if (!p) { RR.nav.home(); return; }
    const eps = D.CAMPAIGN || [];
    const readCount = P.episodesRead(p);
    app.innerHTML = `
      <section class="screen">
        <header class="gamebar">
          <button class="iconbtn" data-act="back" aria-label="Back">←</button>
          <div class="gametitle">🌠 Milo and the Lost Star</div>
          <span class="coinpill">${readCount}/${eps.length}</span>
        </header>
        <p class="shophint">${readCount >= eps.length
          ? '🌟 You read the whole story — you are a true Star Reader!'
          : 'Every round you play unlocks more of the story!'}</p>
        <div class="storylist">
          ${eps.map((ep, i) => {
            const st = P.campaignStatus(p, ep);
            const read = P.episodeRead(p, ep.id);
            return st.open ? `
              <button class="storyep ${read ? 'read' : 'fresh'}" data-ep="${ep.id}">
                <span class="storycover">${ep.cover}</span>
                <span class="storyinfo">
                  <span class="storytitle">Episode ${i + 1}: ${esc(ep.title)}</span>
                  <span class="storymeta">${read ? '✓ Read — read it again!' : '✨ NEW — tap to read!'}</span>
                </span>
              </button>` : `
              <div class="storyep locked">
                <span class="storycover">🔒</span>
                <span class="storyinfo">
                  <span class="storytitle">Episode ${i + 1}: ???</span>
                  <span class="storymeta">${esc(st.reason)}</span>
                </span>
              </div>`;
          }).join('')}
        </div>
      </section>`;
    app.querySelector('[data-act="back"]').addEventListener('click', () => RR.nav.player());
    app.querySelectorAll('.storyep[data-ep]').forEach(b =>
      b.addEventListener('click', () => {
        A.sfx.whoosh();
        startEpisode(eps.find(e => e.id === b.dataset.ep));
      }));
  }

  function startEpisode(ep) {
    const p = S.current();
    const section = document.createElement('section');
    section.className = 'screen';
    app.innerHTML = '';
    app.appendChild(section);
    RR.util.bookReader(section, ep, {
      onBack: renderStory,
      onFinish(result) {
        const st = p.stats['story-' + ep.id] || { reads: 0 };
        st.reads++;
        p.stats['story-' + ep.id] = st;
        const meta = S.recordRound(p, 'story', p.grade, result);
        endScreen(ep, result, meta);
      }
    });
  }

  /* Compact episode-complete screen with the cliffhanger front and center. */
  function endScreen(ep, r, meta) {
    const p = S.current();
    const eps = D.CAMPAIGN || [];
    const next = eps[eps.indexOf(ep) + 1];
    const nextOpen = next && P.campaignStatus(p, next).open;
    app.innerHTML = `
      <section class="screen results">
        <div class="starsbig ${r.stars === 3 ? 'allstars' : ''}">
          ${[0, 1, 2].map(i => `<span class="star ${i < r.stars ? 'earn' : ''}" style="animation-delay:${0.15 + i * 0.3}s">★</span>`).join('')}
        </div>
        <h1>Episode complete!</h1>
        <p class="resline">${r.line1}</p>
        <p class="coinwin">+${meta.coinsEarned} 🪙${meta.gemsEarned ? ` <span class="gemwin">+${meta.gemsEarned} 💎</span>` : ''} <span class="xpwin">+${meta.xpGained} XP</span></p>
        <div class="cliffcard">
          <div class="cliffmark">${ep.cover}</div>
          <p class="clifftext">${esc(ep.cliff)}</p>
        </div>
        <div class="resbtns">
          ${next
            ? (nextOpen
              ? `<button class="btn big good pulse" data-act="next">📖 Read Episode ${eps.indexOf(next) + 1} now!</button>`
              : `<button class="btn big" data-act="train">🎮 ${esc(P.campaignStatus(p, next).reason)}</button>`)
            : '<p class="resline">🌟 You finished the whole story!</p>'}
          <button class="btn ghost big" data-act="list">🌠 All episodes</button>
        </div>
      </section>`;
    if (r.stars >= 2) RR.confetti.burst(r.stars === 3 ? 140 : 70);
    A.sfx.fanfare();
    setTimeout(() => A.speak(ep.cliff, { rate: 0.9 }), 900);
    const nextBtn = app.querySelector('[data-act="next"]');
    if (nextBtn) nextBtn.addEventListener('click', () => { A.sfx.whoosh(); startEpisode(next); });
    const train = app.querySelector('[data-act="train"]');
    if (train) train.addEventListener('click', () => RR.nav.player());
    app.querySelector('[data-act="list"]').addEventListener('click', renderStory);
  }

  RR.nav.story = renderStory;
})();
