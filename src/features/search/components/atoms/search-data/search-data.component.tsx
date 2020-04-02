import React, { ReactNode } from 'react';
import { styled, cn } from '@styles/theming';

export type SearchDataProps = {
  className?: string;
  children?: ReactNode;
};

export function SearchData(props: SearchDataProps) {
  return <StyledSearchDataWrapper {...props} />;
}

SearchData.Content = function SearchDataContent({
  className,
  ...props
}: SearchDataProps) {
  return (
    <StyledSearchDataContent {...props} className={cn('content', className)} />
  );
};

const StyledSearchDataContent = styled('div')``;

const StyledSearchDataWrapper = styled('div')`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  & > .content {
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
