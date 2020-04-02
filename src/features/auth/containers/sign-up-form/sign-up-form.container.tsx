import * as React from 'react';
import { useHistory } from 'react-router';

import { FORM_ERROR } from 'final-form';

import { SignUpValues } from '@features/auth/auth.types';

import { profilerApi, CustomErrorCode } from '@api/profiler';

import { SignUpForm, SignUpFormProps } from '@ui/organisms/sign-up-form';
import {
  Error,
  getSignUpValidation,
  getEmailValidation,
} from '@lib/validation';
import * as _ from 'lodash';
import { isCompanyType } from '@constants';
// import { sleep } from '@lib/helpers';
import { createSleep } from '@lib/helpers/sleep';

// import { sleep } from '@lib/helpers';

export type SignUpFormContainerProps = Omit<SignUpFormProps, 'onSubmit'> & {};

export type SignUpFormContainerFC = React.FC<SignUpFormContainerProps>;

const debouncedCheckRegisteredEmail = _.debounce(
  profilerApi.checkRegisteredEmail,
  500
);

const sleep = createSleep();

export const SignUpFormContainer: SignUpFormContainerFC = (props) => {
  const history = useHistory();

  const onSubmit = async (values) => {
    const formData = {
      ...values,
    } as SignUpValues;

    const [error, data] = await profilerApi.signUp(formData);

    if (error) {
      const { details, message, customErrorCode } = error;

      if (customErrorCode === CustomErrorCode.EMAIL_ALREADY_EXISTS) {
        history.push('/sign-in');
      }

      if (Array.isArray(details)) {
        return Error.parseFieldErrorMessages(details);
      }

      if (message) {
        return { [FORM_ERROR]: message };
      }
    } else {
      history.push('/sign-in');
    }
  };

  const validateEmail = getEmailValidation({}, {});

  const _validateEmail = async (value, _, meta) => {
    const error = await validateEmail(value);

    if (!meta.active && error) {
      return error;
    }

    if (error) {
      // await sleep(500);
      return error;
    }

    if (meta.active) {
      const [err, data] = await profilerApi.checkRegisteredEmail(value);

      if (data) {
        history.push('/sign-in');
      }
    }
  };

  const validate = getSignUpValidation({}, { isCompanyType });

  return (
    <SignUpForm
      onSubmit={onSubmit}
      validate={validate}
      validateEmail={_validateEmail}
      {...props}
    />
  );
};

export default SignUpFormContainer;
