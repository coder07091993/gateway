
const { callAPI } = require("./utils/apiCall");
const args = require("./utils/arguments");
const {implementingDelay, generatingFourDigitRandomNumbersArray, promiseArrayExecution, createPromiseArray } = require("./utils/helpers");

async function main(){
    // Taking inputs from clients
   const {totalClients,delayTime} = await args();

   // Generating ClientID
   const clientIds = generatingFourDigitRandomNumbersArray(totalClients);
   const promiseArray = createPromiseArray(clientIds);
   // Calling for the first time 
   await promiseArrayExecution(promiseArray);

   // Calling after delay
   const intervalFunc = await implementingDelay(promiseArrayExecution,delayTime);
   await intervalFunc(clientIds);

}

module.exports = main;
