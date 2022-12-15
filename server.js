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
          updateRole();
          break;
        case "Quit":
          Quit();
          break;
      }
    });
};

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
