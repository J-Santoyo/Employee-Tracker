USE company_db;

INSERT INTO department (name)
VALUE ("Sales"), --1 
        ("Finance"), --2
        ("Engineering"),--3
        ("Marketing"), --4
        ("Web Development"); --5

-- Numbers = role ID number
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 120000, 1), --1
("Sales Representative", 45000, 1), --2
("CFO", 150000, 2), --3
("Accountant", 72000, 2), --4
("Lead Engineer", 111000, 3), --5
("Junior Engineer", 71000, 3), --6
("Director of Marketing", 82000, 4), --7
("Marketing Assistant", 51000, 4), --8
("Senior Developer", 122000, 5), --9
("Junior Developer", 67000, 5); --10

-- Number = employee ID number
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
