const axios = require("axios");
const chalk = require("chalk");

/**
 * @description Call's API
 * @param {string} url 
 * @param {object} payload 
 * @returns {object} 
 */
async function callAPI(url, payload) {
   console.log(chalk.yellow(`Calling the API URL:${url} , payload:${JSON.stringify(payload)}`))
  // Calling the API
  const response = await axios.post(url, {...payload});
  return response;
}


exports.callAPI =  callAPI