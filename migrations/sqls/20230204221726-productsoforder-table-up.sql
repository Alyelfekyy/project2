CREATE TABLE product_of_order(
  order_id   INTEGER NOT NULL REFERENCES orders (id),
  product_id INTEGER NOT NULL REFERENCES products (product_id),
  quantity   INTEGER NOT NULL
);