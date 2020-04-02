import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { storiesOf } from '@storybook/react';
import { validateWhatsappChatLinks } from '@lib/validation/search';
import { Form } from '@ui/molecules/form';

import { InputGroupLink } from './input-group-link.component';

storiesOf('Features|Search/Molecules/InputGroupLink', module).add(
  'WhatsappInputGroupLink',
  () => {
    const linkTemplate = 'https://chat.whatsapp.com/';

    function onSubmit(values) {
      console.log('submit', values);
    }

    return (
      <div
        style={{
          position: 'relative',
          width: 300,
          margin: '100px 100px',
        }}
      >
        <FinalForm
          onSubmit={onSubmit}
          validateOnBlur
          validate={(values) => {
            // console.log('values', values);

            // const { whatsappLinks } = values;

            return undefined;
          }}
          initialValues={{
            whatsappLinks: {
              fileName: '',
              data: [],
              error: '',
              link: '',
              isReading: false,
              lastChanged: '',
            },
          }}
          render={({ form, validating, submitting, handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Field
                  name='whatsappLinks'
                  render={({ input, meta }) => {
                    // console.log('whatsappLinksValue', input.value);

                    function getPriorityMessage({
                      textMessage,
                      fileMessage,
                      lastChanged,
                    }) {
                      if (lastChanged === 'file' && fileMessage) {
                        return fileMessage;
                      }

                      if (lastChanged === 'text' && textMessage) {
                        return textMessage;
                      }

                      return fileMessage || textMessage;
                    }

                    const textMessage = validateWhatsappChatLinks(
                      input.value.link
                    );
                    const fileMessage = input.value.error;
                    const lastChanged = input.value.lastChanged;

                    const isLastChangedFile =
                      input.value.lastChanged === 'file';

                    const messageWarn =
                      (!meta.active || fileMessage) &&
                      getPriorityMessage({
                        textMessage,
                        fileMessage,
                        lastChanged,
                      });

                    // const isWarn = !isLastChangedFile && textMessage;

                    // const isDone =
                    //   !meta.active &&
                    //   meta.touched &&
                    //   !isWarn &&
                    //   input.value.link !== '';

                    return (
                      <Form.Group>
                        <Form.Label>Links</Form.Label>
                        <InputGroupLink
                          filterArray={(str) => str.startsWith(linkTemplate)}
                          onChange={input.onChange}
                          value={input.value}
                          onFocus={input.onFocus}
                          onBlur={input.onBlur}
                          maxReadingSize={5}
                          // isWarn={isWarn}
                          // isDone={isDone}
                        />
                        <Form.Error type='warn' fixed>
                          {messageWarn}
                        </Form.Error>
                      </Form.Group>
                    );
                  }}
                />
                <button type='submit' disabled={validating || submitting}>
                  Submit
                </button>
              </Form>
            );
          }}
        />
      </div>
    );
  }
);
