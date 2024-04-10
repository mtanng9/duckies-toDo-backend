const Joi = require('joi')

const TodoSchema = Joi.object({
    task: Joi.string().required(),
    complete: Joi.boolean(),
    dueDate: Joi.date()
})

module.exports = TodoSchema