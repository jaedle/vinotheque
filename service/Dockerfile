FROM golang:1.15 as build

WORKDIR /build
ADD . ./
RUN CGO_ENABLED=0 go build -o service main.go

FROM scratch as runtime

VOLUME /data
COPY test/wines.yml /data/wines.yml
ENV WINES=/data/wines.yml

WORKDIR /app
COPY --from=build /build/service ./

ENV PORT 8080
CMD [ "/app/service" ]
