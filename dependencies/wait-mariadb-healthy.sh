#!/usr/bin/env bash

set -eu -o pipefail

RETRIES=1000
current=0
until mysql -u root -ppassword -h 127.0.0.1 -P 3307 -e 'show databases;' &> /dev/null; do
  current=$((current+1))
  if [[ $current -gt $RETRIES ]]; then
    echo 'mariadb did not get healthy; failing'
    exit 1
  fi
  sleep 0.1
done
