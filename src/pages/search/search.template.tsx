import React from 'react';
import { styled } from '@styles/theming';

const StyledSearchPageTemplate = styled('section')`
  display: flex;

  width: 100%;
  height: 100%;

  .search-form-template {
    flex: 1 0 356px;
  }
`;

export function SearchPageTemplate({ children }) {
  return <StyledSearchPageTemplate>{children}</StyledSearchPageTemplate>;
}
