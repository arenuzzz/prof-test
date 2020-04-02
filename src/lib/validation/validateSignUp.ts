import * as yup from 'yup';
import { makeSchemaValidation } from './makeSchemaValidation';
import {
  getEmailValidationSchema,
  getCreatePasswordValidationSchema,
  getConfirmPasswordValidationSchema,
  getSecureCodeValidationSchema,
  getCaptchaValidationSchema,
} from './schemas';

const getSignUpValidationSchema = (values, messages, options) => {
  return yup.object().shape({
    // email: getEmailValidationSchema(),
    password: getCreatePasswordValidationSchema(),
    confirmPassword: getConfirmPasswordValidationSchema(),
    captcha: getCaptchaValidationSchema(),
  });
};

const getSignUpCompanyValidationSchema = (values, messages, options) => {
  return yup.object().shape({
    secureCode: getSecureCodeValidationSchema(),
    // email: getEmailValidationSchema(),
    password: getCreatePasswordValidationSchema(),
    confirmPassword: getConfirmPasswordValidationSchema(),
  });
};

export const getSignUpValidation = (
  messages?: {},
  options?: { isCompanyType?: boolean }
) => (values) => {
  const getSchema =
    options && options.isCompanyType
      ? getSignUpCompanyValidationSchema
      : getSignUpValidationSchema;

  return makeSchemaValidation(values, getSchema(values, messages, options));
};
