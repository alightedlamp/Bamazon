CREATE TABLE products (
  id INT UNIQUE NOT NULL AUTO_INCREMENT,
  name VARCHAR(55) NOT NULL,
  department_id SMALLINT,
  price SMALLINT NOT NULL,
  quantity SMALLINT,
  total_sales INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments (id)
);

CREATE TABLE departments (
  id SMALLINT UNIQUE NOT NULL AUTO_INCREMENT,
  name VARCHAR(55) NOT NULL,
  overhead_costs INT
);