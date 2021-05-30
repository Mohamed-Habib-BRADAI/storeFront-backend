# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## setup and run project
- clone project
- run the command line (yarn install)
- create .env file in the root folder of the project
- you can use this example to create the .env file:
POSTGRES_HOST=localhost
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=user1
POSTGRES_PASSWORD=password
ENV=test
BCRYPT_PASSWORD=udacity-full-javascript
SALT_ROUNDS=10
TOKEN_SECRET=token_secret
- create 2 databases (storefront, storefront_test) using psql postgres 
- run the migrations using the commande line : db-migrate up
- run the project using the commande line : yarn watch
- Node js is running on port 3000 and psql postgres is on port 5432
- run yarn test to test your project.
