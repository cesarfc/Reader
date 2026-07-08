# Reading Rocket — "Soft Storybook" UI Revamp

Design spec for the engineer. This is **visual + navigation only** — every
learning flow, data model, and feature stays exactly as-is. We are retiring the
"cartoon sticker" skin (thick ink outlines, comic bottom-edges, stage-tinted
skies, hills/clouds) and replacing it with a **calm, warm, floating-card
storybook** look organized around a **floating bottom tab bar**.

Fredoka stays. OpenMoji SVG art stays (it's the illustration language and its
own line-art outlines are welcome — only the **UI chrome** loses outlines).
`#app { max-width: 660px }`, single column, portrait-first stays.

---

## 1. Design tokens

Paste this into `:root` (it can replace the two existing `:root` blocks at the
top of `css/styles.css` and around line 765). All existing class names keep
working; they just consume these variables.

```css
:root {
  /* ---------- Surfaces ---------- */
  --bg:         #FFF7F0;  /* warm cream page background */
  --bg-2:       #FBEFE4;  /* deeper cream: sunken areas, page behind frames */
  --surface:    #FFFFFF;  /* cards */
  --surface-2:  #FFF1E6;  /* inset: meter tracks, secondary chips, fields */
  --hairline:   rgba(74, 53, 43, .06);  /* faint 1px card edge (white-on-cream) */

  /* ---------- Text (always use these for text) ---------- */
  --ink:        #42352B;  /* primary — 11.2:1 on cream, 12.6:1 on white */
  --ink-soft:   #6F5E50;  /* secondary/body-muted — 5.8:1 on cream (AA body) */
  --ink-faint:  #A08B79;  /* hints/disabled — large text only */

  /* ---------- Pastel accents ----------
     Each: base (illustration/fill), tint (chip/panel bg), strong (solid button
     + white large-text, and colored icons/large numerals). */
  --coral:        #FF9E86;  --coral-tint: #FFE7DF;  --coral-strong: #D9542F;
  --teal:         #7ED0C1;  --teal-tint:  #DDF3EE;  --teal-strong:  #1F8A77;
  --yellow:       #FFCE5C;  --yellow-tint:#FFF2D2;  --yellow-strong:#B77908;
  --lav:          #B9A8E8;  --lav-tint:   #ECE6FB;  --lav-strong:   #6E52C0;
  --sky:          #8FC7F0;  --sky-tint:   #E3F1FD;  --sky-strong:   #2C79C0;
  --rose:         #F5A8C4;  --rose-tint:  #FDE4ED;  --rose-strong:  #C9497A;

  /* semantic aliases (keep the old names pointing at new values) */
  --amber:      var(--yellow);
  --amber-deep: var(--yellow-strong);
  --good:       var(--teal);
  --good-deep:  var(--teal-strong);
  --bad:        #E5604D;
  --card:       var(--surface);

  /* ---------- Radius ---------- */
  --r-sm: 12px;  --r-md: 18px;  --r-lg: 26px;  --r-xl: 34px;  --r-pill: 999px;

  /* ---------- Shadow (soft, WARM-tinted, never harsh) ---------- */
  --sh-sm:    0 2px 6px  rgba(74, 53, 43, .06);
  --sh-md:    0 10px 24px rgba(74, 53, 43, .09);   /* resting cards */
  --sh-lg:    0 18px 40px rgba(74, 53, 43, .14);   /* tab bar, hero, sheets */
  --sh-coral: 0 12px 26px rgba(217, 84, 47, .30);  /* glow under primary CTA */

  /* ---------- Spacing (4px base) ---------- */
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px;
  --sp-5: 24px; --sp-6: 32px; --sp-7: 48px;

  /* ---------- Type ---------- */
  --font: 'Fredoka', ui-rounded, 'SF Pro Rounded', system-ui, sans-serif;
}
```

### Contrast — the one rule that keeps us safe

Pastels + small text fail WCAG almost every time, so:

> **Text is only ever `--ink` or `--ink-soft`.** Both pass AA on cream, white,
> and every `*-tint` panel. Accent colors are for **fills, tints, meters,
> borders, icons, big emoji, and confetti — never for small body text.**

The `*-strong` variants exist for two verified jobs only:

| Use | Pairing | Ratio | Verdict |
|---|---|---|---|
| Primary button | white on `--coral-strong` #D9542F | 4.0:1 | ✅ large/bold |
| "Good"/confirm button | white on `--teal-strong` #1F8A77 | 4.2:1 | ✅ large/bold |
| Body text | `--ink` on cream | 11.2:1 | ✅ AAA |
| Muted body | `--ink-soft` on cream | 5.8:1 | ✅ AA |
| Icon/large numeral tint | `--yellow-strong`/`--lav-strong` etc. on their tint | ≥3:1 large only | ✅ icons & 20px+ display, ❌ small text |

Coin/gem/star **numbers use `--ink`**; the colored emoji carries the meaning.
All primary/CTA text is ≥20px bold, so 3:1 is the applicable threshold and we
clear it.

### Type scale

| Token | Size / weight / line-height | Use |
|---|---|---|
| Display | 30px / 700 / 1.1 | greeting, results headline |
| Title | 24px / 700 / 1.15 | screen titles |
| Section | 18px / 600 / 1.2 | section headers |
| Body | 16px / 500 / 1.4 | copy |
| Label | 13px / 600 / 1.2, +.2px tracking | meta, tab labels, section eyebrows |
| Numeral | 18px / 700 | coins/gems in pills |
| CTA | 28px / 700 | PLAY |

Fredoka weights in play: 500 body, 600 headings/labels, 700 display/buttons.
(300/400 available but rarely needed.)

---

## 2. Navigation architecture — floating bottom tab bar

**Profile picker stays a pre-screen** (no tab bar). Picking a reader enters the
tabbed app on **Home**. Five tabs — each a huge touch target, icon + short
label, instantly legible to a 5-year-old:

| # | Icon | Label | Owns |
|---|---|---|---|
| 1 | 🏠 | **Home** | dashboard: greeting, PLAY, journey, quests, "keep going" |
| 2 | 🎮 | **Play** | grade picker + Training Grounds game grid (all 11 games) |
| 3 | 📖 | **Read** | Milo's Star Stories campaign (seasons) + Story Books library |
| 4 | 🗺️ | **Adventure** | stage map, boss battles, champion, power-ups, Sibling Duel |
| 5 | 🧑‍🚀 | **Me** | hero + gear, Shop, My Base, Stickers, My Stuff, pet growth |

A slim **top app bar** persists across all five tabs: avatar + name (left);
🪙/💎/⭐ pills + ⚙️ gear menu (right). The gear menu holds **mute + voice/speed
settings** (retires the two floating corner icon-buttons and the heavy
`playerbar`). Drill-downs (a game, the shop, a book, a battle) get a back arrow
in place of the tab bar or above it, returning to their owning tab.

### Every current surface → its new home

| Current surface | New home |
|---|---|
| Profile picker (avatars, add reader, edit) | **Pre-tab screen** — unchanged flow, restyled |
| App header (logo 🚀 + title + tagline) | Profile picker only |
| `playerbar` (avatar / coins / settings / mute) | **Top app bar** (persistent) |
| XP bar + level + title | **Home** greeting header (thin XP bar) |
| Event banner | **Home** — slim event **ribbon**, tap → event sheet |
| Giant PLAY | **Home** — PLAY hero, above the fold |
| Hero card (stat chips ⚔️❤️, gear chips) | **Me** — hero header |
| Shop / My Base / Stickers / Stuff buttons | **Me** — entry grid |
| Pet panel (feed / grow) | **Me** — pet card. Pet also **peeks** on Home |
| Adventure stage card / Champion card | **Adventure** (primary) + compact "continue" card on Home |
| Journey meter (rocket→moon) | **Home** — compact Journey card → breakdown sheet |
| Daily Quests | **Home** — Quests card (1/3) → quest sheet |
| Grade pills K–5 | **Play** (top of the games grid) |
| Training Grounds game grid (11 games) | **Play** |
| Owl 🦉 grown-up tip | **Home** footer (rotating, subtle) |
| Story list / reader / quiz | **Read** |
| Story Books (leveled library — the `books` game) | **Read** — "Library" section beside the campaign |
| Adventure map | **Adventure** |
| Boss battle | **Adventure** drill-down (and via PLAY) |
| Star Shop | **Me** → Shop drill-down |
| Rocket Base | **Me** → My Base drill-down |
| Sticker album | **Me** → Stickers drill-down |
| Badges / My Stuff | **Me** → My Stuff drill-down |
| Results / celebration | Full-screen after a round (unchanged flow), restyled |
| Sibling Duel | Profile picker **and** an Adventure card |
| Graduation ceremony | Full-screen (from Journey), restyled |
| Grown-up Corner | Profile picker (parent gate) **and** a lock in Me |
| Settings (voice/speed) | Gear menu (all tabs) + inside Grown-up Corner |
| Profile editor | Profile picker (unchanged) |
| Daily gift / event / journey / book-maker modals | Restyled as **bottom sheets** |

Nothing is cut. The player home simply stops being a 9-card scroll — its
contents fan out across Play / Read / Adventure / Me, and Home keeps only the
"what do I do right now" essentials.

---

## 3. Player-home (Home tab) declutter

Old order was ~11 stacked blocks. New Home, top to bottom:

1. **Top app bar** (sticky, ~56px): `avatar` (tint circle) + `Big Reader` +
   `Lv 8` chip · right: `🪙 631` `💎 52` `⭐ 85` pills + `⚙️`.
2. **Greeting** (~display): `Hi, Big Reader! 👋` + eyebrow `Level 8 · Word
   Wizard`. A **thin XP bar** (teal, 8px) sits directly under it.
3. **Event ribbon** (only if an event is live): slim lavender-tint pill —
   `💎 Gem Storm week — bosses pay double gems!` + `6d` chip. Tap → event sheet.
4. **PLAY hero** (above the fold, 96px tall): coral, `▶ PLAY` 28px, subtitle
   `Continue where you left off`. Smart-starts `P.nextActivity()` exactly as now.
5. **Journey + Quests row** (2-up compact cards):
   - **Journey** — 🌙 + label + thin teal track with 🚀 marker + `62%`. Tap →
     journey breakdown **sheet** (words/sight/books/speed rows, unchanged data).
   - **Quests** — 🎯 + `Today's Quests` + `1/3` dot meter. Tap → quest **sheet**
     listing the 3 quests with their meters. (Collapses the old full quest card.)
6. **"Keep going"** section (label eyebrow) — two full-width continue rows:
   - Story: 🌠 tint circle · `Milo's Star Stories` · `Episode 5: The Shadow Ship`
     + `NEW` chip → Read tab.
   - Adventure: 🌋 tint circle · `Stage 4: Lava Mountain` · `Boss ready! 🐉`
     → Adventure tab. (When champion: 🏆 `Galaxy Champion` → map.)
7. **Owl tip** (subtle, small) — rotating grown-up tip, no comic tail.
8. **Pet peek**: the equipped pet 🐶 sits just above the tab bar, bottom-right,
   `pointer-events:none`, gentle idle bob. Personality without a whole panel.

Above the fold on a phone = app bar + greeting + XP + (ribbon) + PLAY. Calm.
Everything else is one glance below.

---

## 4. Component specs

Global: `body { background: var(--bg); font-family: var(--font); color: var(--ink); }`
Retire `body::before` (hills), `body::after` (clouds) and all `body.stage-N`
sky repaints. Decorative background is now just cream + **two faint blurred
pastel blobs** fixed behind `#app` (see §5). All decorative layers keep
`pointer-events: none` and are silenced under `prefers-reduced-motion`.

### Buttons `.btn`
- Shape: `border-radius: var(--r-pill)` (or `--r-md` for wide blocks). No border,
  no comic bottom-edge. Min height 52px; min touch 48px.
- **Primary** (`.btn`): `background: var(--coral-strong)` (or coral gradient
  `linear-gradient(180deg,#FF8A6B,#E4633F)`), white text, `box-shadow: var(--sh-md)`.
- **Good** (`.btn.good`): `--teal-strong`, white text.
- **Ghost/secondary** (`.btn.ghost`): `background: var(--surface)`, `color: var(--ink)`,
  `box-shadow: var(--sh-sm)`, `border: 1px solid var(--hairline)`.
- **Tonal**: `background: <accent>-tint`, `color: var(--ink)` — for low-emphasis.
- **Danger** (`.btn.danger`): `--bad`, white.
- **States**: press → `transform: translateY(1px) scale(.99)` + drop to `--sh-sm`
  (replaces the `translateY(4px)` hard-edge collapse). Disabled → `opacity:.55`.
- `.btn.big`: 28px/700, padding 18px 30px, `--r-xl`.

### PLAY hero `.playbig`
Full width, 96px, `--r-xl`, coral gradient, `box-shadow: var(--sh-coral)`,
white `▶ PLAY` 28px + 14px subtitle. Idle "breathing" scale 1→1.02 (2.4s),
disabled under reduced-motion.

### Cards (`.herocard`, `.gamecard`, `.questcard`, `.storycard`, `.advcard`, …)
- `background: var(--surface)`, `border-radius: var(--r-lg)`,
  `box-shadow: var(--sh-md)`, `padding: var(--sp-4/5)`. Optional
  `border: 1px solid var(--hairline)` for definition. **No 3px ink border, no
  bob/tilt.** Press (tappable cards): `translateY(1px) scale(.995)` + `--sh-sm`.
- Colored feature cards (`.advcard`, journey, event) use an accent **tint** bg
  (e.g. `--coral-tint`) + `--ink` text, not saturated gradients.

### Chips (`.statchip`, `.gearchip`, coin/gem pills, `.coinpill`)
`background: <accent>-tint`, `color: var(--ink)`, `--r-pill`, height ~30px,
padding 6px 12px, 13–14px/600. Icon carries the color.

### Progress meters (`.timebar`, XP `.xbar`, `.hpbar`, journey track)
Track: `background: var(--surface-2)`, `--r-pill`, height 8–12px, **no border**.
Fill: accent — teal (`--teal`→`#A7E3D6`) for journey/XP/good, coral→peach for
energy, red-coral for boss HP. Rounded ends. Journey keeps the 🚀 marker riding
the fill; drop the ☁️/⭐/🌙 tick emojis or render them tiny and muted.

### Game grid tiles `.gamecard`
2-col grid, gap `--sp-3`, min-height ~152px. Icon sits in a **soft tint circle**
(64px, tint color cycles per tile: coral→teal→yellow→lav→sky→rose). Title 15px/600,
desc 12.5px `--ink-soft`, star row below. Remove per-tile rotate + `bob2`.

### List rows (story episodes) `.storyep`
Full-width row, `--r-lg`, `--sh-sm`, padding `--sp-3`. Left: cover emoji in a
44px tint circle. Middle: title 16px/600 + meta 13px `--ink-soft`. Right:
status — `NEW` coral chip / teal `✓` / lock. **NEW** episode: `--coral-tint`
wash + 3px coral left accent bar. **Locked**: `opacity:.55`, 🔒, reason text.
Season header: small eyebrow label chip (`--lav-tint`).

### Tab bar (new component `.tabbar`)
```
Floating: position: fixed; left/right: max(12px, safe-area); bottom: calc(env(safe-area-inset-bottom) + 10px);
max-width: 640px; margin-inline: auto;
height: 64px; background: var(--surface); border-radius: var(--r-xl);
box-shadow: var(--sh-lg); display: flex; padding: 6px;
```
5 equal items, each column: emoji 24px + label 11px/600. **Active**: an
accent-tint pill (`--coral-tint`) behind the item, `--coral-strong` icon+label,
slight `scale(1.04)`. **Inactive**: `--ink-soft`, transparent. Each item ≥56px
wide (≥48px tap). Give `#app` `padding-bottom: 92px` so content clears the bar.

### Modals → bottom sheets (`.overlay` / `.modal`)
Backdrop `rgba(74,53,43,.35)` + `backdrop-filter: blur(3px)`. Sheet: pinned to
bottom, `border-radius: var(--r-xl) var(--r-xl) 0 0`, `--sh-lg`, drag-handle
pill on top, slide-up 0.25s (reduced-motion → fade). On ≥560px, center it as a
`--r-xl` card instead. Same DOM/JS, restyled.

### Results / celebration `.results`
Cream bg, no ink. Stars: soft gold `--yellow`, gentle shadow (retire the white
comic stroke). Hero figure large, coin count-up, reward **chips** stacked (tint
pills), chest, next CTA. Confetti/fanfare unchanged.

### Battle chrome `.battlefield` / `.hpbar`
Keep the arena as a card, but tint it by stage **accent** (soft) instead of a
full-screen sky. Boss emoji large + name; HP bars are clean meters (boss =
red-coral, hero = teal). Retire the `0 0 0 3px outline` ink ring; use `--sh-md`.

---

## 5. Where personality lives (outlines gone)

- **Color & tint**: each surface leans on one accent tint; the palette rotation
  across game tiles and continue-cards keeps it lively but ordered.
- **Illustration scale**: big OpenMoji — hero figure, story covers, boss, and
  the **pet buddy** rendered large in tint circles. Art keeps its own line-work.
- **Gentle motion** (all reduced-motion-guarded): PLAY breathing, pet bob + tap
  jump, card press spring, star pops, confetti on wins, sheet slide-up.
- **Mascots**: Ollie 🦉 (voice guide + tip) and the **equipped pet** that grows
  with reading — the pet peeks on Home and stars on the Me tab.
- **Background**: cream + two faint fixed blurred blobs, e.g.
  `radial-gradient(600px circle at 85% -5%, var(--coral-tint), transparent 60%)`
  and `radial-gradient(500px circle at 0% 40%, var(--sky-tint), transparent 60%)`
  at ~0.6 opacity behind `#app`. Stage theming survives only as a **soft accent
  tint** on the Adventure card + boss arena — never a full-screen repaint.

---

## 6. Build notes for the engineer

- Keep all class names; re-point their CSS to the tokens above. The only new
  **structure** is (a) the persistent top app bar, (b) the `.tabbar`, and (c)
  splitting the old `renderPlayer` body across the four content tabs — the
  fragments (`herocard`, `gamegrid`, `questcard`, etc.) move wholesale, they
  don't need rewriting.
- Retire: `body::before`, `body::after`, `body.stage-N`, the `.gamecard`/
  `.bookcard` rotate + `bob2`, the `.bubble` comic tail, all `3px solid
  var(--outline)` rules, and every `box-shadow: 0 Npx 0 var(--edge)` hard edge.
- Respect `prefers-reduced-motion` (block already exists — extend it to the new
  PLAY breathing + sheet slide).
- Verify with **real content** (long reader names, 11-tile grid, 16 episodes).
