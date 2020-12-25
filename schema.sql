/* Delete the database if there is database called employees_db before creating it. */
DROP DATABASE IF EXISTS employees_db;

/* Create the database employees_db. */
CREATE DATABASE employees_db;

/* Specify which database that we are going to use. */
USE employees_db

/* Department Table */
CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id) 
);

/* Role Table */

/* Employee Table */