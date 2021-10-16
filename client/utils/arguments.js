const readline = require("readline");
const chalk = require('chalk'); 

const QUESTIONS = {
  Question1: "How many clients we want to create from this 1 Node client?",
  Question2: "Seconds X (How many X seconds we have to send data)?",
};


/**
 * @description Inputs the value from user
 * @param {string} question 
 * @returns {Promise<number>} value
 */
async function ValidateAndReturnIfNumber(question){
    let value
    while(isNaN(Number(value))){
        /**
        * Getting Values from the command Input
        */
         value = await getValuesFromCommandLine(question);
    }
    return Number(value);
}

// Get Value from command Line
function getValuesFromCommandLine(question) {
  return new Promise((res, rej) => {
    const readlineInst = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readlineInst.question(chalk.blue(`${question} \n`), (entryNum) => {
      res(entryNum);
      readlineInst.close();
    });
  });
}

/**
 * @description Returns the input taken from the User 
 * @returns totalClient and delayTime
 */
 async function main() {
    console.log(chalk.yellow( "Pls enter the inputs as numbers"));
    console.log(chalk.yellow( "Use Ctrl + C to exit \n"));
    
    const totalClients = await ValidateAndReturnIfNumber(QUESTIONS.Question1);
    const delayTime =  await ValidateAndReturnIfNumber(QUESTIONS.Question2);

    return {totalClients,delayTime}

}

module.exports = main
