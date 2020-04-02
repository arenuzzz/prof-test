import * as React from 'react';
import { Global } from '@emotion/core';
import css from '@emotion/css';

import 'normalize.css';
import '@assets/fonts/Inter/inter.css';

type GlobalStylesProps = {
  primaryFontFamily: string;
};

// impo
export const GlobalStyles: React.FC<GlobalStylesProps> = ({
  primaryFontFamily,
}) => {
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after,
        h1 {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
          outline: none;
        }

        html,
        body {
          box-sizing: border-box;
          overflow: hidden;
        }

        body {
          width: 100vw;
          height: 100vh;

          font-family: ${primaryFontFamily};

          display: flex;
        }

        ul {
          list-style-type: none;
        }

        a {
          text-decoration: none;
        }

        button {
          border: none;
          outline: none !important;
          margin: 0;
          padding: 0;
          width: auto;
          overflow: visible;

          background: transparent;

          color: inherit;
          font: inherit;

          line-height: normal;

          text-align: inherit;

          -webkit-font-smoothing: inherit;
          -moz-osx-font-smoothing: inherit;

          -webkit-appearance: none;

          cursor: pointer;

          /* Remove excess padding and border in Firefox 4+ */
          &::-moz-focus-inner {
            border: 0;
            padding: 0;
          }
        }

        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        textarea {
          resize: none;
        }

        .no-scroll {
          overflow-y: hidden !important;
        }
      `}
    />
  );
};
