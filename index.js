const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const db = require('./db');


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
                new inquirer.Separator(),
                "Update Employee Role",
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
            case "Update Employee Role":
                updateEmployee();
                break;
        }
    })
}

function viewDept() {
    db.viewDepts()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => prompts());
}

function viewRole() {
    db.viewRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => prompts());
}

function viewEmployee() {
    db.viewEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => prompts());
}

function addDept() {
    prompt([
        {
            name: "name",
            message: "What Is The Name Of Your Department?"
        }
    ]).then(res => {
        let name = res;
        db.addDept(name);
        console.log(`Added ${name.name} To The List of Departments`);
        prompts();
    })
}

function addEmployee() {
    prompt([
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

        db.viewRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title}) => ({
                name: title,
                value: id
            }));

            prompt([
                {
                type: "list",
                name: "roleId",
                message: "What Is Your Employee's Role?",
                choices: roleChoices
                }
            ]).then (res => {
                let roleId = res.roleId;
                let employee = {
                    first_name: firstName,
                    last_name: lastName,
                    role_id: roleId,
                }

                db.addEmployee(employee);
                console.log(`Added ${firstName} ${lastName} To The List Of Employees`);
                prompts();
            })
        }) 
    })

}

function addRole() {
    db.viewDepts()
    .then(([rows]) => {
        let departments = rows;
        const deptChoices = departments.map(({id, name}) => ({
            name: name,
            value: id
        }));
        prompt([
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
            db.addRole(role);
            console.log(`Added ${role.title} To The List Of Roles`);
            prompts();
        })
    })

}

function updateEmployee() {

}

function init() {
    prompts();
}

init();