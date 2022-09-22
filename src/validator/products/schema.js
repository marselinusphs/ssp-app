const Joi = require('joi');
 
const ProductPayloadSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
});
 
module.exports = { ProductPayloadSchema };