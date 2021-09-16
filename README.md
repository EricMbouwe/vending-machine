# vending-machine

A Vending machine API connected to a React app.

## Running Application Locally
 
> Server
```
psql
CREATE  DATABASE vending_machine;

\l -> "List databases"
\c -> "db_name Connect to db_name"
\dt -> "List db tables"
\q -> "Quit psql console"

cd server
npm install

// seed the database
npm run seed

npm run dev
```

> Client
```
cd client
npm install

npm start
```

Create a .env file in the server directory and add your
- SESSION_SECRET
- PORT=3001
- DATABASE_URL

# Endpoints
- AUTH
```
POST /auth/register 
POST /auth/login
POST /auth/logout
GET  /auth/user 
```
- USERS
```
GET  /users
GET  /api/users/username
POST /api/users/deposit
POST /api/users/reset
POST /api/users/buy
```
- PRODUCTS
```
GET    /api/products
GET    /api/products/seller/sellerId
GET    /api/products/productId
POST   /api/products
PUT    /api/products/productId
DELETE /api/products/productId
```
- ROLES
```
GET  /api/roles
POST /api/roles
```

# Run tests

# Built with
- Express JS
- ReactJs
- Postgresql
- Style Component
