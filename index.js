// Requiring Inquirer, mysql2, and dotenv packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { allowedNodeEnvironmentFlags } = require('process');
require('dotenv').config();

// db variable that establishes the connection to the company_db database
const db = mysql.createConnection(
    {
        // process.env.DB_"..." is using dotenv to protect developer credentials
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log('Connected to the Company_db database.')
);

// Instruction to throw an error if there is one
    db.connect( (err) => {
        if (err){
            throw error;
        }
    });


    // Initializing the prompt to present the main menu of options for the user
    userOptions();

    // Function for userOptions with array of inquirer questions
    function userOptions() {
        return inquirer.prompt([
            {
                type: "list",
                name: "displayOptions",
                message: "What would you like to do?",
                choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"]
            }
        ])

        // Conditional statement to run the respective function dependent upon which option is selected in previous prompt
        .then((answers) => {
            if (answers.displayOptions === "View All Departments") {
                viewDepartments();
            }
            if (answers.displayOptions === "View All Roles") {
                viewRoles();
            }
            if (answers.displayOptions === "View All Employees") {
                viewEmployees();
            }
            if (answers.displayOptions === "Add Department") {
                addDepartment();
            }
            if (answers.displayOptions === "Add Role") {
                addRole();
            }
            if (answers.displayOptions === "Add Employee") {
                addEmployee();
            }
            if (answers.displayOptions === "Update Employee Role") {
                updateEmployeeRole();
            }
        })
    };

    // Function to show current departments
    function viewDepartments() {

        // Database query to SELECT all options from the available departments
        db.query('SELECT * FROM company_db.department;', function (err, results) {

            // Displays the results in a table
            console.table(results);

            // Invokes the main menu
            userOptions();
        })
    };

    // Function to show all current roles
    function viewRoles() {

        // Database query to SELECT role ID, title, department, and salary.
        db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;', function (err, results) {

            // Displays the results in a table
            console.table(results);

            // Invokes the main menu
            userOptions();
        })
    };

    // Function to add a department
    function addDepartment() {

        // Calls the inquirer prompt
        return inquirer.prompt([
            {
                type: "input",
                name: "departmentName",
                message: "What is the name of the department you would like to add?"
            },
        ])

        .then(function (answer) {

            // Database query add the department name entered in the prompt into the list of departments in the table
            db.query("INSERT INTO department (name) VALUES (?)", [answer.departmentName], function (err, results) {

            })

            // Invokes the main menu
            userOptions();
        })
    };

    // Function to show all current roles
    function viewRoles() {

        // Database query to SELECT role ID, title, department, and salary.
        db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;', function (err, results) {

            // Displays the results in a table
            console.table(results);

            // Invokes the main menu
            userOptions();
        })
    };

    // Function to show all current employees
    function viewEmployees() {

        // Database query to SELECT employee id, first name, last name, title, department, salary, manager's name
        db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id', function (err, results) {

            // Displays the results in a table
            console.table(results);

            // Invokes the main menu
            userOptions();
        })
    };

    // Function to add a department
    function addDepartment() {

        // Calls the inquirer prompt
        return inquirer.prompt([
            {
                type: "input",
                name: "departmentName",
                message: "What is the name of the department you would like to add?"
            },
        ])

        .then(function (answer) {

            // Database query add the department name entered in the prompt into the list of departments in the table
            db.query("INSERT INTO department (name) VALUES (?)", [answer.departmentName], function (err, results) {

            })

            // Invokes the main menu
            userOptions();
        })
    };

    // Function to add a new role
    function addRole() {

        // Database query to SELECT all available roles from the department table
        db.query('SELECT * FROM company_db.department;', function (err, results) {

            // Initializes an empty departmentArray to hold dpartment options for role to exist
            let departmentArray = [];

            // Takes each results and adds it to the departmentArray
        results.forEach(result => departmentArray.push({name: result.name, value: result.id}));

        // invokes the inquirer prompts
        return inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "What is the name of the role you would like to add?"
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is the salary of this role?"
            }
        ])
        })
    }