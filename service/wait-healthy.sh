#!/usr/bin/env bash

set -eu -o pipefail

RETRIES=500
current=0
until curl -fsSL localhost:8080/health &> /dev/null; do
  current=$((current+1))
  if [[ $current -gt $RETRIES ]]; then
    &>2 echo 'service did not get healthy; failing'
    exit 1
  fi
  sleep 0.1
done
