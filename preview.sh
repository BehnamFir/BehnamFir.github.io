#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
printf '%s\n' 'Private local preview: http://localhost:8000' 'Press Ctrl+C to stop.'
python3 -m http.server 8000 --bind 127.0.0.1
