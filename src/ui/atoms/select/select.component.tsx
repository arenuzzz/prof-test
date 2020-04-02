import * as React from 'react';
import Downshift from 'downshift';
import matchSorter from 'match-sorter';
import { Scrollbars } from 'react-custom-scrollbars';
import { formatPhoneInputValue } from '@lib/format';
import { styled, cn } from '@styles/theming';

import { Icon } from '../../quarks/icon';

export type SelectValue = string;
export type SelectOptionsData = {};

export type SelectItem<D extends SelectOptionsData> = {
  value: SelectValue;
  label: string;
  data?: D;
};

export type SelectProps<D extends SelectOptionsData = {}> = {
  data: SelectItem<D>[];
  onChange?: (value: SelectValue) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  name?: string;
  value?: SelectValue;
  className?: string;
  defaultValue?: SelectValue;
  placeholder?: string;
  isAutocomplete?: boolean;
  isError?: boolean;
  labelRenderer?: (params: SelectItem<D>) => React.ReactNode;
  itemRenderer?: (params: SelectItem<D>) => React.ReactNode;
  inputRenderer?: (params: any) => React.ReactNode;
  itemToString?: (item: SelectValue | null) => string;
};

type MenuStatusProps = {
  isOpen: boolean;
};

type StyledSelectButtonProps = {
  isError: boolean;
  isOpen: boolean;
  isSelected: boolean;
};

const MenuStatusIcon = styled(Icon)`
  width: 25px;
  height: 25px;
  fill: ${(p) => p.theme.colors.gray_1};

  transform: none;

  transition: transform ${(p) => p.theme.transitionDurations[0]} ease;

  &.is-open {
    transform: rotateX(180deg);
  }
`;

const MenuStatusButton = styled('button')`
  position: absolute;
  right: 0;
  top: 50%;
  width: 40px;
  height: 100%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuStatus: React.FC<MenuStatusProps & {
  selectedItem?: any;
  onClick?: (e: any) => void;
}> = ({ isOpen, onClick, selectedItem = '' }) => {
  return (
    <MenuStatusButton type='button' className='s-menu-status' onClick={onClick}>
      <MenuStatusIcon
        className={cn(isOpen && !selectedItem && 'is-open')}
        variant={selectedItem ? 'delete' : 'down'}
      />
    </MenuStatusButton>
  );
};

const StyledSelectButton = styled('button')<StyledSelectButtonProps>`
  position: relative;
  width: 100%;
  height: 40px;
  color: ${(p) => (p.isSelected ? 'inherit' : p.theme.colors.gray_1)};
  background: ${(p) => p.theme.colors.white_1};
  border: 1px solid;
  border-color: ${(p) =>
    p.isError ? p.theme.colors.red_1 : p.theme.colors.gray_2};
  border-radius: 4px;
  padding: 10px 14px;
`;

const StyledSelectLabel = styled('div')`
  width: calc(100% - 25px);
  overflow: hidden;

  white-space: nowrap;

  display: flex;
`;

const StyledSelectList = styled('ul')`
  position: absolute;
  top: calc(100% + 5px);

  width: 100%;

  height: 0;
  max-height: 0;

  z-index: 3;

  outline: none;

  background: ${(p) => p.theme.colors.white_1};
  border: 1px solid ${(p) => p.theme.colors.gray_2};
  border-width: 0;
  border-radius: 4px;

  overflow: hidden;

  transition: max-height ${(p) => p.theme.transitionDurations[0]} ease;

  &.is-open {
    height: auto;
    max-height: 200px;
    border-width: 1px;
  }
`;

const StyledSelectListItem = styled('div')`
  position: relative;
  cursor: pointer;

  padding: 12px 14px;

  color: ${(p) => p.theme.colors.gray_1};

  &.is-highlighted {
    background-color: ${(p) => p.theme.colors.blue_2};
  }

  &.is-selected {
    font-weight: bold;
    opacity: 1;
    color: ${(p) => p.theme.colors.black_1};
  }
`;

const defaultItemToString = (item) => (item ? item : '');

const StyledMenuScrollBar = styled('div')`
  background-color: ${(p) => p.theme.colors.blue_1};
  border-radius: 2px;
  width: 4px !important;
  margin-left: 4px;
`;

const StyledSelectWrapper = styled('div')`
  position: relative;

  width: 100%;
  height: auto;
`;

const renderThumbVertical = (props) => {
  return <StyledMenuScrollBar {...props} />;
};

export const Select = <D extends SelectOptionsData>({
  data = [],
  value: currentValue,
  defaultValue,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  placeholder = '',
  isAutocomplete = false,
  isError,
  className,
  labelRenderer,
  itemRenderer,
  inputRenderer,
  itemToString = defaultItemToString,
  stateReducer,
  sortByKey = 'value',
}: SelectProps<D>) => {
  const inputRef = React.createRef<HTMLInputElement>();

  if (!Array.isArray(data)) {
    throw Error('Data should be an array!');
  }

  return (
    <Downshift
      stateReducer={stateReducer}
      onChange={onChange}
      selectedItem={currentValue}
      // onSelect={console.log}
      initialSelectedItem={defaultValue}
      initialInputValue={defaultValue}
      itemToString={itemToString}
    >
      {({
        getInputProps,
        getItemProps,
        getToggleButtonProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
        clearSelection,
        toggleMenu,
      }) => {
        const filteredItems =
          isAutocomplete && inputValue
            ? matchSorter(data, inputValue.toString(), {
                keys: [
                  { threshold: matchSorter.rankings.CONTAINS, key: sortByKey },
                ],
              })
            : data;

        const itemData =
          selectedItem &&
          filteredItems.find(({ value }) => selectedItem === value);

        const mainLabel = itemData ? itemData.label : placeholder;

        const selectLabel = (
          <StyledSelectLabel className='s-button-label'>
            {labelRenderer && labelRenderer.call
              ? labelRenderer({
                  label: mainLabel,
                  value: inputValue || '',
                  data: itemData && itemData.data,
                })
              : mainLabel}
          </StyledSelectLabel>
        );

        const inputProps = getInputProps({
          onFocus,
          onBlur,
          onChange: (event) => {
            if (event.target.value === '') {
              clearSelection();
            }
          },
        });

        const input =
          isAutocomplete && inputRenderer && inputRenderer.call ? (
            inputRenderer({ ...inputProps, ref: inputRef })
          ) : (
            <input
              {...inputProps}
              ref={inputRef}
              type='text'
              value={inputProps.value}
              style={{
                width: '0',
                height: '100%',
                border: '0',
              }}
            />
          );

        const isShowingList = isOpen && filteredItems.length > 0;

        return (
          <StyledSelectWrapper
            {...getRootProps()}
            className={cn('s-wrapper', className)}
          >
            <StyledSelectButton
              {...getToggleButtonProps({
                onClick: () => {
                  if (inputRef.current) {
                    if (isOpen) {
                      inputRef.current.blur();
                    } else {
                      inputRef.current.focus();
                    }
                  }
                },
              })}
              isError={!!isError}
              className='s-button'
            >
              {!isAutocomplete && selectLabel}
              {input}
            </StyledSelectButton>
            <MenuStatus
              isOpen={isOpen}
              selectedItem={selectedItem}
              onClick={selectedItem ? clearSelection : toggleMenu}
            />
            <StyledSelectList
              {...getMenuProps()}
              className={cn('s-list', isShowingList && 'is-open')}
            >
              <Scrollbars
                autoHeight
                autoHeightMax={200}
                renderThumbVertical={renderThumbVertical}
              >
                {isShowingList &&
                  filteredItems.length &&
                  filteredItems.map((item, idx) => (
                    <StyledSelectListItem
                      key={item.value}
                      {...getItemProps({
                        key: item.value,
                        index: idx,
                        item: item.value,
                      })}
                      className={cn('s-list-item', {
                        'is-highlighted': highlightedIndex === idx,
                        'is-selected': selectedItem === item.value,
                      })}
                    >
                      {itemRenderer && itemRenderer.call
                        ? itemRenderer(item)
                        : item.label}
                    </StyledSelectListItem>
                  ))}
              </Scrollbars>
            </StyledSelectList>
          </StyledSelectWrapper>
        );
      }}
    </Downshift>
  );
};

export default Select;
