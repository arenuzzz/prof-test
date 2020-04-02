import { getEmailValidationSchema } from './schemas';
import { makeSchemaValidation } from './makeSchemaValidation';

export const getEmailValidation = (messages?: {}, options?: {}) => (values) => {
  return makeSchemaValidation(values, getEmailValidationSchema(), {
    field: true,
  });
};
