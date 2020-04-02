import * as _ from 'lodash';
import * as CSS from 'csstype';
import { variant, ObjectOrArray, width } from 'styled-system';

export type ThemeMode = 'light' | 'dark';

export type Theme = typeof theme;

export const modes: ThemeMode[] = ['light', 'dark'];

export const buttonSize = variant({
  prop: 'size',
  key: 'buttonSizes',
});

export const headerStyle = variant({
  prop: 'variant',
  key: 'headers',
});

const colors = {
  white_1: '#FFFFFF',
  green_1: '#00B200',
  black_1: '#2C2C2C',
  gray_1: '#828282',
  gray_2: '#E0E0E0',
  gray_3: '#ECECE7',
  blue_1: '#005B8C',
  blue_2: '#EAF2FD',
  red_1: '#FF3E1D',
  orange_1: '#FFB300',
  modes: {
    light: {},
    dark: {},
  },
};

const shadows = [
  'inset 0px 4px 4px rgba(0, 0, 0, 0.15)',
  '0px 2px 3px rgba(0, 0, 0, 0.1)',
  '0px 2px 7px rgba(0, 0, 0, 0.12)',
  '0px 10px 23px rgba(0, 0, 0, 0.12)',
];

const fonts = {
  primary: 'Inter',
};
const fontSizes = [14, 16, 18, 24, 32, 12];
const fontWeights = [400, 600];
const space = [0, 2, 4, 8, 16, 32];
const radii = [0, 2, 4, 8];
const transitions: ObjectOrArray<string> = ['ease 0.3s', 'ease 0.5s'];
const transitionDurations: ObjectOrArray<string> = ['0.3s'];

const baseTheme = {
  radii,
  space,
  fonts,
  fontSizes,
  fontWeights,
  colors,
  shadows,
  transitions,
  transitionDurations,
};

const defaultButtonProps = {
  borderRadius: baseTheme.radii[1],
  '&:disabled': {
    opacity: '0.7',
    cursor: 'not-allowed',
    backgroundColor: baseTheme.colors.gray_2,
    color: baseTheme.colors.gray_1,
  },
  '&:active': {
    boxShadow: baseTheme.shadows[0],
  },
};

const buttons = {
  default: {
    ...defaultButtonProps,
    color: baseTheme.colors.black_1,
    backgroundColor: baseTheme.colors.white_1,
    borderRadius: baseTheme.radii[2],
    border: `1px solid ${baseTheme.colors.gray_2}`,
  },
  primary: {
    ...defaultButtonProps,
    color: baseTheme.colors.white_1,
    backgroundColor: baseTheme.colors.blue_1,
  },
  secondary: {
    ...defaultButtonProps,
    color: baseTheme.colors.white_1,
    backgroundColor: baseTheme.colors.green_1,
  },
  danger: {
    ...defaultButtonProps,
    color: baseTheme.colors.white_1,
    backgroundColor: baseTheme.colors.red_1,
  },
  warning: {
    ...defaultButtonProps,
    color: baseTheme.colors.white_1,
    backgroundColor: baseTheme.colors.orange_1,
  },
};

const buttonSizes = {
  default: {
    fontSize: baseTheme.fontSizes[0],
    padding: `0 30px`,
    height: '40px',
    width: '146px',
    borderRadius: '2px',
  },
};

const headers = {
  primary: {
    backgroundColor: baseTheme.colors.white_1,
    borderBottom: `1px solid ${baseTheme.colors.gray_2}`,
    color: baseTheme.colors.black_1,
  },
  secondary: {
    color: baseTheme.colors.white_1,
    backgroundColor: baseTheme.colors.blue_1,
    boxShadow: baseTheme.shadows[2],
    svg: {
      fill: baseTheme.colors.white_1,
    },
    p: {
      color: baseTheme.colors.white_1,
    },
  },
};

export const theme = {
  ...baseTheme,
  buttons,
  buttonSizes,
  headers,
};

export const getTheme = (mode) =>
  _.merge({}, theme, {
    colors: _.get(theme.colors.modes, mode, theme.colors),
  });
