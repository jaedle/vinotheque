#!/usr/bin/env bash

set -eu -o pipefail

if [[ -x caddy ]]; then
  exit 0
fi

go get -u github.com/caddyserver/xcaddy/cmd/xcaddy &> /dev/null

xcaddy build \
  'v2.2.1' \
  --output caddy > /dev/null
