import * as React from 'react';
import {
  formatIncompletePhoneNumber,
  parsePhoneNumberFromString,
  CountryCode,
} from 'libphonenumber-js/max';
import { Select, SelectProps, SelectItem } from '@ui/atoms/select';
import { formatPhoneInputValue } from '@lib/format';
import { styled, cn } from '@styles/theming';
import { Input } from '@ui/atoms/input';
import Downshift from 'downshift';

export type PhoneNumberSelectData = Array<
  SelectItem<{ countryName: string; code: string }>
>;
export type PhoneNumberSelectValue = {
  number: string;
  code: string;
  phoneCode?: string;
  phoneNumber?: string;
  countryCode?: string;
};

export type PhoneNumberSelectProps = {
  selectPlaceholder?: string;
  inputPlaceholder?: string;
  data: PhoneNumberSelectData;
  value?: PhoneNumberSelectValue;
  active?: boolean;
  onChange?: (p: PhoneNumberSelectValue) => void;
  onChangeCountry?: (p: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isError?: SelectProps['isError'];
  isWarn?: boolean;
  isDone?: boolean;
};

const StyledLabel = styled('div')`
  display: flex;

  .code {
    margin-right: 14px;
    width: 46px;
    height: 18px;
  }
`;

const StyledPhoneNumberGroup = styled('div')`
  display: flex;
  position: relative;

  width: 100%;

  border: 1px solid ${(p) => p.theme.colors.gray_2};
  border-radius: 4px;
  transition: border-color ${(p) => p.theme.transitions[0]};

  &.is-error {
    border-color: ${(p) => p.theme.colors.red_1};
  }

  .s-wrapper {
    width: 105px;
    position: inherit;
  }

  .s-button,
  .input-phone input {
    border: none;
  }

  .s-button-label {
    /* width: 105px; */
  }

  .s-button {
    display: flex;
    width: 105px;
    border-right: 1px solid ${(p) => p.theme.colors.gray_2};
    border-radius: 4px 0 0 4px;
  }

  .s-list {
    width: 300px;
  }

  /* .input-phone {
    width: calc(100% - 25px);
    height: auto;

    input {
      padding: 0;
    }
  } */
`;

export const PhoneNumberSelect: React.FC<PhoneNumberSelectProps> = ({
  isError,
  isWarn = false,
  selectPlaceholder = '',
  inputPlaceholder = '',
  onChange = () => {},
  onChangeCountry = () => {},
  onFocus = () => {},
  onBlur = () => {},
  value: currentValue = {
    code: '',
    number: '',
    phoneCode: '',
    phoneNumber: '',
  },
  active = false,
  data,
  isDone = false,
}) => {
  const formatInputValue = (value) => value.toString().split('/')[0];
  // const renderItemWithCountry = ({ label, data: { countryName } }) => {
  //   return (
  //     <StyledLabel>
  //       <div className='code'>{label}</div>
  //       {countryName}
  //     </StyledLabel>
  //   );
  // };

  // const renderLabel = ({ value, label }) => {
  //   return (
  //     <StyledLabel>
  //       {value ? label : <div className='placeholder'>{label}</div>}
  //     </StyledLabel>
  //   );
  // };

  function formatNumberValue(phoneCode, number, countryCode = '') {
    if (!countryCode) {
      return number;
    }

    const phoneNumber = `${phoneCode}${number}`;

    const couuntryCodeUppercased = countryCode.toUpperCase() as CountryCode;

    const parsedPhoneNumber = parsePhoneNumberFromString(
      phoneNumber,
      couuntryCodeUppercased
    );

    const newPhoneNumber = parsedPhoneNumber
      ? parsedPhoneNumber.number.toString()
      : phoneNumber;

    const newNumber = formatIncompletePhoneNumber(
      newPhoneNumber,
      couuntryCodeUppercased
    ).split(phoneCode);

    // console.log('phoneCode', phoneCode);
    // console.log('countryCode', countryCode);
    // console.log('number', number);
    // console.log('newnumber', newNumber);

    return newNumber[1] ? newNumber[1].trim() : number;
  }

  function handleInputChange({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) {
    const number = value.replace(/^\s+|\s+$|.\s{2,}.|[^0-9]/gm, '');

    if (number.length > 12) {
      return currentValue;
    }

    if (currentValue.number !== number) {
      const phoneCode = currentValue.phoneCode || '';
      const phoneNumber = `${phoneCode}${number}`;

      onChange({
        ...currentValue,
        number: formatNumberValue(
          phoneCode,
          number,
          currentValue.countryCode ? currentValue.countryCode.toUpperCase() : ''
        ),
        phoneNumber,
      });
    }
  }

  function handleSelectChange(value: string) {
    if (currentValue.code !== value) {
      const phoneItem = data.find((option) => option.value === value);
      const phoneCode = phoneItem ? phoneItem.label : '';
      const phoneNumber = `${phoneCode}${currentValue.number}`;
      const countryCode =
        (phoneItem && phoneItem.data && phoneItem.data.code) || '';

      onChange({
        ...currentValue,
        number: formatNumberValue(
          phoneCode,
          currentValue.number,
          countryCode.toUpperCase()
        ),
        code: value,
        phoneCode,
        phoneNumber,
        countryCode,
      });

      if (countryCode) {
        onChangeCountry(countryCode);
      }
    }
  }

  function stateReducer(state, changes) {
    // console.log('State', state);
    // console.log('Changes', changes);

    switch (changes.type) {
      case Downshift.stateChangeTypes.changeInput: {
        const inputValue = formatPhoneInputValue(changes.inputValue).slice(
          0,
          5
        );

        return {
          ...changes,
          inputValue,
        };
      }
      default: {
        return {
          ...changes,
        };
      }
    }
  }

  return (
    <StyledPhoneNumberGroup className={cn(isError && 'is-error')}>
      <Select<{ countryName: string }>
        stateReducer={stateReducer}
        data={data}
        isAutocomplete
        onChange={handleSelectChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={selectPlaceholder}
        isError={isError}
        value={currentValue.code || ''}
        itemRenderer={({ label, data: { countryName } = {} }) => {
          return (
            <StyledLabel>
              <div className='code'>{label}</div>
              {countryName}
            </StyledLabel>
          );
        }}
        inputRenderer={({ value, ...props }) => {
          return (
            <input
              {...props}
              value={formatPhoneInputValue(value)}
              type='text'
              placeholder='+'
              style={{
                width: 'calc(100% - 20px)',
                height: '100%',
                border: 'none',
              }}
            />
          );
        }}
      />
      <Input
        type='tel'
        className='input-phone'
        placeholder={inputPlaceholder}
        onChange={handleInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={currentValue.number || ''}
        isError={isError}
        isWarn={isWarn}
        isDone={isDone}
      />
    </StyledPhoneNumberGroup>
  );
};
