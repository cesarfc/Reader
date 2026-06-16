#!/bin/bash
# Copy the web app into the iOS project bundle.
# Run this after ANY change to the game, then rebuild in Xcode.
cd "$(dirname "$0")"
DEST="ios/ReadingRocket/www"
mkdir -p "$DEST"
rsync -a --delete \
  index.html manifest.webmanifest sw.js \
  css js icons fonts img \
  "$DEST/"
echo "✅ Web app synced to $DEST"
echo "   Now build & run in Xcode (or: open ios/ReadingRocket.xcodeproj)"
