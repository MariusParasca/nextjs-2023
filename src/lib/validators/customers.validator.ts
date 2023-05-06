import Joi from 'joi';

export type CustomerBody = { email: string; name: string; balance: number };

export const customerBodyValidation = (body: CustomerBody) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    name: Joi.string().required().label('Name'),
    balance: Joi.number().label('Balance'),
  });
  return schema.validate(body);
};
