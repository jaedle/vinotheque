#!/usr/bin/env bash

set -eu -o pipefail

if uname -a | grep Darwin &> /dev/null; then
  RELEASE='https://github.com/caddyserver/caddy/releases/download/v2.2.1/caddy_2.2.1_mac_amd64.tar.gz'
else
  RELEASE='https://github.com/caddyserver/caddy/releases/download/v2.2.1/caddy_2.2.1_linux_amd64.tar.gz'
fi

curl -fsSL -o caddy.tar.gz "$RELEASE"
tar -xf caddy.tar.gz caddy
rm caddy.tar.gz
