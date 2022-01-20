CREATE DATABASE chocolate;
CREATE TABLE chocolate_type (
  id serial PRIMARY KEY,
  type_name VARCHAR(50),
  quantity_consumed INT,
);

INSERT INTO chocolate_type (type_name, quantity_consumed) VALUES ('dark', 20);
INSERT INTO chocolate_type (type_name, quantity_consumed) VALUES ('milk', 60);
INSERT INTO chocolate_type (type_name, quantity_consumed) VALUES ('white', 40);
INSERT INTO chocolate_type (type_name, quantity_consumed) VALUES ('ruby', 30);
INSERT INTO chocolate_type (type_name, quantity_consumed) VALUES ('compound', 10);

