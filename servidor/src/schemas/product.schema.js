const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const sleeveColor=Joi.string();
const flavor=Joi.string();
const presentation=Joi.string();
const packaging=Joi.string();
const stock=Joi.number().integer();
const wholesalePrice = Joi.number();
const sellingPrice = Joi.number();
const image = Joi.string().uri();
const categoryId = Joi.number().integer();
const brandId = Joi.number().integer();
const conditionId = Joi.number().integer();

const create_at=Joi.date().timestamp();
const description=Joi.string();
const price=Joi.number().integer();

const price_min = Joi.number().integer().min(10);
const price_max = Joi.number().integer().min(10);

const limit = Joi.number().integer();
const offset = Joi.number().integer();


const createProductSchema = Joi.object({
  name: name.required(),
  image: image.required(),
  description:description.required(),
  // sleeveColor:sleeveColor.required(),
  // flavor:flavor.required(),
  // presentation:presentation.required(),
  // packaging:packaging.required(),
  // stock:stock.required(),
  // wholesalePrice:wholesalePrice.required(),
  // sellingPrice:sellingPrice.required(),
  price:price.required(),
  categoryId: categoryId.required(),
  // brandId:brandId.required(),
  // conditionId:conditionId.required()
});

const updateProductSchema = Joi.object({
  name: name,
  image: image,
  description,
  price: price,
  categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  // price_max:price_max.when('price_min',{
  //   is:Joi.number().integer(),
  //   then:Joi.required()
  // })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema,queryProductSchema }
