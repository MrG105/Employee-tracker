const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');

// TODO:
// Make Database (schema.sql)
// make tables: Department (id, name), Role (id, title, salary, department_id), Employee (id, first_name, last_name, role_id, manager_id)
// Make Seed.sql to populate tables
// inquirer prompts to populate table information
// console.table functionality?
// Walkthrough video