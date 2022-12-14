INSERT INTO department (name)
VALUES
("Back of House"),
("Management"),
("Prep"),
("Serving"),
("Hosting");
INSERT INTO role (title, salary, department_id)
VALUES
("Manager", 80000, 1),
("Assistant Manager", 70000, 2),
("Team Leader", 60000, 3),
("Server", 50000, 4),
("Hostess", 40000, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Bob", "Johnson", 1, 1),
("Joe", "Jonson", 2, null),
("Beyonce", "Knowles", 3, 3),
("Donny", "T", 4, null),
("Raven", "Bear", 5, 5);

