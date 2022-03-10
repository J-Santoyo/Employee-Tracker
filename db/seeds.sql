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
VALUES ("Dwight", "Schrute", 9, NULL), --1
        ("Michael", "Scott", 1, NULL), --2
        ("Pam", "Beesly", 3, NULL), --3
        ("Jim", "Halpert", 5, NULL), --4
        ("Jan", "Levinson", 7, NULL), --5
        ("Angela", "Martin", 8, 5), --6
        ("Kevin", "Malone", 10, 1), --7
        ("Ryan", "Howard", 6, 4), --8
        ("Andy", "Bernard", 2, 2), --9
        ("Holly", "Flax", 4, 3); --10
