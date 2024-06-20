GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
TEST_DIR=./tests
GOTEST=$(GOCMD) test ${TEST_DIR}/...
OUTPUT=api

build:
	@echo "Building $(OUTPUT)..."
	$(GOBUILD) -o $(OUTPUT) -v

build-linux:
	@echo "Building for linux $(OUTPUT)..."
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 $(GOBUILD) -a -installsuffix cgo -o $(OUTPUT) -v

clean:
	@echo "Cleaning and removing $(OUTPUT)..."
	$(GOCLEAN)
	rm -f $(OUTPUT)

run:
	@echo "Starting $(OUTPUT)..."
	./$(OUTPUT)

dev: build run

test:
	@echo "Running tests"
	$(GOTEST)

docker-test:
	$(GOTEST) || { echo 'Tests failed, stopping build'; exit 1; }
