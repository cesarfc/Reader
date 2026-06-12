# 🚀 Reading Rocket

A playful learn-to-read **adventure game** for kids, built for iPhone, iPad, and
the web. It teaches the core skills of early reading — phonemic awareness,
letter sounds, blending ("sounding out"), word building, rhyming, sight words,
and reading fluency — wrapped in a game loop kids actually want to come back to:

**Play reading games → earn coins 🪙 → buy gear in the Star Shop → battle the
boss → unlock the next stage.**

No frameworks, no build step, no accounts, no ads. Plain HTML/CSS/JS that runs
anywhere and stores progress on the device.

## The adventure

- **Coins** — every training round pays out (2 per first-try answer + star
  bonus), plus a bonus chest after each round and a daily gift.
- **Gems 💎** — the premium currency: earned only from 3-star rounds (+1 extra
  for perfect rounds) and first-time boss wins. Spent in the shop's
  **Legendary tab** on the most powerful gear — so quality reading, not
  grinding, unlocks the coolest stuff.
- **Daily streaks 🔥** — playing on consecutive days grows a streak: +10%
  coins per streak day (up to +50%), and the daily gift grows too. Miss a day
  and it resets.
- **Star Shop** — hero skins (🦸🥷🧙🦖👽👑), weapons that raise attack
  (🪵→⚡), armor that adds battle hearts (🛡️→🐲), and pets that boost coin
  earnings (🐶 +10% … 🦄 +50%).
- **8 stages** — Sunny Meadow 🌻 → Whispering Woods 🌲 → Crystal Caves 💎 →
  Lava Mountain 🌋 → Storm Castle 🏰 → Robo City 🏙️ → Moon Base 🌙 → Star
  Galaxy 🌌. Play training rounds to wake each stage's boss.
- **Boss battles** — the fight IS a reading quiz. A correct answer attacks the
  boss (damage = your attack + weapon, with ⚡ critical hits for fast answers);
  a wrong answer costs a heart, and the right answer is revealed so it stays a
  learning moment. Beat the boss for a big coin payout and the next stage.
  Beaten bosses can be rematched for half rewards.

Boss difficulty comes from HP (more right answers needed), while question
difficulty always follows the reader's grade setting — so the kindergartener
and the 3rd grader both get fair fights from the same bosses.

## The training games

| Game | Skill | How it works |
|---|---|---|
| 📚 Story Books | Connected reading | A library of original decodable books per grade. The kid reads out loud, taps any tricky word to hear it, or has a page read aloud. Fewer helps = more stars. |
| 🔠 Letter Sounds | Phonics & phonemic awareness | Hear a sound, find the letter — or see a picture and pick its first sound. Digraphs (sh, ch, th…) appear from 1st grade up. |
| 🧩 Sound It Out | Blending | Tap each sound tile to hear it, blend the sounds in your head, then pick the matching picture. |
| 🧱 Word Builder | Segmenting & spelling | Hear a word, then build it by tapping sound tiles in order (with decoy tiles to dodge). |
| 🎵 Rhyme Time | Phonemic awareness | Which picture rhymes with the prompt word? |
| 👀 Sight Words | Instant word recognition | Warm-up flashcards with audio, plus a 45-second Lightning Round. Tricky words are collected for practice. |
| ⚡ Speed Reader | Fluency | Read words (K–1) or sentences (2nd–3rd) out loud against the clock — shows words-per-minute. A grown-up listens along. |

## Learning at their own pace

- **Mastery tracking** — every word, sight word, and letter sound is tracked
  per kid; 3 first-try correct answers = mastered. Games quietly weight their
  questions toward unmastered and struggled words (struggled 4x, unseen 3x,
  mastered 1x review).
- **Grade Journey meter** — an honest progress bar per grade built from words
  mastered + sight words + books finished + best reading speed. Tap it for the
  breakdown.
- **Graduation** — at 80% journey progress the kid gets a full graduation
  ceremony (+10 💎) and the grade advances automatically. No grinding one easy
  game can fake it.
- **Daily quests** — three missions a day with coin/gem rewards, plus Reader
  XP levels (Lv 1–50 with titles) so there's always near-term progress.
- **Badges** — 22 collectible badges for books, mastery, streaks, and bosses.
- **Sticker album** — every 2-star-or-better round opens a sticker pack: 48
  collectible emoji stickers in four packs, with rare ✨shiny✨ versions;
  duplicates convert to coins.
- **Built for pre-readers** — a giant ▶ PLAY button picks the smartest next
  activity automatically (open quests first, then whatever has the most
  unmastered words); voice guidance speaks instructions for K–1 profiles; the
  Journey meter is a rocket flying to the moon; quests use progress dots; the
  equipped pet rides along on screen and reacts to right/wrong answers.
- **Living world** — the sky tints to match your current adventure stage, and
  results screens play a celebration sequence (stars → coins counting up →
  bonuses → sticker pack peel).
- **Family goal** — grown-ups set a weekly shared star target ("50 ⭐ →
  movie night"); everyone's stars count together.
- **Grown-up corner** (math-gated) — per-kid dashboard: journey breakdown,
  words mastered this week, current trouble words (tap to hear), best WPM,
  streaks, plus the family goal editor.

## Grade levels

Every game adapts to the selected grade:

- **K** — letter sounds and CVC words (cat, sun, pig…)
- **1st** — digraphs and consonant blends (ship, frog, truck…)
- **2nd** — long vowels, vowel teams, r-controlled vowels (cake, train, shark…)
- **3rd** — multisyllable words built from syllable tiles (rab·bit, vol·ca·no…)
- **4th** — 3–5 syllable words (hip·po·pot·a·mus, ther·mom·e·ter…), academic sight words, longer fluency passages
- **5th** — advanced multisyllable words (e·lec·tric·i·ty, pho·tog·ra·phy…), tricky spelling-pattern sight words, near-adult fluency targets

Each kid gets their own profile (name, avatar buddy, grade) with stars and best
scores saved per game and grade. Switch grades anytime with the pills at the top —
a 3rd grader can warm up on 2nd-grade rounds, a kindergartener can peek ahead.

## Run it

Easiest: from this folder, run

```bash
./serve.sh
```

It prints two URLs — one for this Mac, one for iPads/iPhones on the same Wi-Fi.
(Or run `python3 -m http.server 8000` and open <http://localhost:8000>.)

### Put it on the kids' iPad like a real app

1. Run `./serve.sh` on the Mac (or host the folder anywhere, see below).
2. On the iPad, open the printed URL in Safari.
3. Tap **Share → Add to Home Screen**.

It gets its own icon, launches full-screen with no browser bars, and works
offline after the first visit (service worker caching).

### Host it on the internet (free)

The folder is a fully static site, so any static host works:

- **GitHub Pages** — push this repo to GitHub, enable Pages on the `main` branch.
- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder.

Then "Add to Home Screen" works from anywhere, no Mac required.

### Native iPad/iPhone app

A ready-made, dependency-free Xcode project lives in [ios/](ios/) — a Swift
WKWebView shell with the game bundled inside (~550 KB, fully offline).
See [ios/README-IOS.md](ios/README-IOS.md) for the 5-minute "put it on the
iPad" steps. After changing the game, run `./ios-sync.sh` and hit Run in Xcode.

## Customizing (the fun part)

All the learning content lives in [js/data.js](js/data.js):

- **Add words**: each entry is `{ w: 'cat', e: '🐱', t: ['c','a','t'], s: ['kuh','ah','tuh'] }` —
  the word, its emoji picture, its letter tiles, and a speakable sound for each tile.
- **Add sentences** for Speed Reader under `SENTENCES`.
- **Add sight words** under `SIGHT` (Dolch/Fry lists by grade).
- **Write your own books** under `BOOKS` — each page is just
  `{ t: 'The cat sat.', a: '🐱' }` (text + emoji art). Books starring your own
  kids or pets are instant favorites.
- **Add shop items** under `SHOP` (`slot` of `skin`/`weapon`/`armor`/`pet`) and
  **stages/bosses** under `STAGES` — names, emoji, HP, rewards, and taunts are
  all just data.
- Add your kids' favorite things — words they love stick faster.

Speech uses the device's built-in text-to-speech (Web Speech API), so there are
no audio files to record. Sound effects are synthesized with WebAudio.

## Notes for grown-ups

- Speed Reader is honor-system by design: the app times the reading, **you**
  are the judge of whether the words were read. Reading out loud to a person
  is the point.
- **Voice quality matters a lot.** The app auto-picks the best English voice on
  the device (and blocklists the robotic macOS novelty voices), but the single
  biggest upgrade is downloading an **Enhanced/Premium voice**: on iPad/iPhone,
  Settings → Accessibility → Spoken Content → Voices → English → download
  Ava or Zoe (Enhanced); on Mac, System Settings → Accessibility → Spoken
  Content. Then pick it in the app's ⚙️ settings (home screen, top-left),
  where you can also set talking speed (Slow/Normal/Fast) and test it.
- The phoneme sounds ("buh", "ah", "shh") are TTS approximations of pure
  phonemes — good enough to practice blending; your voice alongside is even better.
- Progress is stored only in the browser (localStorage). Different device =
  fresh start; same device = it remembers everyone.
