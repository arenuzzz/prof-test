import * as React from 'react';
import { cn, styled } from '@styles/theming';
import Tooltip from 'react-tooltip';

import { Icon } from '@ui/quarks/icon';

const StyledSwitcherMessage = styled('div')`
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-shadow: ${(p) => p.theme.shadows[2]};
  height: 40px;
  border-radius: ${(p) => p.theme.radii[2]};
  background-color: ${(p) => p.theme.colors.white_1};
  color: ${(p) => p.theme.colors.gray_1};
  border-radius: 4px;

  .counts {
    font-size: ${(p) => p.theme.fontSizes[0]};
    line-height: 160%;
    margin-right: 19px;
    cursor: default;
  }
  .arrow {
    cursor: pointer;

    svg {
      fill: ${(p) => p.theme.colors.gray_1};
      transition: fill ${(p) => p.theme.transitions[0]};
    }
    &:hover {
      svg {
        fill: ${(p) => p.theme.colors.blue_1};
      }
    }
    &:disabled {
      svg {
        fill: ${(p) => p.theme.colors.gray_2};
      }
      &:hover {
        svg {
          fill: ${(p) => p.theme.colors.gray_2};
        }
      }
      cursor: default;
    }
  }
  .chevron-up {
    transform: rotate(-90deg);
  }
  .chevron-down {
    transform: rotate(90deg);
  }
  .arrow-up {
    transform: rotate(180deg);
    margin-bottom: 3px;
  }

  .tooltip {
    max-width: 90px;
    padding: 8px;

    border-radius: 4px;

    display: flex;
    align-items: center;

    font-size: 12px;
    line-height: 15px;
    opacity: 1;

    background-color: ${(p) => p.theme.colors.black_1};
  }
`;

export type SwitcherMessageProps = {
  current: number;
  count: number;
  disabled?: boolean;
  className?: string;
  toNext?: () => void;
  toPrev?: () => void;
  toFirst?: () => void;
  toLast?: () => void;
};

export const SwitcherMessage: React.FC<SwitcherMessageProps> = ({
  current = 0,
  count = 0,
  disabled = false,
  toNext = () => {},
  toPrev = () => {},
  toFirst = () => {},
  toLast = () => {},
  className,
}) => {
  return (
    <StyledSwitcherMessage className={className}>
      <div className='counts'>
        {current}
        <span> / </span>
        {count}
      </div>
      <span
        data-tip
        data-tip-disable={current === count || disabled}
        data-for='to-last-tooltip'
      >
        <button
          className={cn('arrow', 'to-last')}
          type='button'
          onClick={toLast}
          disabled={current === count || disabled}
        >
          <Icon variant='arrow-down' />
        </button>
      </span>
      <span
        data-tip
        data-tip-disable={current === count || disabled}
        data-for='to-next-tooltip'
      >
        <button
          className={cn('arrow chevron-up')}
          type='button'
          onClick={toNext}
          disabled={current === count || disabled}
        >
          <Icon variant='chevron-left' />
        </button>
      </span>
      <span
        data-tip
        data-tip-disable={current === 1 || disabled}
        data-for='to-prev-tooltip'
      >
        <button
          className={cn('arrow chevron-down')}
          type='button'
          onClick={toPrev}
          disabled={current === 1 || disabled}
        >
          <Icon variant='chevron-left' />
        </button>
      </span>
      <span
        data-tip
        data-tip-disable={current === 1 || disabled}
        data-for='to-first-tooltip'
      >
        <button
          className={cn('arrow arrow-up', 'to-first')}
          type='button'
          onClick={toFirst}
          disabled={current === 1 || disabled}
        >
          <Icon variant='arrow-down' />
        </button>
      </span>
      <Tooltip
        id='to-first-tooltip'
        effect='solid'
        place='bottom'
        className={cn('tooltip', 'to-first-tooltip')}
        delayShow={500}
        delayHide={100}
      >
        Scroll to the oldest message
      </Tooltip>
      <Tooltip
        id='to-next-tooltip'
        effect='solid'
        place='bottom'
        className={cn('tooltip', 'to-next-tooltip')}
        delayShow={500}
        delayHide={100}
      >
        Scroll to next message
      </Tooltip>
      <Tooltip
        id='to-prev-tooltip'
        effect='solid'
        place='bottom'
        className={cn('tooltip', 'to-prev-tooltip')}
        delayShow={500}
        delayHide={100}
      >
        Scroll to previouse message
      </Tooltip>

      <Tooltip
        id='to-last-tooltip'
        effect='solid'
        place='bottom'
        className={cn('tooltip', 'to-last-tooltip')}
        delayShow={500}
        delayHide={100}
      >
        Scroll to the the most recent message
      </Tooltip>
    </StyledSwitcherMessage>
  );
};

export default SwitcherMessage;
