import * as React from 'react';
import { styled, cn } from '@styles/theming';
import { CSSTransition } from 'react-transition-group';

export type TooltipWrapperProps = {
  show: boolean;
  title?: string;
  description?: string;
  direction?: string;
  className?: string;
};

const StyledTooltipTransition = styled('div')`
  .alert-up-enter {
    opacity: 0;
    transform: translateY(-150%);
  }
  .alert-up-enter-active {
    opacity: 1;
    transform: translate(0, -125%);
    transition: opacity ${(p) => p.theme.transitions[1]},
      transform ${(p) => p.theme.transitions[0]};
  }
  .alert-up-exit {
    opacity: 1;
  }
  .alert-up-exit-active {
    opacity: 0;
    transition: opacity ${(p) => p.theme.transitions[0]};
  }
  .alert-left-enter {
    opacity: 0;
    transform: translateY(-150%);
  }
  .alert-left-enter-active {
    opacity: 1;
    transform: translate(0, -125%);
    transition: opacity ${(p) => p.theme.transitions[1]},
      transform ${(p) => p.theme.transitions[0]};
  }
  .alert-left-exit {
    opacity: 1;
  }
  .alert-left-exit-active {
    opacity: 0;
    transition: opacity ${(p) => p.theme.transitions[0]};
  }
  .alert-right-enter {
    opacity: 0;
    transform: translateY(-150%);
  }
  .alert-right-enter-active {
    opacity: 1;
    transform: translate(0, -125%);
    transition: opacity ${(p) => p.theme.transitions[1]},
      transform ${(p) => p.theme.transitions[0]};
  }
  .alert-right-exit {
    opacity: 1;
  }
  .alert-right-exit-active {
    opacity: 0;
    transition: opacity ${(p) => p.theme.transitions[0]};
  }
  .alert-down-enter {
    opacity: 0;
    transform: translateY(100%);
  }
  .alert-down-enter-active {
    opacity: 1;
    transform: translate(0, 50%);
    transition: opacity ${(p) => p.theme.transitions[1]},
      transform ${(p) => p.theme.transitions[0]};
  }
  .alert-down-exit {
    opacity: 1;
  }
  .alert-down-exit-active {
    opacity: 0;
    transition: opacity ${(p) => p.theme.transitions[0]};
  }
`;

const StyledTooltipWrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 50%;
  width: 590px;
  margin-left: -295px;
  background: ${(p) => p.theme.colors.white_1};
  box-shadow: ${(p) => p.theme.shadows[3]};
  border-radius: ${(p) => p.theme.radii[2]}px;
  transform: translate(0, -125%);

  .content-up {
    text-align: left !important;
    position: relative;
    padding: 16px;
    font-size: ${(p) => p.theme.fontSizes[0]}px;
    line-height: 160%;
    color: ${(p) => p.theme.colors.gray_1};

    h3 {
      margin-bottom: 10px;
      font-size: ${(p) => p.theme.fontSizes[0]}px;
      line-height: 140%;
      color: ${(p) => p.theme.colors.black_1};
    }
    &::after {
      content: '';
      position: absolute;
      transform: translateY(100%);
      left: 50%;
      z-index: 1;
      margin-left: -17px;
      border-width: 17px;
      border-style: solid;
      border-color: ${(p) => p.theme.colors.white_1} transparent transparent
        transparent;
    }
  }
  .content-down {
    text-align: left !important;
    position: relative;
    padding: 16px;
    font-size: ${(p) => p.theme.fontSizes[0]}px;
    line-height: 160%;
    color: ${(p) => p.theme.colors.gray_1};

    h3 {
      margin-bottom: 10px;
      font-size: ${(p) => p.theme.fontSizes[0]}px;
      line-height: 140%;
      color: ${(p) => p.theme.colors.black_1};
    }
    &::after {
      content: '';
      position: absolute;
      transform: translateY(-360%) rotate(180deg);
      left: 50%;
      z-index: 1;
      margin-left: -17px;
      border-width: 17px;
      border-style: solid;
      border-color: ${(p) => p.theme.colors.white_1} transparent transparent
        transparent;
    }
  }
  .content-left {
    text-align: left !important;
    position: relative;
    padding: 16px;
    font-size: ${(p) => p.theme.fontSizes[0]}px;
    line-height: 160%;
    color: ${(p) => p.theme.colors.gray_1};

    h3 {
      margin-bottom: 10px;
      font-size: ${(p) => p.theme.fontSizes[0]}px;
      line-height: 140%;
      color: ${(p) => p.theme.colors.black_1};
    }
    &::after {
      content: '';
      position: absolute;
      transform: translateY(100%);
      left: 50%;
      z-index: 1;
      margin-left: -17px;
      border-width: 17px;
      border-style: solid;
      border-color: ${(p) => p.theme.colors.white_1} transparent transparent
        transparent;
    }
  }
  .content-right {
    text-align: left !important;
    position: relative;
    padding: 16px;
    font-size: ${(p) => p.theme.fontSizes[0]}px;
    line-height: 160%;
    color: ${(p) => p.theme.colors.gray_1};

    h3 {
      margin-bottom: 10px;
      font-size: ${(p) => p.theme.fontSizes[0]}px;
      line-height: 140%;
      color: ${(p) => p.theme.colors.black_1};
    }
    &::after {
      content: '';
      position: absolute;
      transform: translateY(-50%) rotate(90deg);
      left: -17px;
      top: 50%;
      z-index: 1;
      margin-left: -17px;
      border-width: 17px;
      border-style: solid;
      border-color: ${(p) => p.theme.colors.white_1} transparent transparent
        transparent;
    }
  }
`;

export const Tooltip: React.FC<TooltipWrapperProps> = ({
  show,
  title,
  description,
  direction = 'up',
  className = '',
}) => {
  const alert = cn({ [`alert-${direction}`]: direction });
  const content = cn({ [`content-${direction}`]: direction });
  return (
    <StyledTooltipTransition>
      <CSSTransition in={show} timeout={300} classNames={alert} unmountOnExit>
        <StyledTooltipWrapper className={cn(`tooltip`, className)}>
          <div className={content}>
            {title ? <h3>{title}</h3> : null}
            {description}
          </div>
        </StyledTooltipWrapper>
      </CSSTransition>
    </StyledTooltipTransition>
  );
};
