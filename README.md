# Candy Shop

Zimpler code test fetch data from api and display it.

## Docker-Compose

### `docker-compose --env-file backend/.env up --build`

Run Frontend and Backend in the same terminal.

Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

and [http://localhost:8081/api](http://localhost:8081/api/status) for API

## Frontend

### Prerequisites

- Node.js (>= 18.x)
- npm (>= 10.x)
- Docker (optional)
- Docker Compose (optional)

**Theses scripts only work if you are in fronted directory**

### `npm i`
*You need to run this before the other commands*

Download packages

### `npm start`

Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

### `npm test`

run tests

### `npm run build`

it builds... hopefully

## Backend

### Prerequisites

- go (() >= 1.21.x)

**Theses scripts only work if you are in backend directory**

### `make install`
*You need to run this before the other commands*

Download packages

### `make dev`

Build and run in [http://localhost:8081/api](http://localhost:8081/api/status)

### `make test`

run tests

### `make build`

it builds... hopefully

