import * as yup from 'yup';
import { EMPTY_ERROR } from './error';
import {
  hasUppercaseRegex,
  hasLowercaseRegex,
  hasNumberRegex,
  emailRegex,
} from '@lib/validation/matches';

export const getFirstNameValidationSchema = () =>
  yup
    .string()
    .min(2, 'Please enter your first name correctly')
    .required(`First name hasn't been entered`);

export const getLastNameValidationSchema = () =>
  yup
    .string()
    .min(2, `Please enter your last name correctly`)
    .required(`Last name hasn't been entered`);

export const getSimplePasswordValidationSchema = () =>
  yup.string().required(`Password hasn't been entered`);

export const getCreatePasswordValidationSchema = () =>
  yup
    .string()
    .matches(hasUppercaseRegex, {
      message: EMPTY_ERROR,
      excludeEmptyString: true,
    })
    .matches(hasLowercaseRegex, {
      message: EMPTY_ERROR,
      excludeEmptyString: true,
    })
    .matches(hasNumberRegex, {
      message: EMPTY_ERROR,
      excludeEmptyString: true,
    })
    .min(8, EMPTY_ERROR)
    .required(EMPTY_ERROR);

export const getConfirmPasswordValidationSchema = () =>
  yup
    .string()
    .oneOf([yup.ref('password'), null], `Entered passwords don't match`)
    .required(`Entered passwords don't match`);

export const getCityValidationSchema = () =>
  yup.string().required(`City hasn't been entered`);

export const getCountryValidationSchema = () =>
  yup.string().required(`Country hasn't been entered`);

export const getMobilePhoneNumberValidationSchema = () =>
  yup
    .string()
    .min(10, `Incorrect mobile phone number`)
    .required(`Mobile hasn't been entered`);

export const getSimpleEmailValidationSchema = () =>
  yup
    .string()
    .matches(emailRegex, {
      message: `Email doesn't comply with format`,
      excludeEmptyString: true,
    })
    // .email(`Email doesn't comply with format`)
    .required(`Email hasn't been entered`);

export const getEmailValidationSchema = () =>
  yup
    .string()
    // .email(`Email isn't correct`)
    .matches(emailRegex, {
      message: `Email isn't correct`,
      excludeEmptyString: true,
    })
    .required(`Email isn't correct`);

export const getSecureCodeValidationSchema = () =>
  yup
    .string()
    .min(36, `Entered secure code is wrong`)
    .required(`Entered secure code is wrong`);

export const getRoleValidationSchema = () =>
  yup.string().required(`Role hasn't been chosed`);

export const getCaptchaValidationSchema = () =>
  yup.string().required(`Please verify that you are not a robot`);
