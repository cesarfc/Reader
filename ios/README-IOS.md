# 📱 Reading Rocket — iPad/iPhone app

A dependency-free native iOS wrapper around the game: a Swift `WKWebView` shell
that serves the bundled web app over a custom `rocket://` scheme (stable origin
→ the kids' progress in localStorage persists across launches). No node_modules,
no CocoaPods — just an Xcode project.

## Put it on the iPad (one-time setup)

1. **Open the project**
   ```bash
   open ios/ReadingRocket.xcodeproj
   ```
2. **Add your Apple ID** (first time only): Xcode → Settings → Accounts → "+"
   → sign in with your Apple ID.
3. **Pick your team**: click the blue "ReadingRocket" project icon → target
   "ReadingRocket" → *Signing & Capabilities* → Team → select your name
   ("Personal Team"). If Xcode complains the bundle id is taken, change
   `com.cesarcordero.readingrocket` to anything unique.
4. **Plug in the iPad** with a cable. On the iPad, tap **Trust** when asked.
5. Select the iPad in Xcode's device dropdown (top center) and press **▶ Run**.
6. First launch only: the iPad will block the app until you approve it —
   Settings → General → VPN & Device Management → your Apple ID → **Trust**.

Done — Reading Rocket is on the home screen, works fully offline forever.

## Updating the app after game changes

```bash
./ios-sync.sh        # copies the latest web files into the iOS bundle
```
then press ▶ Run in Xcode again (iPad plugged in).

## The honest fine print

- **Free Apple ID**: the install expires after **7 days** — the app stays on
  the iPad but won't open until you re-Run it from Xcode (30 seconds,
  progress is never lost). Three sideloaded apps max.
- **Paid Apple Developer account ($99/yr)**: installs last a year, and you can
  ship via TestFlight or the App Store.
- **No-maintenance alternative**: host the folder on GitHub Pages (free) and
  use Safari's "Add to Home Screen" — near-identical experience, auto-updates,
  never expires. The native app's advantages are full offline + a real app
  identity (and a path to the App Store).

## Verified

`xcodebuild` passes for both simulator and device (arm64), and the app was
installed and screenshotted running on an iPad simulator. Bundle size: ~550 KB.
