CREATE TABLE product_of_order(
  id   SERIAL PRIMARY KEY,
  order_id   INTEGER NOT NULL REFERENCES orders (order_id),
  product_id INTEGER NOT NULL REFERENCES products (product_id),
  quantity   INTEGER NOT NULL
);