const connection = require("./connection");

class employeeDB {
    constructor(connection) {
        this.connection = connection;
    };
// Add and View Departments
    addDept(department) {
        return this.connection.query("INSERT INTO department SET ?", department);
    };

    viewDepts() {
        return this.connection.query("SELECT department.id, department.name FROM department;");
    };
// Add and View Roles
    addRole() {
        return this.connection.query("INSERT INTO role SET ?", role);        
    };
    
    viewRoles() {
        return this.connection.query("SELECT role.id. role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;");
    };
// Add and View Employees
    addEmployee() {
        return this.connection.query("INSERT INTO employee SET ?", employee);
    };

    viewEmployees() {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
    };

// Update Employee Role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
    }
}

module.exports = new employeeDB(connection);
