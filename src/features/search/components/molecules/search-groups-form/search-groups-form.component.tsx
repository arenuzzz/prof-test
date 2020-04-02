import React from 'react';
import {
  Form as FinalForm,
  Field,
  FormProps,
  FormSpy,
  useField,
} from 'react-final-form';
import { styled } from '@styles/theming';
import { Form } from '@ui/molecules/form';
import Scrollbars from 'react-custom-scrollbars';
import { Button } from '@ui/atoms/button';
import { Input } from '@ui/atoms/input';
import { formatValue } from '@lib/format';

import {
  filterWhatsappChatLink,
  filterViberChatLink,
  filterTelegramChatLink,
  validateTelegramChatLinks,
  validateWhatsappChatLinks,
  validateViberChatLinks,
} from '@lib/validation/search';

import { InputGroupLink } from '../input-group-link';
import { saveSearchGroupsFormValues } from '@features/search/model/groups-search-form';

export type FormValues = {};
export type SearchGroupsFormProps = FormProps<FormValues> & {
  initialValues: FormValues;
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

  button[type='submit'] {
    position: absolute;
    bottom: 14px;
    left: 28px;

    margin: 0;

    width: calc(100% - 56px);
  }
`;

function getPriorityMessage({ textMessage, fileMessage, lastChanged }) {
  if (lastChanged === 'file' && fileMessage) {
    return fileMessage;
  }

  if (lastChanged === 'text' && textMessage) {
    return textMessage;
  }

  return fileMessage || textMessage;
}

function AutoSave() {
  return (
    <FormSpy
      subscription={{ values: true }}
      onChange={(props) => {
        saveSearchGroupsFormValues(props.values);
      }}
    />
  );
}

export function SearchGroupsForm({
  onSubmit = () => {},
  initialValues = {},
}: SearchGroupsFormProps) {
  return (
    <FinalForm<FormValues>
      subscription={{}}
      validateOnBlur
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit }) => {
        return (
          <StyledSearchForm onSubmit={handleSubmit}>
            <AutoSave />
            <div className='form-content'>
              <Scrollbars autoHide autoHideDuration={300}>
                <div className='form-fields'>
                  <Field<string>
                    name='name'
                    formatOnBlur
                    format={(value) => {
                      return typeof value === 'string'
                        ? formatValue(value)
                        : value;
                    }}
                  >
                    {({
                      input: { value, onChange, onFocus, onBlur, name },
                    }) => {
                      return (
                        <Form.Group>
                          <Form.Label>Group name</Form.Label>
                          <Input
                            type='text'
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            name={name}
                            placeholder='Enter group name'
                          />
                          <Form.Error fixed></Form.Error>
                        </Form.Group>
                      );
                    }}
                  </Field>
                  <Field<string>
                    name='whatsappLinks'
                    formatOnBlur
                    format={(value) => {
                      if (typeof value === 'object') {
                        return {
                          ...value,
                          link: formatValue(value.link),
                        };
                      }

                      return value;
                    }}
                  >
                    {({
                      input: { value, onChange, onFocus, onBlur, name },
                      meta,
                    }) => {
                      let messageWarn = '';

                      if (value) {
                        const textMessage = validateWhatsappChatLinks(
                          value.link
                        );
                        const fileMessage = value.error;
                        const lastChanged = value.lastChanged;

                        messageWarn =
                          !meta.active &&
                          getPriorityMessage({
                            textMessage,
                            fileMessage,
                            lastChanged,
                          });
                      }

                      return (
                        <Form.Group>
                          <Form.Label>WhatsApp</Form.Label>
                          <InputGroupLink
                            className='whatsapp-file-tour'
                            filterArray={filterWhatsappChatLink}
                            maxReadingSize={5}
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            name={name}
                            placeholder='Enter link'
                          />
                          <Form.Error type='warn' fixed>
                            {messageWarn}
                          </Form.Error>
                        </Form.Group>
                      );
                    }}
                  </Field>
                  <Field<string>
                    name='viberLinks'
                    formatOnBlur
                    format={(value) => {
                      if (typeof value === 'object') {
                        return {
                          ...value,
                          link: formatValue(value.link),
                        };
                      }

                      return value;
                    }}
                  >
                    {({
                      input: { value, onChange, onFocus, onBlur, name },
                      meta,
                    }) => {
                      let messageWarn = '';

                      if (value) {
                        const textMessage = validateViberChatLinks(value.link);
                        const fileMessage = value.error;
                        const lastChanged = value.lastChanged;

                        messageWarn =
                          !meta.active &&
                          getPriorityMessage({
                            textMessage,
                            fileMessage,
                            lastChanged,
                          });
                      }

                      return (
                        <Form.Group>
                          <Form.Label>Viber</Form.Label>
                          <InputGroupLink
                            className='viber-file-tour'
                            filterArray={filterViberChatLink}
                            maxReadingSize={5}
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            name={name}
                            placeholder='Enter link'
                          />
                          <Form.Error type='warn' fixed>
                            {messageWarn}
                          </Form.Error>
                        </Form.Group>
                      );
                    }}
                  </Field>
                  <Field<string>
                    name='telegramLinks'
                    formatOnBlur
                    format={(value) => {
                      if (typeof value === 'object') {
                        return {
                          ...value,
                          link: formatValue(value.link),
                        };
                      }

                      return value;
                    }}
                  >
                    {({
                      input: { value, onChange, onFocus, onBlur, name },
                      meta,
                    }) => {
                      let messageWarn = '';

                      if (value) {
                        const textMessage = validateTelegramChatLinks(
                          value.link
                        );
                        const fileMessage = value.error;
                        const lastChanged = value.lastChanged;

                        messageWarn =
                          !meta.active &&
                          getPriorityMessage({
                            textMessage,
                            fileMessage,
                            lastChanged,
                          });
                      }
                      return (
                        <Form.Group>
                          <Form.Label>Telegram</Form.Label>
                          <InputGroupLink
                            className='telegram-file-tour'
                            filterArray={filterTelegramChatLink}
                            maxReadingSize={5}
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            name={name}
                            placeholder='Enter link'
                          />
                          <Form.Error type='warn' fixed>
                            {messageWarn}
                          </Form.Error>
                        </Form.Group>
                      );
                    }}
                  </Field>
                </div>
              </Scrollbars>
            </div>
            <FormSpy
              subscription={{ submitting: true, validating: true }}
              render={({ submitting, validating }) => {
                return (
                  <Button
                    type='submit'
                    variant='primary'
                    disabled={submitting || validating}
                  >
                    SEARCH
                  </Button>
                );
              }}
            />
          </StyledSearchForm>
        );
      }}
    />
  );
}
