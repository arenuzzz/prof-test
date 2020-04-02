import * as React from 'react';
import { styled, css, cn } from '@styles/theming';
import { Icon } from '@ui/quarks/icon';

type Status = 'done' | 'error' | 'warn' | null;

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  id?: string;
  isError?: boolean;
  isDone?: boolean;
  isWarn?: boolean;
  defaultValue?: string | number;
  isShowStatus?: boolean;
  validating?: boolean;
};

type StyledInputProps = Omit<InputProps & { status: Status }, 'className'>;

const StyledInput = styled('input')<StyledInputProps>`
  width: 100%;
  background: ${(p) => p.theme.colors.white_1};
  border: 1px solid ${(p) => p.theme.colors.gray_2};
  border-radius: 4px;
  padding: 10px 14px;
  outline: none;

  transition-duration: ${(p) => p.theme.transitionDurations[0]};
  transition-timing-function: ease;
  transition: border-color, opacity, background-color;

  &::placeholder {
    opacity: 0.8;
  }

  &:focus {
    border-color: ${(p) => p.theme.colors.blue_1};
  }

  ${(p) =>
    !!p.status &&
    css`
      padding-right: 35px;
    `}

  ${(p) =>
    p.isError &&
    css`
      border-color: ${p.theme.colors.red_1} !important;
    `}

    ${(p) =>
      p.isWarn &&
      css`
        border-color: ${p.theme.colors.orange_1} !important;
      `}

  ${(p) =>
    p.disabled &&
    css`
      cursor: not-allowed;
      background-color: ${p.theme.colors.gray_2};
    `}
`;

const StyledInputWrapper = styled('div')`
  position: relative;
  overflow: hidden;
  height: 40px;
  width: 100%;

  display: flex;
`;

const StyledInputStatus = styled('div')`
  position: absolute;
  top: 50%;
  right: 5px;

  transform: translateY(-50%);

  width: 30px;
  height: 30px;

  svg {
    width: 100%;
    height: auto;
  }

  &.warn {
    right: 8px;
    width: 20px;
    height: 20px;
  }
`;

const StatusIcon = styled<any, { status: Status }>(Icon)`
  ${(p) =>
    p.status === 'done' &&
    css`
      stroke: ${p.theme.colors.green_1};
    `}

  ${(p) =>
    p.status === 'error' &&
    css`
      fill: ${p.theme.colors.red_1};
    `}

    ${(p) =>
      p.status === 'warn' &&
      css`
        fill: ${p.theme.colors.orange_1};
      `}
`;

const InputStatus: React.FC<{ status: Status }> = ({ status }) => {
  const variantByStatus =
    status === 'done'
      ? 'check'
      : status === 'error'
      ? 'close-full'
      : status === 'warn'
      ? 'alert'
      : '';

  return (
    <StyledInputStatus className={cn(status)}>
      <StatusIcon status={status} variant={variantByStatus} />
    </StyledInputStatus>
  );
};

function getInputStatus({
  disabled,
  readOnly,
  isError,
  isDone,
  isWarn,
  validating,
}) {
  if (disabled || readOnly) {
    return null;
  }

  if (isError) {
    return 'error';
  }

  if (isWarn) {
    return 'warn';
  }

  if (isDone) {
    return 'done';
  }

  if (validating) {
    return null;
  }

  // if (value) {
  //   return 'done';
  // }

  return null;
}

export const Input: React.FC<InputProps> = ({
  className,
  isError,
  isDone,
  isWarn,
  value,
  defaultValue = '',
  disabled,
  readOnly,
  isShowStatus = true,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  type = 'text',
  placeholder = '',
  validating = false,
  ...props
}) => {
  const status = isShowStatus
    ? getInputStatus({
        isError,
        isWarn,
        isDone,
        disabled,
        readOnly,
        validating,
      })
    : null;

  return (
    <StyledInputWrapper className={className}>
      <StyledInput
        {...props}
        type={type}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        isError={isError}
        isWarn={isWarn}
        value={value}
        status={status}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
      />
      {status && <InputStatus status={status} />}
    </StyledInputWrapper>
  );
};

export default Input;
