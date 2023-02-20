CREATE TABLE orders (
  order_id  SERIAL PRIMARY KEY,
  user_id  INTEGER REFERENCES users(user_id),
  status    VARCHAR(10)
);