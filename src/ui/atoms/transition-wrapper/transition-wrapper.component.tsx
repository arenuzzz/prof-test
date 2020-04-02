import * as React from 'react';
import { styled } from '@styles/theming';
import { CSSTransition } from 'react-transition-group';

export type TransitionWrapperProps = {
  show: boolean;
  children: React.ReactNode;
};

const StyledTransitionWrapper = styled('div')`
  .alert-enter {
    opacity: 0;
  }
  .alert-enter-active {
    opacity: 0.9;
    transition: opacity ${(p) => p.theme.transitions[1]};
  }
  .alert-exit {
    opacity: 0.9;
  }
  .alert-exit-active {
    opacity: 0;
    transition: opacity ${(p) => p.theme.transitions[1]};
  }
`;

export const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  show,
  children,
}) => {
  return (
    <StyledTransitionWrapper>
      <CSSTransition in={show} timeout={500} classNames='alert' unmountOnExit>
        {children}
      </CSSTransition>
    </StyledTransitionWrapper>
  );
};
