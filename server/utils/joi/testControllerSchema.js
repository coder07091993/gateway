const Joi = require("joi");

const testControllerPostSchema = Joi.object({
	clientId:Joi.number().required()
});

module.exports = { testControllerPostSchema};
 