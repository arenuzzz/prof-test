import * as React from 'react';
import Downshift from 'downshift';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, boolean, text } from '@storybook/addon-knobs';

// import { Form, Field } from 'react-final-form';

import { Select, SelectProps } from './select.component';

export const selectProps: SelectProps<{}> = {
  name: 'name',
  defaultValue: 'a',
  isAutocomplete: true,
  placeholder: 'Enter name',
  data: [
    { value: 'a', label: 'Apple', data: {} },
    { value: 'b', label: 'Banana', data: {} },
    { value: 'c', label: 'Cherry', data: {} },
    { value: 'd', label: 'Grape', data: {} },
    { value: 'e', label: 'Kiwi', data: {} },
    { value: 'f', label: 'Orange', data: {} },
    { value: 'g', label: 'Peach', data: {} },
    { value: 'h', label: 'Pear', data: {} },
    { value: 'k', label: 'Pineapple', data: {} },
    { value: 'l', label: 'Strawberry', data: {} },
    { value: 'o', label: 'Watermelon', data: {} },
  ],
};

export const actions = {
  onClick: action('onClick'),
  onSubmit: action('onSubmit'),
};

storiesOf('Design System|Atoms/Select', module).add('primary', () => {
  const [value, onChange] = React.useState(selectProps.defaultValue);

  const placeholder = text('placeholder', selectProps.placeholder as string);
  const defaultValue = text('defaultValue', selectProps.defaultValue as string);
  const name = text('name', selectProps.name || '');
  const isError = boolean('isError', false);
  const isAutocomplete = boolean(
    'isAutocomplete',
    selectProps.isAutocomplete as boolean
  );
  const data = object('data', selectProps.data);

  const inputRenderer = ({ value, ...props }) => {
    return (
      <input
        {...props}
        value={value}
        type='text'
        placeholder='Enter'
        style={{
          width: 'calc(100% - 20px)',
          height: '100%',
          border: 'none',
        }}
      />
    );
  };

  function stateReducer(state, changes) {
    switch (changes.type) {
      case Downshift.stateChangeTypes.controlledPropUpdatedSelectedItem: {
        if (changes.inputValue) {
          const dataItem = data.find(
            (item) => item.value === state.selectedItem
          );

          if (dataItem) {
            return {
              ...changes,
              inputValue: dataItem.label,
            };
          }
        }

        return changes;
      }
      default: {
        return changes;
      }
    }
  }

  return (
    <div style={{ width: 300 }}>
      <Select
        stateReducer={stateReducer}
        data={data}
        value={value}
        defaultValue={defaultValue}
        isError={isError}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        isAutocomplete={isAutocomplete}
        inputRenderer={inputRenderer}
        sortByKey='label'
      />
    </div>
  );
});
