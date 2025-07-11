# Steam Clone Backend

This project is a Node.js REST API for a Steam-like platform. It uses Express, PostgreSQL via Sequelize and includes Swagger documentation.

## Environment variables
Create a `.env` file based on `.env.example` and configure values for your database and JWT secret. Example:

```
cp .env.example .env
```

## Local development
Install dependencies and start the server with hot reload:

```
npm install
npm run dev
```

Swagger documentation will be available at `http://localhost:5000/api-docs` by default.

## Docker
A production-ready `Dockerfile` is included. Build and run the container:

```
docker build -t steam-clone-backend .
docker run --env-file .env -p 5000:5000 steam-clone-backend
```

The API will listen on the port specified in your `.env` file.
