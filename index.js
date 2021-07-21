const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const db = require('./db');


// TODO:
// Make Database (schema.sql) - DONE
// make tables: Department (id, name), Role (id, title, salary, department_id), Employee (id, first_name, last_name, role_id, manager_id) - DONE
// Make Seed.sql to populate tables - DONE
// SQL Joins to combine tables in database
// inquirer prompts to populate table information
// console.table functionality?
// Walkthrough video