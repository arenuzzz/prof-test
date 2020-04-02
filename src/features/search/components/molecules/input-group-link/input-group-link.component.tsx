import React from 'react';
import { styled, cn } from '@styles/theming';
import { Input } from '@ui/atoms/input';

import {
  InputFileLinkProps,
  InputFileLink,
  InputFileValue,
} from '../../atoms/input-file-link';

export type InputGroupLinkValue = InputFileValue & {
  link: string;
  lastChanged: string;
};

export type InputGroupLinkProps = InputFileLinkProps & {
  onChange: (value: InputGroupLinkValue) => void;
  value: InputGroupLinkValue;
  isWarn?: boolean;
  isDone?: boolean;
  className?: string;
};

const StyledGroupLinkWrapper = styled('div')`
  display: flex;

  .input-text {
    input {
      border-radius: 4px 0 0 4px;
    }
  }

  .input-file {
    .btn-upload {
      border-left: none;
      border-radius: 0 4px 4px 0;
    }
  }
`;

export function InputGroupLink({
  value: currentValue = {
    fileName: '',
    data: [],
    error: '',
    isReading: false,
    link: '',
  },
  onChange,
  onFocus,
  onBlur,
  filterArray = () => true,
  isWarn = false,
  isDone = false,
  maxReadingSize,
  placeholder,
  className,
}: InputGroupLinkProps) {
  function onChangeFileLink(value) {
    onChange({
      ...value,
      link: currentValue.link,
      lastChanged: 'file',
    });
  }

  function onChangeInputValue({ currentTarget: { value } }) {
    onChange({
      ...currentValue,
      link: value,
      lastChanged: 'text',
    });
  }

  return (
    <StyledGroupLinkWrapper className={cn('input-group-link', className)}>
      <Input
        className='input-text'
        placeholder={placeholder}
        value={currentValue.link}
        onChange={onChangeInputValue}
        onFocus={onFocus}
        onBlur={onBlur}
        isWarn={isWarn}
        isDone={isDone}
      />
      <InputFileLink
        className='input-file'
        filterArray={filterArray}
        value={currentValue}
        onChange={onChangeFileLink}
        maxReadingSize={maxReadingSize}
      />
    </StyledGroupLinkWrapper>
  );
}
