const joi = require('joi');

const signin_schema = joi.object({
    emails: joi.string()
    .lowercase()
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required()
    .messages({
      "string.empty": "Email id, is not allowed to be empty",
      "string.email": "Email id, Must Match The Required Patterns",
    }),
    password: joi.string()
    .required()
    .messages({"string.empty": "Password, is not allowed to be empty"}),
})

module.exports = signin_schema;