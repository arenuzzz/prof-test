import { getSimplePasswordValidationSchema } from './schemas';
import { makeSchemaValidation } from './makeSchemaValidation';

export const getSimplePasswordValidation = (messages?: {}, options?: {}) => (
  values
) => {
  return makeSchemaValidation(values, getSimplePasswordValidationSchema(), {
    field: true,
  });
};
