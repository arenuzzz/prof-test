import * as React from 'react';
import {
  styled,
  buttonStyle,
  buttonSize,
  Theme,
  layout,
} from '@styles/theming';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning';

export type ButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
  variant?: keyof Theme['buttons'];
  disabled?: boolean;
  as?: 'button';
  type?: 'button' | 'submit';
  size?: keyof Theme['buttonSizes'];
};

const StyledButton = styled('button')<ButtonProps>`
  position: relative;

  outline: none;
  border: none;
  cursor: pointer;

  font-weight: 400;
  font-style: normal;
  line-height: 140%;
  opacity: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  transition-timing-function: ease;
  transition-duration: ${(p) => p.theme.transitionDurations[0]};
  transition-property: opacity, box-shadow, background-color, color;

  &:not(:disabled) {
    &:hover,
    &:active {
      opacity: 0.8;
    }
  }

  ${buttonStyle};
  ${buttonSize};
`;

StyledButton.defaultProps = {
  variant: 'default',
  size: 'default',
  type: 'button',
  onClick: () => {},
};

export const Button = StyledButton;

export default Button;
