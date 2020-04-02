import * as React from 'react';
import { styled, cn } from '@styles/theming';

export type TabsProps = {
  index?: string;
  defaultIndex: string;
  onTabClick?: (newIndex?: string) => any;
  tabName?: string;
  children: any;
  renderLabel?: (params: {
    label: any;
    index: string | number;
    activeIndex: string | number;
    [index: string]: any;
  }) => React.ReactNode;
};

const StyledTabs = styled('div')`
  width: 100%;

  .tab-menu {
    border-bottom: 1px solid ${(p) => p.theme.colors.gray_2};
  }
  .tab-menu > button {
    cursor: pointer;
    padding-bottom: 10px;
    font-weight: 500;
    border: 0;
    color: ${(p) => p.theme.colors.black_1};
    margin-right: 36px;
    position: relative;
    font-size: 14px;
    line-height: 140%;
    transition: color ${(p) => p.theme.transitions[0]};

    &::after {
      content: '';
      height: 3px;
      width: 0;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: ${(p) => p.theme.colors.blue_1};
      transition: width ${(p) => p.theme.transitions[0]};
    }

    &:last-child {
      margin-right: 0;
    }
    span {
      color: ${(p) => p.theme.colors.gray_1};
      transition: color ${(p) => p.theme.transitions[0]};
    }
  }
  .tab-menu > button.focus {
    color: ${(p) => p.theme.colors.blue_1};
    span {
      color: ${(p) => p.theme.colors.blue_1};
    }

    &::after {
      width: 100%;
    }
  }
  .tab-menu > button:hover {
    color: ${(p) => p.theme.colors.blue_1};
    span {
      color: ${(p) => p.theme.colors.blue_1};
    }
  }
`;

export const TabItem = (props) => {
  return <div {...props} />;
};

export const Tabs: React.FC<TabsProps> = ({
  index,
  defaultIndex,
  onTabClick,
  children,
  renderLabel,
}) => {
  const [bindIndex, setBindIndex] = React.useState(defaultIndex);
  const changeTab = (newIndex: string) => {
    if (typeof onTabClick === 'function') onTabClick(newIndex);
    setBindIndex(newIndex);
  };

  React.useEffect(() => {
    if (index && index !== bindIndex) {
      setBindIndex(index);
    }
  }, [index, bindIndex]);

  // const items = children.filter((item) => item.type.name === tabName);

  return (
    <StyledTabs className='tabs'>
      <div className='tab-menu'>
        {children.map(({ props }) => (
          <button
            key={props.index}
            type='button'
            onClick={() => changeTab(props.index)}
            className={bindIndex === props.index ? 'focus' : ''}
          >
            {renderLabel && renderLabel.call
              ? renderLabel({ ...props, activeIndex: bindIndex })
              : props.label}
          </button>
        ))}
      </div>
      <div className='tab-view'>
        {children.map(
          ({ props: { count, addedCount, ...props } }) =>
            bindIndex === props.index && (
              <div
                {...props}
                className={cn('tab-view_item', props.className, {
                  'tab-view_item--active': bindIndex === props.index,
                  [`tab-view_item-${props.index
                    .toString()
                    .toLowerCase()}`]: props.index,
                })}
                key={props.index}
                style={{
                  display: bindIndex === props.index ? 'block' : 'none',
                }}
              />
            )
        )}
      </div>
    </StyledTabs>
  );
};
