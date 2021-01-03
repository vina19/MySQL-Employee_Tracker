/* Specify which database that we are going to use. */
USE employees_db;

/* Department */
INSERT INTO department (name)
    VALUES ("Sales"),
           ("Engineering"),
           ("Finance"),
           ("Legal");

/* Role - set the department_id based on the department id. */
INSERT INTO role (title, salary, department_id)
    VALUES ("Sales Lead", 100000, 1),
           ("Salesperson", 80000, 1),
           ("Lead Engineer", 150000, 2),
           ("Software Engineer", 120000, 2),
           ("Accountant", 125000, 3),
           ("Legal Team Lead", 250000, 4),
           ("Lawyer", 190000, 4);

/* Employee - set the role_id based on the role id and manager_id based on the employee id. */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ("John", "Doe", 1, 3),
           ("Mike", "Chan", 1, 1),
           ("Ashley", "Rodriguez", 2, null),
           ("Kevin", "Tupik", 2, 3),
           ("Malia", "Brown", 3, null),
           ("Sarah", "Lourd", 4, null),
           ("Tom", "Allen", 4, 6),
           ("Christian", "Eckenrode", 2, 2);
           
SELECT * FROM department;
SELECT * FROM employee;
SELECT * FROM role;