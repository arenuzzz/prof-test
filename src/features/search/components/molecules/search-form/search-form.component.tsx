import React from 'react';
import * as _ from 'lodash';
import { useStore, createStoreConsumer } from '@lib/effector';
import {
  Form as FinalForm,
  Field,
  FormProps,
  FormSpy,
  useField,
} from 'react-final-form';
import setFieldData from 'final-form-set-field-data';
import Scrollbars from 'react-custom-scrollbars';
import { styled } from '@styles/theming';
import { Country } from '@features/search/search.types';

import { Form } from '@ui/molecules/form';
import { Input } from '@ui/atoms/input';
import { Button } from '@ui/atoms/button';

import { Error } from '@lib/validation';

import {
  SearchFormValues,
  $initialSearchFormValues,
  saveSearchFormValues,
} from '@features/search/model/search-form';
import {
  fxCheckPhone,
  $trueCallerData,
} from '@features/search/model/truecaller';
import {
  formatValue,
  formatInstagramValue,
  formatTelegramValue,
  formatLinkValue,
} from '@lib/format';
import {
  validateTelegram,
  validateInstagram,
  validateLinkedIn,
  validateVkontakte,
  validateFacebook,
  validatePhone,
} from '@lib/validation/search';

import { PhoneNumberSelect } from '../../atoms/phone-number-select';
import { CountrySelect } from '../../atoms/country-select';

export type SearchFormProps = FormProps<SearchFormValues> & {
  countries: Country[];
};

const StyledSearchForm = styled(Form)`
  position: relative;
  height: 100%;
  padding-top: 4px;

  .form-content {
    height: 100%;
    margin-bottom: 66px;

    .form-fields {
      position: relative;
      padding: 0 28px 0;

      & > *:not(:first-child) {
        margin-top: 10px;
      }
    }
  }

  .form-error {
    height: 12px;
  }

  button[type='submit'] {
    position: absolute;
    bottom: 14px;
    left: 28px;

    margin: 0;

    width: calc(100% - 56px);
  }
`;

// const debouncedFxCheckPhone = _.debounce(fxCheckPhone, 400);

function Spy({ mutators }) {
  const phoneField = useField('phone', {
    subscription: {
      error: true,
      value: true,
      active: true,
    },
  });

  mutators.setFieldData('phone', {
    warning: '',
  });

  const {
    input: { value },
    meta: { error, active },
  } = phoneField;

  if (error || active) {
    return null;
  }

  if (value && value.countryCode && value.number && value.phoneNumber) {
    fxCheckPhone(value.phoneNumber as string);
  }

  return null;
}

function AutoSave() {
  return (
    <FormSpy
      subscription={{ values: true }}
      onChange={(props) => {
        saveSearchFormValues(props.values);
      }}
    />
  );
}

const TrueCallerDataConsumer = createStoreConsumer($trueCallerData);

export function SearchForm(props: SearchFormProps) {
  const initialValues = useStore($initialSearchFormValues);

  const { onSubmit = () => {}, countries = [] } = props;

  const countryOptions = countries.map(({ code, name }) => ({
    value: name,
    label: name,
    code,
  }));

  const phoneNumberOptions = countries.map(({ phoneCode, name, code }) => ({
    value: `+${phoneCode}/${code}`,
    label: `+${phoneCode}`,
    data: {
      countryName: name,
      code,
    },
  }));

  return (
    <FinalForm<SearchFormValues>
      // debug={(props) => {
      //   console.log('Form props', props);
      //   console.log('Values', props.values);
      // }}
      validateOnBlur
      validate={(values) => {
        // console.log('VALIDATION', values);
        const { country, initials } = values;
        const errors: SearchFormValues = {};

        if (initials && !country) {
          errors.country = 'Required';
        }

        return errors;
      }}
      subscription={{}}
      onSubmit={onSubmit}
      initialValues={{ ...initialValues }}
      mutators={{
        setFieldData,
        setCountryValue: ([countryCode], state, { changeValue }) => {
          const { country } = state.fields;
          // const { initialValues } = state.formState;

          console.log(country);
          if (country && !country.modified) {
            changeValue(state, 'country', (prevValue) => {
              const countryItem = countries.find(
                (item) => item.code === countryCode
              );

              return countryItem ? countryItem.name : prevValue;
            });
          }
        },
        setInitials: ([initials], state, { changeValue }) => {
          changeValue(state, 'initials', (prevValue) => initials);
        },
      }}
      render={({ handleSubmit, form }) => {
        return (
          <StyledSearchForm onSubmit={handleSubmit}>
            <TrueCallerDataConsumer>
              {({ data, error, isLoading }) => {
                const { mutators } = form;

                if (isLoading) {
                  return null;
                }

                if (error) {
                  mutators.setFieldData('phone', {
                    error: error.message,
                  });

                  return null;
                }

                if (!data) {
                  return null;
                }

                const { isExists, initials } = data;

                if (isExists) {
                  mutators.setInitials(initials);
                } else {
                  const warning = `Such phone number doesn't exist in OpenCNAM`;

                  mutators.setFieldData('phone', {
                    warning,
                  });
                  mutators.setInitials('');
                }

                return null;
              }}
            </TrueCallerDataConsumer>
            <Spy mutators={form.mutators} />
            <AutoSave />
            <div className='form-content'>
              <Scrollbars autoHide autoHideDuration={300}>
                <div className='form-fields'>
                  <Field<SearchFormValues['phone']>
                    name='phone'
                    validate={validatePhone}
                  >
                    {({
                      input: { value, onChange, onFocus, onBlur },
                      meta: {
                        submitFailed,
                        error,
                        dirty,
                        touched,
                        dirtySinceLastSubmit,
                        submitError,
                        active,
                        data = {},
                        ...meta
                      },
                    }) => {
                      const errorMessage =
                        (!active && (error || data.error)) ||
                        (!dirtySinceLastSubmit && submitError);

                      const isError = Error.is(errorMessage);
                      const isDone =
                        !isError && !active && !!value && !!value.phoneNumber;

                      const messageWarn = data.warning;
                      const isWarn = !!messageWarn;

                      const messageError = Error.getMessage(errorMessage);

                      return (
                        <Form.Group>
                          <Form.Label>Phone</Form.Label>
                          <PhoneNumberSelect
                            selectPlaceholder='+'
                            inputPlaceholder='Enter the phone'
                            data={phoneNumberOptions}
                            value={value}
                            onChange={onChange}
                            onChangeCountry={form.mutators.setCountryValue}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            isError={isError}
                            isWarn={isWarn}
                            isDone={isDone}
                          />
                          <Form.Error
                            type={isError ? 'error' : isWarn ? 'warn' : ''}
                          >
                            {messageError || messageWarn}
                          </Form.Error>
                        </Form.Group>
                      );
                    }}
                  </Field>
                  <Field<string> name='country'>
                    {({
                      input: { value, onChange, onFocus, onBlur, name },
                      meta: {
                        submitFailed,
                        error,
                        dirty,
                        touched,
                        dirtySinceLastSubmit,
                        submitError,
                        active,
                        ...meta
                      },
                    }) => {
                      const errorMessage =
                        (!active && error) ||
                        (!dirtySinceLastSubmit && submitError);

                      const isError = Error.is(errorMessage);

                      const messageError = Error.getMessage(errorMessage);

                      return (
                        <Form.Group>
                          <Form.Label>Country</Form.Label>
                          <CountrySelect
                            data={countryOptions}
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            placeholder='Enter country'
                            isError={isError}
                          />
                          <Form.Error>{messageError}</Form.Error>
                        </Form.Group>
                      );
                    }}
                  </Field>
                  <Field<string>
                    name='initials'
                    formatOnBlur
                    format={formatValue}
                  >
                    {({
                      input: { value, onChange, onFocus, onBlur, name },
                      meta: {
                        submitFailed,
                        error,
                        dirty,
                        touched,
                        dirtySinceLastSubmit,
                        submitError,
                        active,
                        ...meta
                      },
                    }) => {
                      // const errorMessage =
                      //   (!active && touched && error) ||
                      //   (!dirtySinceLastSubmit && submitError);

                      // const isError = Error.is(errorMessage);
                      // const isDone = !isError && !active && !!value;
                      // const messageError = Error.getMessage(errorMessage);

                      return (
                        <Form.Group>
                          <Form.Label>Name and Surname</Form.Label>
                          <Input
                            type='text'
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            name={name}
                            placeholder='Enter name and surname'
                            // isError={isError}
                            // isDone={isDone}
                          />
                          <Form.Error></Form.Error>
                        </Form.Group>
                      );
                    }}
                  </Field>
                  <Field<string>
                    name='facebookLink'
                    // validate={validateFacebook}
                    // formatOnBlur
                    format={formatLinkValue}
                  >
                    {({
                      input: { value, onChange, onFocus, onBlur, name },
                      meta,
                    }) => {
                      // console.log('meta', meta);
                      const {
                        submitFailed,
                        submitSucceeded,
                        error,
                        dirty,
                        touched,
                        dirtySinceLastSubmit,
                        submitError,
                        active,
                      } = meta;
                      // const errorMessage =
                      //   (!active && touched && error) ||
                      //   (!dirtySinceLastSubmit && submitError);

                      // const isError = Error.is(errorMessage);
                      // const isDone = !isError && !active && !!value;
                      // const messageError = Error.getMessage(errorMessage);
                      // console.log('subm');
                      const messageWarn = !active && validateFacebook(value);
                      const isWarn = !!messageWarn;
                      const isDone = !active && !isWarn && !!value;

                      return (
                        <Form.Group>
                          <Form.Label>Facebook</Form.Label>
                          <Input
                            type='url'
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            name={name}
                            placeholder='Enter link'
                            // isError={isError}
                            isWarn={isWarn}
                            isDone={isDone}
                          />
                          <Form.Error type='warn'>{messageWarn}</Form.Error>
                        </Form.Group>
                      );
                    }}
                  </Field>
                  <Field<string>
                    name='vkontakteLink'
                    // validate={validateVkontakte}
                    // formatOnBlur
                    format={formatLinkValue}
                  >
                    {({
                      input: { value, onChange, onFocus, onBlur, name },
                      meta: {
                        submitFailed,
                        error,
                        dirty,
                        touched,
                        dirtySinceLastSubmit,
                        submitError,
                        submitSucceeded,
                        active,
                        ...meta
                      },
                    }) => {
                      // const errorMessage =
                      //   (!active && touched && error) ||
                      //   (!dirtySinceLastSubmit && submitError);

                      // const isError = Error.is(errorMessage);
                      // const isDone = !isError && !active && !!value;
                      // const messageError = Error.getMessage(errorMessage);

                      const messageWarn = !active && validateVkontakte(value);
                      const isWarn = !!messageWarn;
                      const isDone = !active && !isWarn && !!value;

                      return (
                        <Form.Group>
                          <Form.Label>Vkontakte</Form.Label>
                          <Input
                            type='url'
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            name={name}
                            placeholder='Enter link'
                            // isError={isError}
                            isWarn={isWarn}
                            isDone={isDone}
                          />
                          <Form.Error type='warn'>{messageWarn}</Form.Error>
                        </Form.Group>
                      );
                    }}
                  </Field>

                  <Field<string>
                    name='linkedinLink'
                    // validate={validateLinkedIn}
                    // formatOnBlur
                    // format={formatValue}
                    format={formatLinkValue}
                  >
                    {({
                      input: { value, onChange, onFocus, onBlur, name },
                      meta: {
                        submitFailed,
                        error,
                        dirty,
                        touched,
                        dirtySinceLastSubmit,
                        submitError,
                        submitSucceeded,
                        active,
                        ...meta
                      },
                    }) => {
                      // const errorMessage =
                      //   (!active && touched && error) ||
                      //   (!dirtySinceLastSubmit && submitError);

                      // const isError = Error.is(errorMessage);
                      // const isDone = !isError && !active && !!value;
                      // const messageError = Error.getMessage(errorMessage);

                      const messageWarn = !active && validateLinkedIn(value);
                      const isWarn = !!messageWarn;
                      const isDone = !active && !isWarn && !!value;

                      return (
                        <Form.Group>
                          <Form.Label>LinkedIn</Form.Label>
                          <Input
                            type='url'
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            name={name}
                            // isError={isError}
                            isWarn={isWarn}
                            isDone={isDone}
                            placeholder='Enter link'
                          />
                          <Form.Error type='warn'>{messageWarn}</Form.Error>
                        </Form.Group>
                      );
                    }}
                  </Field>
                  <Field<string>
                    name='instagramLink'
                    // validate={validateInstagram}
                    parse={formatInstagramValue}
                  >
                    {({
                      input: { value, onChange, onFocus, onBlur, name },
                      meta: {
                        submitFailed,
                        error,
                        dirty,
                        touched,
                        dirtySinceLastSubmit,
                        submitError,
                        submitSucceeded,
                        active,
                        ...meta
                      },
                    }) => {
                      // const errorMessage =
                      //   (!active && touched && error) ||
                      //   (!dirtySinceLastSubmit && submitError);

                      // const isError = Error.is(errorMessage);

                      // const isDone = !isError && !active && !!value;
                      // const messageError = Error.getMessage(errorMessage);

                      const messageWarn = !active && validateInstagram(value);
                      const isWarn = !!messageWarn;
                      const isDone = !active && !isWarn && !!value;

                      return (
                        <Form.Group>
                          <Form.Label>Instagram</Form.Label>
                          <Input
                            type='text'
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            name={name}
                            placeholder='Enter nickname'
                            // isError={isError}
                            isWarn={isWarn}
                            isDone={isDone}
                          />
                          <Form.Error type='warn'>{messageWarn}</Form.Error>
                        </Form.Group>
                      );
                    }}
                  </Field>
                  <Field<string>
                    name='telegramLink'
                    // validate={validateTelegramOrInstagram}
                    parse={formatTelegramValue}
                  >
                    {({
                      input: { value, onChange, onBlur, onFocus, name },
                      meta: {
                        submitFailed,
                        error,
                        dirty,
                        touched,
                        dirtySinceLastSubmit,
                        submitError,
                        submitSucceeded,
                        active,
                        ...meta
                      },
                    }) => {
                      const messageWarn = !active && validateTelegram(value);
                      const isWarn = !!messageWarn;
                      const isDone =
                        !active && !isWarn && !!value && value.length > 1;

                      // const errorMessage =
                      //   (!active && touched && error) ||
                      //   (!dirtySinceLastSubmit && submitError);

                      // const isError = Error.is(errorMessage);
                      // const isDone = !isError && !active && !!value;
                      // const messageError = Error.getMessage(errorMessage);

                      return (
                        <Form.Group>
                          <Form.Label>Telegram</Form.Label>
                          <Input
                            type='text'
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            name={name}
                            placeholder='Enter nickname'
                            // isError={isError}
                            isWarn={isWarn}
                            isDone={isDone}
                          />
                          <Form.Error type='warn'>{messageWarn}</Form.Error>
                        </Form.Group>
                      );
                    }}
                  </Field>
                </div>
              </Scrollbars>
            </div>
            <TrueCallerDataConsumer>
              {({ isLoading }) => {
                return (
                  <FormSpy
                    subscription={{ submitting: true, validating: true }}
                    render={({ submitting, validating }) => {
                      return (
                        <Button
                          type='submit'
                          variant='primary'
                          disabled={submitting || validating}
                          className='step-1'
                        >
                          SEARCH
                        </Button>
                      );
                    }}
                  />
                );
              }}
            </TrueCallerDataConsumer>
          </StyledSearchForm>
        );
      }}
    />
  );
}
