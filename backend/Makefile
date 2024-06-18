GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
OUTPUT=api

build:
	$(GOBUILD) -o $(OUTPUT) -v

build-linux:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 $(GOBUILD) -a -installsuffix cgo -o $(OUTPUT) -v

clean:
	$(GOCLEAN)
	rm -f $(OUTPUT)

run:
	./$(OUTPUT)

dev: build run
