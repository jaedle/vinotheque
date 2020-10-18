FROM golang:1.15 as build

WORKDIR /build
ADD . ./
RUN CGO_ENABLED=0 go build -o service main.go

FROM scratch as runtime

WORKDIR /app
COPY --from=build /build/service ./

VOLUME /data

ENV PORT 8080
ENV WINES=/data/wine.yml
CMD [ "/app/service" ]
