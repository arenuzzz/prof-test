import * as React from 'react';
import cn from 'classnames';
import { css, ClassNames, keyframes } from '@emotion/core';
import { ThemeProvider, useTheme as emotionUseTheme } from 'emotion-theming';
import emotionStyled, { CreateStyled } from '@emotion/styled';

import { modes, getTheme, Theme } from './theme';
import { GlobalStyles } from './global-styles.component';

type ThemingProps = {};

const Theming: React.FC<ThemingProps> = ({ children }) => {
  const [mode, setMode] = React.useState(modes[0]);
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles primaryFontFamily={theme.fonts.primary} />
      {children}
    </ThemeProvider>
  );
};

const withTheming = (story: Function) => <Theming>{story()}</Theming>;
const styled = emotionStyled as CreateStyled<Theme>;
const useTheme = emotionUseTheme as () => Theme;

export {
  css,
  cn,
  ClassNames,
  keyframes,
  withTheming,
  styled,
  useTheme,
  Theming,
};

export {
  space,
  layout,
  typography,
  buttonStyle,
  color,
  flexbox,
  background,
  border,
  position,
  compose,
  system,
  variant,
} from 'styled-system';
export * from './theme';

export default Theming;
