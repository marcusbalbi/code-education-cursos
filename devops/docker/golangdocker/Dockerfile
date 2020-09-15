FROM golang:alpine3.12 as compiler

WORKDIR /builder
COPY hello.go .

RUN go build -o  app .

FROM scratch
COPY --from=compiler /builder/app app
CMD ["/app"]