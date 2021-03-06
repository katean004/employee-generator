const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let myEmpArr=[];


//Run continue or quit function
quit();



// Write code to use inquirer to gather information about the development team members

function createEmp(){
    const questions = 
            [{
                type: "input",
                message: "what is your name?",
                name: "name"
            },
            {
                type: "input",
                message: "what is your employment id?",
                name: "id"
            },
            {
                type: "input",
                message: "what is your work email?",
                name: "email"
            },
            {
                type: "list",
                message: "what is your role?",
                name: "role",
                choices:["Manager","Engineer","Intern"]
            }];

    inquirer.prompt(questions).then(function(answers){
                if(answers.role === "Engineer"){
                    inquirer.prompt({
                        type:"input",
                        name:"github",
                        message:"What is your github Username?"
                    }).then(function(engAns){
                        const myEngineer = new Engineer(answers.name,answers.id,answers.email,engAns.github)
                        console.log(myEngineer);
                        myEmpArr.push(myEngineer);
                        quit();
                    });
                }else if(answers.role === "Intern"){
                    inquirer.prompt({
                        type:"input",
                        name:"school",
                        message:"What school do you go to?"
                    }).then(function(intAns){
                        const myIntern = new Intern(answers.name, answers.id, answers.email, intAns.school);
                        console.log(myIntern);
                        myEmpArr.push(myIntern);
                        quit();
                    });

                }else if(answers.role === "Manager"){
                    inquirer.prompt({
                        type:"input",
                        name:"office",
                        message:"What is your office number?"
                }).then(function(manAns){
                    const myManager = new Manager(answers.name, answers.id, answers.email, manAns.office);
                    console.log(myManager);
                    myEmpArr.push(myManager);
                    quit();
                });
            }
        });
    }

// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function writeToFile(path, data){
    fs.writeFile(path, data, function(err){
        if(err) {
            return console.log(err);   
        }
        console.log("Done");
    });
}

function quit(){
    inquirer.prompt({
        type:"list",
        name:"quit",
        message:"Would you like to add an employee or quit?",
        choices: ["Add","Quit"]
    }).then(function(quitting){
        if(quitting.quit === "Add"){
            createEmp();
        }else if(quitting.quit === "Quit"){
            writeToFile(outputPath,render(myEmpArr));
        }
    });
}

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
