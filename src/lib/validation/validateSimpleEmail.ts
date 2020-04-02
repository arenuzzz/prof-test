import { getSimpleEmailValidationSchema } from './schemas';
import { makeSchemaValidation } from './makeSchemaValidation';

export const getSimpleEmailValidation = (messages?: {}, options?: {}) => (
  values
) => {
  return makeSchemaValidation(values, getSimpleEmailValidationSchema(), {
    field: true,
  });
};
