import * as React from 'react';
import { styled } from '@styles/theming';
import { CSSTransition } from 'react-transition-group';

const StyledCheckbox = styled('div')`
  position: relative;
  text-align: left;
  width: fit-content;

  .md-checkbox-inline {
    display: inline-block;
  }
  label {
    cursor: pointer;
    display: inline;
    line-height: 1.25em;
    vertical-align: top;
    clear: both;
    padding-left: 1px;
    position: absolute;
    left: 0;
  }
  .shadow {
    position: absolute;
    left: 0;
    top: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    transform: translate(-15px, -15px);
    visibility: hidden;
    background: ${(p) => p.theme.colors.black_1};
  }

  label:not(:empty) {
    padding-left: 0.75em;
  }
  label:before,
  label:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  label:before {
    width: 18px;
    height: 18px;
    background: ${(p) => p.theme.colors.white_1};
    border: 2px solid ${(p) => p.theme.colors.black_1};
    opacity: 0.54;
    border-radius: 0.125em;
    cursor: pointer;
    transition: background 0.3s;
  }
  input[type='checkbox'] {
    outline: 0;
    visibility: hidden;
    width: 18px;
    margin: 0;
    display: block;
    float: left;
    font-size: inherit;
  }
  input[type='checkbox']:checked + label:before {
    background: ${(p) => p.theme.colors.blue_1};
    opacity: 1;
    border: none;
  }
  input[type='checkbox'] + label .shadow {
    visibility: hidden;
    opacity: 0.1;
    transition: background-color 0.3s, opacity 0.3s;
  }
  input[type='checkbox']:not(:disabled) + label:hover {
    .shadow {
      visibility: visible;
      background: ${(p) => p.theme.colors.blue_1};
      opacity: 0.1;
    }
  }

  input[type='checkbox']:checked + label:after {
    transform: translate(0.2em, 0.25em) rotate(-45deg);
    width: 0.75em;
    height: 0.375em;
    border: 0.125em solid ${(p) => p.theme.colors.white_1};
    border-top-style: none;
    border-right-style: none;
  }
  input[type='checkbox']:disabled + label:before {
    border-color: ${(p) => p.theme.colors.gray_1};
  }
  input[type='checkbox']:disabled:checked + label:before {
    background: ${(p) => p.theme.colors.gray_1};
  }
  .ripple-wrapper {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${(p) => p.theme.colors.black_1};
  }
  .ripple-enter {
    transform: scale(0);
  }
  .ripple-enter-active {
    transform: scale(1);
    transition: transform 0.5s;
  }
  .ripple-exit {
    transform: scale(0);
  }
  .ripple-exit-active {
    transform: scale(0);
    transition: transform 0.5s;
  }
`;

export type CheckboxProps = {
  onChange?: (e) => void;
  isChecked?: boolean;
  disabled?: boolean;
  id: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  id = '12',
  onChange = () => {},
  disabled = false,
}) => {
  const [doRipple, toggleRipple] = React.useState(false);
  return (
    <StyledCheckbox>
      <input
        type='checkbox'
        id={id}
        onChange={onChange}
        checked={isChecked}
        disabled={disabled}
        onClick={() => toggleRipple(!doRipple)}
      />
      <label htmlFor={id}>
        <span className='shadow'>
          <CSSTransition
            in={doRipple}
            timeout={500}
            onEntered={() => {
              toggleRipple(!doRipple);
            }}
            classNames='ripple'
            unmountOnExit
          >
            <span className='ripple-wrapper' />
          </CSSTransition>
        </span>
      </label>
    </StyledCheckbox>
  );
};
