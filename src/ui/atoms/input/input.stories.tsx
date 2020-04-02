import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';

import { Input, InputProps } from './input.component';

export const inputProps = {
  value: '',
  defaultValue: 'Default',
  placeholder: 'Placeholder',
  disabled: false,
  readOnly: false,
  isError: false,
  isShowStatus: false,
};

export const actions = {
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
};

storiesOf('Design System|Atoms/Input', module).add('default', () => {
  const defaultValue = text('defaultValue', inputProps.defaultValue);
  const value = text('value', inputProps.value);
  const placeholder = text('placeholder', inputProps.placeholder);
  const disabled = boolean('disabled', inputProps.disabled);
  const readOnly = boolean('readOnly', inputProps.readOnly);
  const isError = boolean('isError', inputProps.isError);
  const isShowStatus = boolean('isShowStatus', inputProps.isShowStatus);

  return (
    <div style={{ width: '300px' }}>
      <Input
        onFocus={actions.onFocus}
        onBlur={actions.onBlur}
        onChange={actions.onChange}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        isError={isError}
        isShowStatus={isShowStatus}
      />
    </div>
  );
});
