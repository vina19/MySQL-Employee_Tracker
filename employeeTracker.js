// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const logo = require("asciiart-logo");
const { allowedNodeEnvironmentFlags } = require("process");

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
console.log(
    logo({
        name: 'Employee Manager',
        font: 'Delta Corps Priest 1',
        lineChars: 4,
        padding: 2,
        margin: 3
    }).render());

// Prompt for main menu
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
            switch(answer.options) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'View All Employees By Department':
                    viewEmployeesByDepartment();
                    break;
                case 'View All Employees By Manager':
                    viewEmployeesByManager();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Remove Employee':
                    removeEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'Update Employee Manager':
                    updateEmployeeManager();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Remove Role':
                    removeRole();
                    break;
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'View Total Utilized Department Budget':
                    viewDepartmentBudget();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Remove Department':
                    removeDepartment();
                    break;
                case 'Exit':
                    connection.end();
                    break;
            };
        });
};

function viewEmployees() {

};

function viewEmployeesByDepartment() {

};

function viewEmployeesByManager() {

};

function addEmployee() {

};

function removeEmployee() {

};

function updateEmployeeRole() {

};

function updateEmployeeManager() {

};

function viewRoles() {

};

function addRole() {

};

function removeRole() {

};

function viewDepartments() {

};

function viewDepartmentBudget() {

};

function addDepartment() {

};

function removeDepartment() {

};