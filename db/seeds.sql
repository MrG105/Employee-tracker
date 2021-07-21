USE employee_db;

INSERT INTO department (name)
VALUES ("Science"), ("Art"), ("Math");

INSERT INTO role (title, salary, department_id)
VALUES
 ("Conductor", 80000, 2),
 ("Accountant", 50000, 3),
 ("Scientist", 50000, 1),
 ("Sculptor", 10000, 2),
 ("Archeologist", 100000, 1),
 ("Author", 45000, 2),
 ("Lab Assistant", 10000, 1),
 ("Painter", 15000, 2),
 ("Band Director", 50000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("John", "Williams", 1, null),
("Christian", "Wolff", 2, null),
("Bruce", "Banner", 3, null),
("Pablo", "Picasso", 4, null),
("Indiana", "Jones", 5, null),
("Stephen", "King", 6, null),
("Hank", "Pym", 7, 3),
("Salvador", "Dali", 8, 4),
("Ricky", "Ricardo", 9, 1);
