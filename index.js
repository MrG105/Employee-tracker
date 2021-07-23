const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const db = require('./db');

var connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'root',
    database : 'employee_db' 
  });
   

// TODO:
// Make Database (schema.sql) - DONE
// make tables: Department (id, name), Role (id, title, salary, department_id), Employee (id, first_name, last_name, role_id, manager_id) - DONE
// Make Seed.sql to populate tables - DONE
// SQL Joins to combine tables in database - MAYBE?
// inquirer prompts to populate table information - DONE
// console.table functionality? - MAYBE?
// Walkthrough video

function prompts() {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "What Would You Like To Do?",
            choices: [
                "Add A Department",
                "Add A Role",
                "Add An Employee",
                new inquirer.Separator(),
                "View All Departments",
                "View All Roles",
                "View All Employees",
                new inquirer.Separator()                
            ]                   
        }
    ]).then(userChoice => {
        switch (userChoice.options) {
            case "Add A Department":
                addDept();
                break;
            case "Add A Role":
                addRole();
                break;
            case "Add An Employee":
                addEmployee();
                break;
            case "View All Departments":
                viewDept();
                break;
            case "View All Roles":
                viewRole();
                break;
            case "View All Employees":
                viewEmployee();
                break;
        }
    })
}

function viewDept() {
    connection.query("SELECT department.id, department.name FROM department;", (err, results) => {
        if (err) throw err;
        console.table(results);
        prompts();
    });
}

function viewRole() {
    connection.query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;", (err, results) => {
        if (err) throw err;
        console.table(results);
        prompts();
    })
}

function viewEmployee() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", (err, results) => {
        if (err) throw err;
        console.table(results);
        prompts();
    });
}

function addDept() {
    inquirer.prompt([
        {
            name: "name",
            message: "What Is The Name Of Your Department?"
        }
    ]).then(res => {
        let name = res;
        connection.query("INSERT INTO department SET ?", name, (err, results) => {
            if (err) throw err;            
        })
        console.log(`Added ${name.name} To The List of Departments`);
        prompts();
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            message: "What Is Your Employee's First Name?"
        },
        {
            name: "last_name",
            message: "What Is Your Employee's Last Name?"
        }
    ]).then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
        connection.query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;", (err, results) => {
            if (err) throw err;
            let roles = results;

            const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));

            inquirer.prompt([
                {
                    type: "list",
                    name: "roleId",
                    message: "What Is Your Employee's Role?",
                    choices: roleChoices
                }
            ]).then(res => {
                let roleId = res.roleId;
                let employee = {
                    first_name: firstName,
                    last_name: lastName,
                    role_id: roleId,
                }

                connection.query("INSERT INTO employee SET ?", employee, (err, results) => {
                    if (err) throw err;
                });
                console.log(`Added ${firstName} ${lastName} To The List Of Employees`);
                prompts();
            });
        });
    })
}

function addRole() {
    connection.query("SELECT department.id, department.name FROM department;", (err, results) => {
        if (err) throw err;
        let departments = results;
        const deptChoices = departments.map(({id, name}) => ({
            name: name,
            value: id
        }));
        inquirer.prompt([
            {
                name: "title",
                message: "What is The Role?"
            },
            {
                name: "salary",
                message: "What Is The Salary?"
            },
            {
                type: "list",
                name: "department_id",
                message: "What Department Does Your Role Work For?",
                choices: deptChoices
            }
        ]).then (role => {
            connection.query("INSERT INTO role SET ?", role);
            console.log(`Added ${role.title} To The List Of Roles`);
            prompts();
        })
    })

}

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });


function init() {
    viewEmployee();
}

init();