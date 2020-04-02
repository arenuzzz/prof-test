import * as React from 'react';
import { styled } from '@styles/theming';
import './assets/flags.css';

import { Select, SelectProps } from '@ui/atoms/select';
import Downshift from 'downshift';

export type CountrySelectProps = SelectProps;

const StyledLabel = styled('div')`
  display: flex;
  align-items: center;

  .flag {
    margin-right: 14px;
    width: 26px;
    height: 18px;
  }
`;

export const CountrySelect: React.FC<CountrySelectProps> = (props) => {
  const renderLabelWithFlag = ({ label, value, code }) => {
    return (
      <StyledLabel>
        {value && <span className={`flag flag-${code}`} />}
        {label}
      </StyledLabel>
    );
  };

  const inputRenderer = ({ value, ...props }) => {
    return (
      <input
        {...props}
        value={value}
        type='text'
        placeholder='Enter country'
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
          const dataItem = props.data.find(
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
    <Select
      {...props}
      // stateReducer={stateReducer}
      // sortByKey='label'
      isAutocomplete={true}
      itemRenderer={renderLabelWithFlag}
      labelRenderer={renderLabelWithFlag}
      inputRenderer={inputRenderer}
    />
  );
};
