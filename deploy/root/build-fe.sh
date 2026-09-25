#!/bin/bash
set -e

cd /var/www/goals.zone-fe
git reset --hard
git pull origin master

# Self-update this script from the repo; check it first so a syntax error
# never gets installed. install writes a new file, so the running copy is unaffected.
bash -n deploy/root/build-fe.sh || { echo "syntax error in deploy/root/build-fe.sh, not installing" >&2; exit 1; }
install -m 755 deploy/root/build-fe.sh /root/build-fe.sh

npm prune
npm install
npm run build
nginx -t && systemctl reload nginx
