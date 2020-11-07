FROM caddy:2-builder as builder

RUN xcaddy build \
    --with github.com/greenpau/caddy-auth-jwt \
    --with github.com/greenpau/caddy-auth-portal

FROM caddy:2 as runtime

COPY --from=builder /usr/bin/caddy /usr/bin/caddy
