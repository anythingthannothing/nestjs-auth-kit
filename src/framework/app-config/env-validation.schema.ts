import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().integer().required(),
  CORS_ORIGIN: Joi.string().required(),
  MYSQL_HOST: Joi.string().required(),
  MYSQL_PORT: Joi.number().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required(),
  MYSQL_POOL_SIZE: Joi.number().required(),
});
