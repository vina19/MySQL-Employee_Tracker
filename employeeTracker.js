// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",
    // Your port, if not 3306
    port: 3306,
    // Your username, if not root
    user: "root",
    // Your password
    password: "",
    database: "employees_db"
});