#!/usr/bin/env bash

set -eu -o pipefail

if [[ -x caddy ]]; then
  exit 0
fi

go get -u github.com/caddyserver/xcaddy/cmd/xcaddy &> /dev/null

xcaddy build \
  'v2.2.1' \
  --with github.com/greenpau/caddy-auth-jwt \
  --with github.com/greenpau/caddy-auth-portal \
  --output caddy > /dev/null
