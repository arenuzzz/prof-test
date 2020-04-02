import * as yup from 'yup';
import { makeSchemaValidation } from './makeSchemaValidation';
import {
  getSimpleEmailValidationSchema,
  getSimplePasswordValidationSchema,
} from './schemas';

const getSignInValidationSchema = (values, messages, options) => {
  return yup.object().shape({
    email: getSimpleEmailValidationSchema(),
    password: getSimplePasswordValidationSchema(),
  });
};

export const getSignInValidation = (messages?: {}, options?: {}) => (
  values
) => {
  return makeSchemaValidation(
    values,
    getSignInValidationSchema(values, messages, options)
  );
};
