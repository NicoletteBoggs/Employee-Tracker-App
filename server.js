const db = require("./connection");
const inquirer = require("inquirer");

// starting prompt to ask qustions
const initprompt = () => {
  inquirer
    .prompt([
      {
        name: "prompt",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Create a new department",
          "Create a new role",
          "Add a new employee",
          "Update employee role",
          "Quit",
        ],
      },
    ])
    .then(function (res) {
      switch (res.prompt) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Create a new department":
          addDepartment();
          break;
        case "Create a new role":
          addRole();
          break;
        case "Add a new employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        case "Quit":
          Quit();
          break;
      }
    });
};
// in order to update an employee role we need to select the emplyee who's role we want to change and then select the role we're assigning them
// take answers and use as parameters on update query for employee table
function updateEmployee() {
  db.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "Employee",
          message: "Select the employee who is changing roles",
          choices: res.map((employee) => employee.first_name),
        },
      ])
      .then(function (answer) {
        const Employee = res.find(
          (employee) => employee.first_name === answer.Employee
        );
        db.query("SELECT * FROM roles", function (err, res) {
          inquirer
            .prompt([
              {
                type: "list",
                name: "updateRole",
                message: "Select the new role for this employee",
                choices: res.map((role) => role.title),
              },
            ])
            .then(function (answer) {
              const selectedRole = res.find(
                (role) => role.title === answer.updateRole
              );
              db.query(
                "UPDATE employees SET role_id = ? WHERE id = ?",
                [selectedRole.id, Employee.id],
                function (error) {
                  if (error) throw err;
                  initprompt();
                }
              );
            });
        });
      });
  });
}

// view querys grab table from database and console .table it in our terminal
function viewDepartments() {
  db.query(`SELECT * FROM departments`, function (err, res) {
    if (err) throw err;
    console.table(res);
    initprompt();
  });
}
function viewRoles() {
  db.query(`SELECT * FROM roles`, function (err, res) {
    if (err) throw err;
    console.table(res);
    initprompt();
  });
}
function viewEmployees() {
  db.query(`SELECT * FROM employees`, function (err, res) {
    if (err) throw err;
    console.table(res);
    initprompt();
  });
}

// inquirer prompt to ask name of new department and query insert into department table
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO departments SET ?",
        {
          name: answer.addDept,
        },
        function (err, res) {
          if (err) throw err;
          initprompt();
        }
      );
    });
}
// must query departments table in order to grab a current list of department IDs for foreign key
function addRole() {
  db.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the title of the new role?",
        },
        {
          name: "salary",
          type: "number",
          message: "What is the salary of this role?",
        },
        {
          name: "deptId",
          type: "list",
          message: "Select the department id for this role",
          choices: res.map((item) => item.id),
        },
      ])
      .then(function (answers) {
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: answers.title,
            salary: answers.salary,
            deptartment_id: answer.deptId,
          },
          function (err, res) {
            if (err) throw err;
            initprompt();
          }
        );
      });
  });
}
// must query roles table in order to get a role ID for new employee
function addEmployee() {
  db.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the new employee's first name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the new employee's last name?",
        },
        {
          name: "roleId",
          type: "list",
          //   current list of role IDs
          choices: results.map((item) => item.id),
          message: "Select a role ID for the new employee",
        },
      ])
      .then(function (answers) {
        db.query(
          "INSERT INTO employees SET ?",
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.roleId,
          },
          function (err, res) {
            if (err) throw err;
            initprompt();
          }
        );
      });
  });
}

initprompt();
