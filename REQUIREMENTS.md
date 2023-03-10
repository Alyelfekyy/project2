# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-   Index (GET `/api/products` )
-   Show (GET `/api/products/:id`)
-   Create [token required] (POST `/api/products/create`)
-   Delete [token required] (DELETE `/api/products/:id`)

#### Users

-   Index [token required] (GET `/api/users`)
-   Show [token required] (GET `/api/users/:id`)
-   Create (POST `/api/users`)
-   Delete [token required] (DELETE `/api/users/:id`)

#### Order

-   Index [token required] (GET `/api/orders`)
-   Show [token required] (GET `/api/orders/:id`)
-   Create [token required] (POST `/api/orders`)
-   Delete [token required] (DELETE `/api/orders/:id`)

## Data Shapes

#### Product

The table includes the following fields:

-   id
-   name
-   price
-   category
    The SQL schema for this table is as follows:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    price numeric ,
    category varchar(50)
)
```

#### User

The table includes the following fields:

-   id
-   username
-   firstName
-   lastName
-   password
    The SQL schema for this table is as follows:

```sql
CREATE TABLE "users" (
     user_id SERIAL PRIMARY KEY,
     username VARCHAR,
     first_name VARCHAR(50),
     last_name VARCHAR(50),
     password_digest VARCHAR
)
```

#### Orders

The table includes the following fields:

-   order_id
-   user_id
-   status of order (active or complete)
    The SQL schema for this table is as follows:

```sql
CREATE TABLE orders (
      order_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      status varchar NOT NULL,
      CONSTRAINT fk_orders_users
        FOREIGN KEY (user_id)
          REFERENCES users(user_id)
          ON DELETE CASCADE
          ON UPDATE CASCADE
);
```

#### order_products

The table includes the following fields:

-   id
-   product_id
-   order_id
-   quantity
    The SQL schema for this table is as follows:

```sql
CREATE TABLE order_products (
      id SERIAL PRIMARY KEY,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL,
      CONSTRAINT fk_order
        FOREIGN KEY (order_id)
          REFERENCES orders(id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,
      CONSTRAINT fk_products
        FOREIGN KEY (product_id)
          REFERENCES products(id)
          ON DELETE CASCADE
          ON

```
