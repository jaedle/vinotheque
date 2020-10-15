FROM golang:1.15 as build

WORKDIR /build
ADD . ./
RUN CGO_ENABLED=0 go build -o service main.go

FROM scratch as runtime

WORKDIR /app
COPY --from=build /build/service ./

ENV PORT 8080
CMD [ "/app/service" ]
