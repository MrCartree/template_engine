const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } = require("constants");
const specializedQuestions = {
    Manager: {
        type: "input",
        message: "What is the Managers office number?",
        name: "officeNumber"
    },
    Engineer: {
        type: "input",
        message: "What is your Engineers GitHub user-name?",
        name: "github"
    },
    Intern: {
        type: "input",
        message: "What is your Interns School?",
        name: "school"
    }
};

const confirmedQuestion = [
    {
        type: "confirm",
        message: "Would you like to add an Employee?",
        name: "addEmployee"
    }
];

const typeQuestion = [
    {
        type: "list",
        message: "Select an employee type to add.",
        name: "role",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ]
    }
];

const questions = [
    {
        type: "input",
        message: "What is the Employees name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the Employees ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the Employees Email?",
        name: "email"
    }
]

const employees = []

function init() {
    inquirer.prompt(confirmedQuestion)
        .then((res) => {
            if (res.addEmployee) {
                let role = undefined;
                const actualQuestions = [...questions];
                inquirer.prompt(typeQuestion)
                    .then((res) => {
                        actualQuestions.push(specializedQuestions[res.role])
                        role = res.role;
                    }).then(() => {
                        inquirer.prompt(actualQuestions)
                            .then((res) => {
                                employees.push(role, res);
                                console.log(employees);
                                init();
                            })
                    })

            } else {
                
            }
        })
}

init();

render([]);


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
