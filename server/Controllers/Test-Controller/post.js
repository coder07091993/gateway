const { formatResponse } = require("../../utils/helper");
const { testControllerPostSchema: schema } = require("../../utils/joi/index");
const {
	apiCodes,
	apiMessage,
} = require("../../constants/applicationConstants");
const logger = require("../../utils/logger");

/**
 * Displays the client ID
 * @param {object} req
 * @param {object} res
 *
 */
const testControllerPost = async function (req, res) {
	try {
		/*
		* Validating request body
		*/
		const { value: body, error: validationError } = schema.validate(req.body);
		if (validationError) {
			logger.error(`Request body is invalid:${req.body}`);
			/*
			* Returns Bad request response
			*/
			return formatResponse({
				res,
				error: validationError,
				code: apiCodes.error,
				message: apiMessage.badRequest,
				httpCode: 400,
			});
		}
		/**
		 * Printing the clientId
		 */
		logger.info(`***********Created Connection with client_id:${body.clientId}**********`);
		formatResponse({
			res,
			code: apiCodes.success,
			message: apiMessage.success,
			httpCode: 200,
		});
	} catch (error) {
		/**
		 * Sending Internal Error to Client.
		 */
		logger.error(`Error occured:${error.message}`);
		formatResponse({
			res,
			error,
			code: apiCodes.error,
			message: error.message,
			httpCode: 500,
		});
	}
};

module.exports = { testControllerPost };
