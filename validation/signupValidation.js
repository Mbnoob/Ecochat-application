const joi = require('joi');

const signupSchema = joi.object({
    first_name: joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({"string.empty": "Name is not allowed to be empty"}),
    Email_id: joi.string()
    .lowercase()
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required()
    .messages({
      "string.empty": "Email id, is not allowed to be empty",
      "string.email": "Email id, Must Match The Required Patterns",
    }),
    passwords: joi.string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/)
    .required()
    .messages({"string.pattern.base": "Passwords must 8 characters long, with Uppercase, numbers & special characters"}),
    confirm_password: joi.any().equal(joi.ref('passwords'))
    .required()
    .messages({ 'any.only': 'Passwords does not match' })
})

module.exports = signupSchema;