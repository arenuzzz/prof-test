import React, { ReactNode, Children } from 'react';
import { Typography } from '@ui/atoms/typography';
import { styled } from '@styles/theming';

type SearchResultProps = {
  title: string;
  className?: string;
  children?: ReactNode;
};

export function SearchResult({
  title,
  children,
  className,
}: SearchResultProps) {
  return (
    <StyledSearchResult className={className}>
      <Typography as='h4' variant='h2' className='head'>
        {title}
      </Typography>
      <div className='body'>{children}</div>
    </StyledSearchResult>
  );
}

const StyledSearchResult = styled('div')`
  height: 100%;

  display: flex;
  flex-direction: column;

  & > .body {
    flex: 1;

    margin-top: 13px;

    display: flex;
  }
`;
