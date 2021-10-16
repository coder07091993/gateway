const chalk = require("chalk");
const { callAPI } = require("./apiCall");

/**
 * @description Calls a function again and again and invoke the function
 * passed as an argument
 * @param {function} func
 * @returns {Promise<function>}
 */
const implementingDelay = async function (func, delay) {
  let timeOut;
  // Closure to maintain the state
  return async (clientIds) => {
    timeOut = setInterval(async () => {
      const promiseArray = createPromiseArray(clientIds);
      await func.call(null, promiseArray);
    }, delay * 1000); // converting to ms
    // Returing an object with function to clear interval.
    return {
      clear: () => clearInterval(timeOut),
    };
  };
};

/**
 * @description Execution of Promise Array
 * @param {array} promiseArray
 */
const promiseArrayExecution = async (promiseArray) => {
  try {
    console.log(
      chalk.yellow("Executing PromiseArray of Length"),
      promiseArray.length
    );
    for (let i = 0; i < promiseArray.length; i++) {
      promiseArray[0].then((resp) => console.log({ resp: resp.data }));
    }
  } catch (err) {
    console.log(err);
    console.log(chalk.red("API FAILED"));
  }
};
/**
 * @description generate 4 digit number Array
 * @param {number} n
 * @returns
 */
const generatingFourDigitRandomNumbersArray = (n) => {
  const clientId = [];
  while (clientId.length < n) {
    const id = Math.floor(1000 + Math.random() * 9000);
    if (!clientId.includes(id)) {
      clientId.push(id);
    }
  }
  return clientId;
};

/**
 * @description Creating Promise array
 * @param {array} arr
 * @returns {Promise<array>}
 */
const createPromiseArray = function (arr) {
  return arr.map((clientId) => {
    return callAPI("http://localhost:3000/test", { clientId });
  });
};

exports.createPromiseArray = createPromiseArray;
exports.implementingDelay = implementingDelay;
exports.promiseArrayExecution = promiseArrayExecution;
exports.generatingFourDigitRandomNumbersArray =
  generatingFourDigitRandomNumbersArray;
