FROM golang:1.21.6 AS builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN make build-linux

FROM alpine:latest
RUN apk --no-cache add ca-certificates make
WORKDIR /root/
COPY --from=builder /app .

EXPOSE 8080
CMD ["make", "run"]
