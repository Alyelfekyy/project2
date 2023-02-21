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