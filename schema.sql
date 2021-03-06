/* Delete the database if there is database called employees_db before creating it. */
DROP DATABASE IF EXISTS employees_db;

/* Create the database employees_db. */
CREATE DATABASE employees_db;

/* Specify which database that we are going to use. */
USE employees_db;

/* Department Table */
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id) 
);

/* Role Table */
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

/* Employee Table */
/* Foreign key : https://www.w3schools.com/sql/sql_foreignkey.asp */
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES role(id)
);