import * as React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';

import { styled } from '@styles/theming';
import { Form } from '@ui/molecules/form';

import { Input } from '@ui/atoms/input';
import { Button } from '@ui/atoms/button';
import { Config, FieldValidator } from 'final-form';
import { Error } from '@lib/validation';
import { createFocusDecorator } from '@lib/form/decorators';

import { AppType } from '@constants';
import { Captcha } from '@ui/atoms/captcha';

export type SignInFormProps = {
  appType?: AppType;
  onSubmit: Config['onSubmit'];
  validate?: Config['validate'];
  validateCaptcha?: FieldValidator<string>;
  hasCaptcha?: boolean;
};

export type SignInFormFC = React.FC<SignInFormProps>;

const StyledAuthorizationForm = styled(Form)`
  .btn-submit {
    width: 100%;
    text-transform: uppercase;
  }
`;

const focusDecorator = createFocusDecorator();

export const SignInForm: SignInFormFC = ({
  appType = AppType.DEMO,
  onSubmit = () => void 0,
  validate = () => void 0,
  validateCaptcha = () => void 0,
  hasCaptcha = false,
}) => {
  const emailLabel = 'Enter Email*';
  const emailPlaceholder = 'Your email';

  const passswordLabel = 'Enter Passsword*';
  const passswordPlaceholder = 'Your password';

  const submitLabel = 'Sign In';

  return (
    <FinalForm
      onSubmit={onSubmit}
      render={({ handleSubmit, submitError, submitting, validating }) => {
        return (
          <StyledAuthorizationForm onSubmit={handleSubmit}>
            <Field name='email'>
              {({
                input: { value, onChange, onFocus, onBlur, name },
                meta,
              }) => {
                const {
                  error,
                  submitError,
                  touched,
                  dirty,
                  dirtySinceLastSubmit,
                  submitFailed,
                  submitSucceeded,
                } = meta;
                console.log('meta email', meta);

                const errorMessage =
                  (submitFailed && error) ||
                  (dirty && error) ||
                  (!dirtySinceLastSubmit && submitError);

                const isDone =
                  (submitSucceeded || submitFailed) && !submitError;

                console.log('isDone', isDone);

                const isError = Error.is(errorMessage);
                return (
                  <Form.Group>
                    <Form.Label>{emailLabel}</Form.Label>
                    <Input
                      type='email'
                      name={name}
                      value={value}
                      onChange={onChange}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      placeholder={emailPlaceholder}
                      isError={isError}
                      isDone={isDone}
                    />
                    <Form.Error>{Error.getMessage(errorMessage)}</Form.Error>
                  </Form.Group>
                );
              }}
            </Field>
            <Field name='password'>
              {({
                input: { value, onChange, onFocus, onBlur, name },
                meta,
              }) => {
                const {
                  error,
                  submitError,
                  touched,
                  dirty,
                  dirtySinceLastSubmit,
                  submitFailed,
                } = meta;

                // console.log('meta', meta);

                const errorMessage =
                  (submitFailed && error) ||
                  (dirty && error) ||
                  (!dirtySinceLastSubmit && submitError);

                return (
                  <Form.Group>
                    <Form.Label>{passswordLabel}</Form.Label>
                    <Input
                      type='password'
                      name={name}
                      value={value}
                      onChange={onChange}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      isError={Error.is(errorMessage)}
                      placeholder={passswordPlaceholder}
                    />
                    <Form.Error>{Error.getMessage(errorMessage)}</Form.Error>
                  </Form.Group>
                );
              }}
            </Field>
            <Field name='captcha'>
              {({ input: { value, onChange }, meta }) => {
                const { error, submitError, dirtySinceLastSubmit } = meta;
                // console.log('meta', meta);

                if (!hasCaptcha) {
                  return null;
                }

                const errorMessage =
                  error || (!dirtySinceLastSubmit && submitError);

                const isError = Error.is(errorMessage);

                return (
                  <Form.Group>
                    <Captcha
                      value={value}
                      onChange={onChange}
                      isError={isError}
                    />
                    <Form.Error>{Error.getMessage(errorMessage)}</Form.Error>
                  </Form.Group>
                );
              }}
            </Field>

            {submitError && (
              <Form.Error className='submit-error' type='submitError'>
                {submitError}
              </Form.Error>
            )}
            <Button
              variant='primary'
              type='submit'
              className='btn-submit'
              disabled={submitting}
            >
              {submitLabel}
            </Button>
          </StyledAuthorizationForm>
        );
      }}
    />
  );
};

export default SignInForm;
