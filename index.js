const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
// const db = require('./db');


// TODO:
// Make Database (schema.sql) - DONE
// make tables: Department (id, name), Role (id, title, salary, department_id), Employee (id, first_name, last_name, role_id, manager_id) - DONE
// Make Seed.sql to populate tables - DONE
// SQL Joins to combine tables in database
// inquirer prompts to populate table information
// console.table functionality?
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
                "View A Department",
                "View A Role",
                "View An Employee",
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
            case "View A Department":
                viewDept();
                break;
            case "View A Role":
                viewRole();
                break;
            case "View An Employee":
                viewEmployee();
                break;
            case "Update Employee Role":
                updateEmployee();
                break;
        }
    })
}

function init() {
    prompts();
}

init();