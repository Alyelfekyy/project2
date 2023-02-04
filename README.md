# Storefront backend

This repo contains the backend application for an eCommerce store front. It is a RESTful API.

The database schema and and API route information can be found in the [requirements doc](REQUIREMENTS.md).

## Libraries used

The application uses the following libraries:

-   Runtime: Node.js (JavaScript)
-   Web application framework: Express
-   Language: TypeScript
-   Database: Postgres
-   Testing: Jasmine and Supertest

## Installation Instructions

To install the app's dependencies and use the app in dev mode, run the following:

`npm install` to install all dependencies
`db-migrate up` to set up the database and get access via http://127.0.0.1:5432
`npm start` to run the app in dev mode

### Ports

The application runs on port `3000` with database on `5432`.

### Environment variables

To satisfy Udacity requirements, the following environment variable are needed.

```
TEST_POSTGRES_DB=test
DEV_POSTGRES_DB=dev

# DB VARIABLES
POSTGRES_HOST=127.0.0.1
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1322

# BCRYPT VARIABLES
BCRYPT_PASSWORD=bcryptpassword
SALT_ROUNDS=1222

# JWT
TOKEN_SECRET=topsecret
```
