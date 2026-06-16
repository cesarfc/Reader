/* Reading Rocket — illustrated image layer.
   Swaps every rendered emoji for its bundled OpenMoji illustration so art is
   consistent on every device and the word list can grow freely. A single
   MutationObserver converts all rendered text app-wide (no per-template edits),
   and the images are pointer-transparent so they never intercept taps.

   To use custom art later: drop files in img/openmoji/ (or change the path
   below) and update js/imgmap.js — nothing else changes. */

window.RR = window.RR || {};

(function () {
  const PATH = 'img/openmoji/';
  /* keycaps, single pictographs (+ optional skin tone / VS), and ZWJ sequences */
  const RE = /[#*0-9]️?⃣|\p{Extended_Pictographic}(?:[\u{1F3FB}-\u{1F3FF}]|️)?(?:‍\p{Extended_Pictographic}(?:[\u{1F3FB}-\u{1F3FF}]|️)?)*/gu;

  function toImg(e) {
    const seq = RR.IMGMAP && RR.IMGMAP[e];
    return seq
      ? `<img class="emj" src="${PATH}${seq}.svg" alt="" draggable="false">`
      : `<span class="txtemj">${e}</span>`;
  }

  /* Explicit renderer (returns HTML). Optional extra class on each image. */
  RR.img = function (str, cls) {
    if (str == null) return '';
    let html = String(str).replace(RE, toImg);
    if (cls) html = html.replace(/class="emj/g, `class="emj ${cls}`);
    return html;
  };

  /* Convert every emoji text node inside an element to an illustration. */
  function emojify(el) {
    if (!el || el.nodeType !== 1) return;
    if (el.classList && el.classList.contains('emj-done')) return;
    const skip = { SCRIPT: 1, STYLE: 1, IMG: 1, TEXTAREA: 1 };
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    const hits = [];
    let t;
    while ((t = walker.nextNode())) {
      const p = t.parentNode;
      if (!p || skip[p.nodeName]) continue;
      if (p.classList && p.classList.contains('emj-done')) continue;
      const v = t.nodeValue;
      if (!v) continue;
      const html = v.replace(RE, toImg);
      if (html !== v) hits.push([t, html]);
    }
    for (const [node, html] of hits) {
      const span = document.createElement('span');
      span.className = 'emj-done';
      span.innerHTML = html;
      node.parentNode.replaceChild(span, node);
    }
  }
  RR.emojify = emojify;

  const obs = new MutationObserver(muts => {
    for (const m of muts) {
      for (const n of m.addedNodes) {
        if (n.nodeType === 1) emojify(n);
        else if (n.nodeType === 3 && n.parentNode) emojify(n.parentNode);
      }
    }
  });

  function start() {
    emojify(document.body);
    obs.observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start);
})();
