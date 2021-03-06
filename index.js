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
db.connect((err) => {
    if (err) {
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
        results.forEach(result => departmentArray.push({ name: result.name, value: result.id }));

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
            },
            {
                type: "list",
                name: "roleDepartment",
                message: "What department will this role work in?",
                choices: departmentArray
            }
        ])

            .then((answers) => {

                // Database query to insert the response into the role table
                db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.roleName, answers.roleSalary, answers.roleDepartment], function (err, results) {
                    console.log(err);
                })

                // Invokes the main menu
                userOptions();
            })

    })
};


// Add employee function
function addEmployee() {

    //  Uses db.query to grab current role available in database
    db.query('SELECT * FROM company_db.role;', function (err, results) {

        // creating array variable to hold available roles
        let roleArray = [];

        // Takes each result and pushes into roleArray with title and id
        results.forEach(result => roleArray.push({ name: result.title, value: result.id }));

        // Inquire prompt to ask first name, last name, and role for employee
        return inquirer.prompt([
            {
                type: "input",
                name: "employeeFirstName",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "employeeLastName",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "employeeRole",
                message: "What role will the employee have?",
                choices: roleArray // list of available roles from query above
            },
        ])

            // Puts answers into new arrays to be inserted into database
            .then((answers) => {
                let newFirstName = answers.employeeFirstName;
                let newLastName = answers.employeeLastName;
                let newEmployeeRole = answers.employeeRole;

                // Database query to Select all employees from db
                db.query('SELECT * FROM company_db.employees;', function (err, results) {

                    // Initializes array to hold all employees
                    let employeeNameArray = [];

                    // Adds each result to the employeeNameArray
                    result.forEach(result => employeeNameArray.push({ name: result.first_name + ' ' + result.last_name, value: result.id }));

                    // Invokes the inquirer prompt to ask employee's manager
                    return inquirer.prompt([
                        {
                            type: "list",
                            name: "employeeManager",
                            message: "Who is the employee's manager?",
                            choices: employeeNameArray
                        },
                    ])


                        .then((answers) => {

                            // Sets the response to the prompt equal to variable managerOptions
                            let managerOptions = answers.employeeManager;

                            // Database query to insert the responses from the add employee prompt to employee table
                            db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [newFirstName, newLastName, newEmployeeRole, managerOptions], function (err, results) {
                                console.log(err);
                            })

                            // Invokes main menu
                            userOptions();
                        })
                })
            })
    })
};

// Update employee function
function updateEmployeeRole() {

    // Database query to select all employees from db
    db.query('SELECT * FROM company_db.employee;', function (err, results) {

        // Initializes empty array to add all current employees
        let employeeNameArray = [];

    // Takes the results of query and adds them to employeeNameArray
    results.forEach(result => employeeNameArray.push({ name: result.first_name + ' ' + result.last_name, value: result.id}));

        return inquirer.prompt([
            {
                type: "list",
                name: "updateEmployee",
                message: "Which employee are you updating today?",
                choices: employeeNameArray // lists all employee names
            },
        ])

        .then((answer) => {

            // Sets the employeeID variable equal to the response from previous prompt selection
            let employeeID = answer.updateEmployee;

        // Database query that selects all roles from the database
        db.query('SELECT * FROM company_db.role;', function (err, results) {

            // Initializes an empty array for current role options
            let roleOptions = [];

        // Takes each available role and adds it to the roleOptions array
        results.forEach(result => roleOptions.push({ name: result.title, value: result.id}));

            // Invokes the inquirer prompt to get employee's updated role
            return inquirer.prompt([
                {
                    type: "list",
                    name: "updateRole",
                    message: "What is the employee's new role?",
                    choices: roleOptions
                }
            ])

        .then((answer) => {

            // Sets the roleID variable equal to response from previous prompt
            let roleID = answer.updateRole;

            // Database query to update the company_db employees
            db.query('UPDATE company_db.employee SET role_id = ? WHERE id =?', [roleID, employeeID], function (err, results) {

                // Invokes main menu
                userOptions();
            })
        })
        })
        })
    })
};