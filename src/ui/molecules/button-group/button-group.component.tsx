import * as React from 'react';
import { styled, cn } from '@styles/theming';
import { Button } from '@ui/atoms/button';

export type ButtonGruopProps = {
  index?: string;
  defaultIndex: string;
  onTabClick?: (newIndex?: string) => {};
  renderLabel?: (params: {
    label: any;
    index: string | number;
    activeIndex: string | number;
    count: string | number;
  }) => React.ReactNode;
  children: any;
  className?: string;
};

const StyledButtonGroup = styled('div')`
  .tab-menu {
    display: flex;
    .tab-menu_item {
      width: auto;
      min-width: 200px;
      border-radius: 5px;
      transition: color ${(p) => p.theme.transitions[0]},
        border-color ${(p) => p.theme.transitions[0]};
      white-space: nowrap;
      &:hover {
        opacity: 1;
        border-color: ${(p) => p.theme.colors.blue_1};
        color: ${(p) => p.theme.colors.blue_1};
      }
      &:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    .tab-menu_item.focus {
      opacity: 0.8;
      border-color: unset;
      color: ${(p) => p.theme.colors.white_1};
    }
  }
`;

export const TabItem = (props) => {
  return <div {...props} />;
};

export const ButtonGroup: React.FC<ButtonGruopProps> = ({
  index,
  defaultIndex,
  onTabClick,
  children,
  className,
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
  // const items = children.filter((item) => item.type.name === 'TabItem');

  return (
    <StyledButtonGroup className={cn('button-group', className)}>
      <div className='tab-menu'>
        {children.map(({ props }) => (
          <Button
            key={props.index}
            variant={bindIndex === props.index ? 'primary' : 'default'}
            onClick={() => changeTab(props.index)}
            className={cn(`tab-menu_item`, props.className, {
              focus: bindIndex === props.index,
            })}
          >
            {renderLabel && renderLabel.call
              ? renderLabel({ ...props, activeIndex: bindIndex })
              : props.label}
          </Button>
        ))}
      </div>
      <div className='tab-view'>
        {children.map(
          ({ props: { addedCount, count, ...props } }) =>
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
    </StyledButtonGroup>
  );
};
