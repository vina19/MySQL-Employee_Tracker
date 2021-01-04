// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const logo = require("asciiart-logo");
const asciitable = require("asciitable");

// Create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",
    // Your port, if not 3306
    port: 3306,
    // Your username, if not root
    user: "root",
    // Your password
    password: "flower",
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
                'View Department Total Salary',
                'Add Department',
                'Remove Department',
                'Exit'
            ]
        }).then((answer) => {

            // Condition for each options that the user choose.
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
                case 'View Department Total Salary':
                    viewDepartmentTotalSalary();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Remove Department':
                    removeDepartment();
                    break;
                case 'Exit':
                    console.log("\n Thank you for using my employee tracker! Have an awesome day! - VINA \n")
                    connection.end();
                    break;
            };
        });
};

// Display all the employees
function viewEmployees() {

    // Grabbing the needed data from the database to display employees info
    let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee m ON employee.manager_id = m.id ORDER BY employee.id";
    connection.query(query, (err, res) => {
        if (err) return err;
        console.log("\n ------ALL EMPLOYEES------ \n");

        // Using asciitable to display the data in table format.
        let options = {
            skinny: true,
            intersectionCharacter: "*",
        };

        let table = asciitable(options, res);

        console.log(table);

        // run the main main again.
        runEmployeeTracker();
    });
};

// Display all the employees by departments
function viewEmployeesByDepartment() {

    // Prompting the user to which department they want to choose.
    inquirer
        .prompt([
        {
            name: "department",
            type: "list",
            message: "Please choose which department to display: ",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal"
            ]
        }
        ]).then((answer) => {

            // Grabbing the needed data about the employees info based of the chosen department
            let query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee m ON employee.manager_id = m.id WHERE department.name = '${answer.department}' ORDER BY employee.id`;
            connection.query(query, (err, res) => {
                if (err) return err;
                console.log("\n ------EMPLOYEES BY DEPARTMENT------ \n");
                let options = {
                    skinny: true,
                    intersectionCharacter: "*",
                };
                let table = asciitable(options, res);
                console.log(table);
                runEmployeeTracker();
            });
        });
};

function viewEmployeesByManager() {

};

// Adding new employee to the database.
function addEmployee() {

    let query = "SELECT employee.id, role.title AS title, CONCAT(m.first_name, ' ', m.last_name) AS employee_name FROM employee INNER JOIN role ON role.id = employee.role_id LEFT JOIN employee m ON employee.manager_id = m.id ORDER BY employee.id";
    connection.query(query, (err, res) => {
        if (err) throw err;

        // Prompted the user questions about new employee info to be added in the database.
        inquirer
            .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?",
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?",
            },
            {
                name: "role",
                type: "list",
                message: "What is the employee's role?",
                choices: function() {

                    // Array to hold role list to be display as choices list.
                    let roleArray = [];
                    for (let i=0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    };
                    return roleArray;
                },
            },
            {
                name: "manager",
                type: "list",
                message: "Who is the employee's manager?",
                choices: function() {

                    // Array to hold manager list to be display as choices list.
                    let managerArray = [];
                    for (let i=0; i < res.length; i++) {
                        managerArray.push(res[i].employee_name);
                    };
                    return managerArray;
                }
            },
        ]).then((answer) => {

            // Insert the needed data to add a new employee to the database
            let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}", "${answer.lastName}", (SELECT id FROM role WHERE title = "${answer.role}"), (SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = "${answer.manager}"))`;
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log(res.affectedRows + " new employee inserted! \n");
                runEmployeeTracker();
            });
        });    
    });
};

function removeEmployee() {

};

// Update the selected employee role
function updateEmployeeRole() {

    let query = `SELECT employee.id, role.title AS title, CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name 
            FROM employee 
            INNER JOIN role ON role.id = employee.role_id 
            ORDER BY employee.id`;
    connection.query(query, (err, res) => {
        if (err) throw err;

        // Prompted the user about the question of which role they want to update
        inquirer
            .prompt([
                {
                    name: "updateEmployeeRole",
                    type: "list",
                    message: "Which employees do you want their role to be updated?",
                    choices: function() {
                        let empArray = [];
                        for (let i=0; i < res.length; i++) {
                            console.log(res[i].employee_name)
                            empArray.push(res[i].employee_name);
                        };
                        return empArray;
                    },
                },
                {
                    name: "updateRole",
                    type: "list",
                    message: "Which role do you want to set as a new role for the selected employee?",
                    choices: function() {
                        let roleArray = [];
                        for (let i=0; i < res.length; i++) {
                            roleArray.push(res[i].title);
                        };
                        return roleArray;
                    },
                },
            ]).then((answer) => {

                connection.query(`SELECT id FROM role WHERE title = "${answer.updateRole}"`, (err, res) => {
                    if (err) throw err;
                    let roleID = res[0].id;

                    connection.query(`SELECT id FROM employee WHERE CONCAT(employee.first_name, ' ', employee.last_name) = "${answer.updateEmployeeRole}"`, (err, res) => {
                        if (err) throw err;
                        let employeeID = res[0].id;

                        let query = `UPDATE employee SET role_id = ${roleID} WHERE id = ${employeeID}`;
                        connection.query(query, (err, res) => {
                            if (err) throw err;
                            console.log(res.affectedRows + " employee's role updated!\n");
                            runEmployeeTracker();
                        });
                    });
                });  
            });
    });
};

function updateEmployeeManager() {

};

// Display all the roles to the user
function viewRoles() {

    let query = "SELECT * FROM role";
    connection.query(query, (err, res) => {
        if (err) throw err;

        console.log("\n ------ROLE LIST------ \n");
        let options = {
            skinny: true,
            intersectionCharacter: "*",
        };
        let table = asciitable(options, res);
        console.log(table);
        runEmployeeTracker();
    });
};

// Add a new role to the database
function addRole() {

    let query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        
        // Prompted the user about the needed data to be added as a new role
        inquirer
            .prompt([
            {
                name: "roleTitle",
                type: "input",
                message: "What is the new role title?",
            },
            {
                name: "salary",
                type: "input",
                message: "What is the new salary?",
            },
            {
                name: "department",
                type: "list",
                choices: function() {
                    
                    // Array to hold department name to be display as a list options.
                    let departmentArray = [];
                    for (let i=0; i < res.length; i++) {
                        departmentArray.push(res[i].name);
                    };
                    return departmentArray;
                }
            }
            ]).then((answer) => {

                // Inserting the needed data for role to the database
                let query = `INSERT INTO role (title, salary, department_id) VALUES ("${answer.roleTitle}", "${answer.salary}", (SELECT id FROM department WHERE name = "${answer.department}"))`;
                connection.query(query, function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " new role inserted! \n");
                    runEmployeeTracker();
                });
            });
    });
};

// Remove role from the database
function removeRole() {

    let query = "SELECT * FROM role";
    connection.query(query, (err, res) => {
        if (err) throw err;

        // Prompted the user question of which role they would like to delete.
        inquirer
            .prompt([
                {
                    name: "deleteRole",
                    type: "list",
                    message: "Which role would you like to remove?",
                    choices: function() {
                        let roleArray = [];
                        for (let i=0; i < res.length; i++) {
                            roleArray.push(res[i].title);
                        };
                        return roleArray;
                    },
                },
            ]).then((answer) => {
                
                // Delete selected data from role
                let query = "DELETE FROM role WHERE ?";
                connection.query(query, { title: answer.deleteRole }, function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + "role successfully deleted!\n");
                    runEmployeeTracker();
                });
            });
    });
};

// View all department to the user from the database
function viewDepartments() {

    let query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;

        console.log("\n------DEPARTMENT LIST------ \n");
        let options = {
            skinny: true,
            intersectionCharacter: "*",
        };
        let table = asciitable(options, res);
        console.log(table);
        runEmployeeTracker();
    });

};

function viewDepartmentTotalSalary() {

};

// Add a new department to database
function addDepartment() {

    // Prompted the user questions about new department info to be added to the database.
    inquirer
        .prompt([
        {
            name: "department",
            type: "input",
            message: "What is the new department?"
        },
        ]).then((answer) => {

            // Inserting the new department to database
            let query = `INSERT INTO department (name) VALUES ("${answer.department}")`;
            connection.query(query, function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " new department inserted!\n");
                runEmployeeTracker();
            });
        });
};

// Remove selected department from the database
function removeDepartment() {

    let query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;

        // Prompted the user question of which department they would like to delete.
        inquirer
            .prompt([
                {
                    name: "deleteDept",
                    type: "list",
                    message: "Which department would you like to remove?",
                    choices: function() {
                        let deptArray = [];
                        for (let i=0; i < res.length; i++) {
                            deptArray.push(res[i].name);
                        };
                        return deptArray;
                    },
                },
            ]).then((answer) => {
                
                // Delete selected data from department
                let query = "DELETE FROM department WHERE ?";
                connection.query(query, { name: answer.deleteDept }, function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + "department successfully deleted!\n");
                    runEmployeeTracker();
                });
            });
    });
};