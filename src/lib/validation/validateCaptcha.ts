import { getCaptchaValidationSchema } from './schemas';
import { makeSchemaValidation } from './makeSchemaValidation';

export const getCaptchaValidation = (messages?: {}, options?: {}) => (
  values
) => {
  return makeSchemaValidation(values, getCaptchaValidationSchema(), {
    field: true,
  });
};
