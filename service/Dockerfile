FROM golang:1.15 as build

WORKDIR /build
ADD . ./
RUN CGO_ENABLED=0 go build -o service main.go

FROM alpine as certs

RUN apk add --no-cache ca-certificates

FROM scratch as runtime

COPY --from=certs /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt

VOLUME /data
COPY test/wines.yml /data/wines.yml
ENV WINES=/data/wines.yml

WORKDIR /app
COPY --from=build /build/service ./

ENV PORT 8080
CMD [ "/app/service" ]
