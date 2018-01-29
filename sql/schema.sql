CREATE TABLE products (
  id INT UNIQUE NOT NULL AUTO_INCREMENT,
  name VARCHAR(55) NOT NULL,
  department_id SMALLINT NOT NULL,
  price SMALLINT NOT NULL,
  quantity SMALLINT DEFAULT 0,
  total_sales INT DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments (id)
);

CREATE TABLE departments (
  id SMALLINT UNIQUE NOT NULL AUTO_INCREMENT,
  name VARCHAR(55) NOT NULL,
  overhead_costs INT NOT NULL
);