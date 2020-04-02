import * as React from 'react';
import { useHistory } from 'react-router';
import { FORM_ERROR } from 'final-form';
import { useStore } from '@lib/effector';

import { SignInValues } from '@features/auth/auth.types';

import { profilerApi } from '@api/profiler';

import { SignInForm, SignInFormProps } from '@ui/organisms/sign-in-form';
import {
  Error,
  getSignInValidation,
  getCaptchaValidation,
  getSimpleEmailValidation,
  getSimplePasswordValidation,
} from '@lib/validation';
import {
  $hasCaptcha,
  incrementPasswordWrongCount,
  resetPasswordWrongCount,
} from '@features/auth/model/captcha';

export type SignInFormContainerProps = {} & Omit<SignInFormProps, 'onSubmit'>;

export type SignInFormContainerFC = React.FC<SignInFormContainerProps>;

export const SignInFormContainer: SignInFormContainerFC = (props) => {
  const hasCaptcha = useStore($hasCaptcha);

  const history = useHistory();

  const validateCaptcha = getCaptchaValidation({}, {});

  // const validate = getSignInValidation({}, {});
  const validateEmail = getSimpleEmailValidation({}, {});
  const validatePassword = getSimplePasswordValidation({}, {});

  async function onSubmit(values, form) {
    const formData = {
      ...values,
    } as SignInValues;

    const emailError = await validateEmail(values.email);

    if (emailError) {
      return { email: emailError };
    }

    const [errorEmail] = await profilerApi.checkRegisteredEmail(values.email);

    if (errorEmail) {
      return { email: errorEmail.message };
    }

    const passwordError = await validatePassword(values.password);

    if (passwordError) {
      return { password: passwordError };
    }

    if (hasCaptcha) {
      const error = await validateCaptcha(values.captcha);

      if (error) {
        return { captcha: error };
      }
    }

    const [error, data] = await profilerApi.signIn(formData);

    if (error) {
      const { details, message } = error;

      if (hasCaptcha) {
        form.change('captcha', '');
      }

      if (Array.isArray(details)) {
        const isPasswordError = details.some(
          ({ field }) => field === 'password'
        );

        if (!hasCaptcha && isPasswordError) {
          incrementPasswordWrongCount();
        }

        const errors = Error.parseFieldErrorMessages(details);

        if (errors) {
          return errors;
        }
      }

      if (message) {
        return { [FORM_ERROR]: message };
      }
    }

    resetPasswordWrongCount();

    history.push('/search');
  }

  return <SignInForm {...props} onSubmit={onSubmit} hasCaptcha={hasCaptcha} />;
};

export default SignInFormContainer;
