import * as React from 'react';
import { Config, FieldValidator } from 'final-form';
import { Form as FinalForm, Field, FormSpy } from 'react-final-form';

import { styled } from '@styles/theming';

import { Captcha } from '@ui/atoms/captcha';
import { Input } from '@ui/atoms/input';
import { Button } from '@ui/atoms/button';

import { Form, passwordMarkers } from '@ui/molecules/form';

import { Error, getEmailValidation } from '@lib/validation';
import { secureCodeMask, formatString } from '@lib/format';
import { createFocusDecorator } from '@lib/form/decorators';
import { AppType } from '@constants';
import { profilerApi } from '@api/profiler';
import * as _ from 'lodash';
import { useHistory } from 'react-router';

export type SignUpFormProps = {
  appType?: AppType;
  onSubmit: Config['onSubmit'];
  validate?: Config['validate'];
  validateEmail?: FieldValidator<string>;
};

export type SignUpFormFC = React.FC<SignUpFormProps>;

const StyledSignUpForm = styled(Form)`
  .btn-submit {
    width: 100%;
    text-transform: uppercase;
  }
`;

const focusDecorator = createFocusDecorator();

export const SignUpForm: SignUpFormFC = ({
  appType = AppType.DEMO,
  onSubmit = () => void 0,
  validate = () => void 0,
  validateEmail = () => void 0,
}) => {
  // const history = useHistory();

  const isCompanyType = appType === AppType.COMPANY;

  const secureCodeLabel = 'Secure code*';
  const secureCodePlaceholder = 'Your secure code';

  const emailLabel = 'Enter Email*';
  const emailPlaceholder = 'Your email';

  const passswordLabel = 'Enter Passsword*';
  const passswordPlaceholder = 'Your password';

  const confirmPassswordLabel = 'Re-enter Passsword*';
  const confirmPassswordPlaceholder = 'Your password';

  const submitLabel = 'Sign Up';

  return (
    <FinalForm
      validate={validate}
      onSubmit={onSubmit}
      render={(formRenderProps) => {
        const {
          handleSubmit,
          submitError,
          validating,
          hasValidationErrors,
          submitting,
          dirtySinceLastSubmit,
          pristine,
        } = formRenderProps;

        return (
          <StyledSignUpForm onSubmit={handleSubmit}>
            {isCompanyType && (
              <Field name='secureCode' parse={formatString(secureCodeMask)}>
                {({
                  input: { value, onChange, onFocus, onBlur, name },
                  meta: { error, submitError, touched, dirty },
                }) => {
                  const errorMessage = dirty && (error || submitError);
                  const isError = Error.is(errorMessage);
                  const isDone = dirty && !isError;

                  return (
                    <Form.Group>
                      <Form.Label>{secureCodeLabel}</Form.Label>
                      <Input
                        type='text'
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        placeholder={secureCodeMask}
                        isError={Error.is(errorMessage)}
                        isDone={isDone}
                      />
                      <Form.Error>{Error.getMessage(errorMessage)}</Form.Error>
                    </Form.Group>
                  );
                }}
              </Field>
            )}
            <Field name='email' validate={validateEmail}>
              {({
                input: { value, onChange, onFocus, onBlur, name },
                meta,
              }) => {
                const { error, submitError, dirty, validating } = meta;

                const errorMessage = dirty && (error || submitError);
                const isError = Error.is(errorMessage);
                const isDone = dirty && !isError;

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
                      validating={validating}
                      isError={isError}
                      isDone={isDone}
                      autoComplete='off'
                    />
                    <Form.Error>{Error.getMessage(errorMessage)}</Form.Error>
                  </Form.Group>
                );
              }}
            </Field>
            <Field name='password'>
              {({
                input: { value, onChange, onFocus, onBlur, name },
                meta: { error, submitError, touched, dirty, modified },
              }) => {
                const errorMessage = dirty && (error || submitError);
                const isError = Error.is(errorMessage);
                const isDone = dirty && !isError;

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
                      placeholder={passswordPlaceholder}
                      isError={isError}
                      isDone={isDone}
                    />
                    <Form.Error>{Error.getMessage(errorMessage)}</Form.Error>
                    <Form.MarkerGroup>
                      {passwordMarkers.map(({ label, test }, idx) => {
                        return (
                          <Form.Marker
                            test={test}
                            value={value}
                            key={idx}
                            isError={dirty}
                          >
                            {label}
                          </Form.Marker>
                        );
                      })}
                    </Form.MarkerGroup>
                  </Form.Group>
                );
              }}
            </Field>
            <Field name='confirmPassword'>
              {({
                input: { value, onChange, onFocus, onBlur, name },
                meta: { error, submitError, touched, dirty, modified },
              }) => {
                const errorMessage = dirty && (error || submitError);
                const isError = Error.is(errorMessage);
                const isDone = dirty && !isError;

                return (
                  <Form.Group>
                    <Form.Label>{confirmPassswordLabel}</Form.Label>
                    <Input
                      type='password'
                      name={name}
                      value={value}
                      onChange={onChange}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      placeholder={confirmPassswordPlaceholder}
                      isError={isError}
                      isDone={isDone}
                    />
                    <Form.Error>{Error.getMessage(errorMessage)}</Form.Error>
                  </Form.Group>
                );
              }}
            </Field>
            {!isCompanyType && (
              <Field name='captcha'>
                {({
                  input: { value, onChange, onFocus, onBlur, name },
                  meta: { error, submitError, touched, dirty },
                }) => {
                  const errorMessage = touched && (error || submitError);
                  const isError = Error.is(errorMessage);
                  // const isDone = dirty && !isError;

                  return (
                    <Form.Group>
                      <Captcha onChange={onChange} isError={isError} />
                      <Form.Error>{Error.getMessage(errorMessage)}</Form.Error>
                    </Form.Group>
                  );
                }}
              </Field>
            )}

            {submitError && !dirtySinceLastSubmit && (
              <Form.Error className='submit-error' type='submitError'>
                {submitError}
              </Form.Error>
            )}

            <Button
              variant='secondary'
              type='submit'
              className='btn-submit'
              disabled={
                submitting || pristine || validating || hasValidationErrors
              }
            >
              {submitLabel}
            </Button>
          </StyledSignUpForm>
        );
      }}
    />
  );
};

export default SignUpForm;
