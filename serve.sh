#!/bin/bash
# Start Reading Rocket on your home network.
# Run:  ./serve.sh   then open the printed URL on any device on the same Wi-Fi.
cd "$(dirname "$0")"
PORT="${1:-8000}"
IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "localhost")
echo ""
echo "  🚀 Reading Rocket is taking off!"
echo ""
echo "  On this Mac:              http://localhost:$PORT"
echo "  On iPad/iPhone (same Wi-Fi): http://$IP:$PORT"
echo ""
echo "  On the iPad: open that link in Safari, tap Share, then 'Add to Home Screen'."
echo "  Press Ctrl+C to stop."
echo ""
python3 -m http.server "$PORT"
