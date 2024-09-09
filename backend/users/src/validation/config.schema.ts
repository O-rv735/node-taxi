import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),

  // ### USERS MICROSERVICE CONFIG
  USERS_SERVICE_PORT: Joi.number().port().default(4000),
  BCRYPT_SALT_ROUNDS: Joi.number().integer().min(4).max(20).default(10),

  // ### USERS_PRISMA_DB_URL config
  POSTGRES_USER: Joi.string().min(3).max(30),
  POSTGRES_PASSWORD: Joi.string().min(8),
  POSTGRES_PORT: Joi.number().port().default(5432),
  POSTGRES_DB: Joi.string().min(3).max(50),
  USERS_PRISMA_DB_URL: Joi.string().uri({ scheme: ['postgresql'] }),
}).required();
