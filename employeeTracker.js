// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const logo = require("asciiart-logo");

// Create the connection information for the sql database
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

// If the connection to the sql doesn't connect then throw an error if its error
// or else run the function.
connection.connect(function(err) {
    if (err) throw err;
    runEmployeeTracker();
});

// Added a logo employee manager
// Doom
console.log(
    logo({
        name: 'Employee Manager',
        font: 'Delta Corps Priest 1',
        lineChars: 4,
        padding: 2,
        margin: 3
    }).render());

function runEmployeeTracker() {
    inquirer
        .prompt({
            name: "options",
            type: "list",
            message: "What would you like to do?",
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees By Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'View All Roles',
                'Add Role',
                'Remove Role',
                'View All Departments',
                'View Department Budget',
                'Add Department',
                'Remove Department',
                'Exit'
            ]
        }).then(function(answer) {
        
        });
};