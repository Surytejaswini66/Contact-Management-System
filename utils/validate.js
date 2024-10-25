import Joi from "joi";

export function validateContact(contact) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    timezone: Joi.string().required(),
  });

  const { error } = schema.validate(contact);
  if (error) {
    return { isValid: false, error: error.details[0].message };
  }
  return { isValid: true };
}
