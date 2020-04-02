import * as React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { SerializedStyles } from '@emotion/css';

import { css, useTheme, Theme } from '@styles/theming';

import { GOOGLE_SITE_KEY } from '@constants';

export type CaptchaProps = {
  onChange?: (value: string | null) => void;
  siteKey?: string;
  lng?: string;
  isError?: boolean;
  value?: string;
};

export type CaptchaFC = React.FC<CaptchaProps>;

export type GetCaptchaCssParams = {
  theme: Theme;
  isError: boolean;
};

function getCaptchaCss({
  theme,
  isError,
}: GetCaptchaCssParams): SerializedStyles {
  return css`
    iframe {
      border: ${isError ? `1px solid ${theme.colors.red_1}` : 'none'};
      border-radius: 4px;
      transition: border ${theme.transitionDurations[0]} ease;
    }
  `;
}

export const Captcha: CaptchaFC = ({
  onChange = () => {},
  lng = 'en',
  siteKey,
  isError = false,
  value,
}) => {
  const ref = React.createRef<ReCAPTCHA>();

  React.useEffect(() => {
    if (!value && ref.current) {
      ref.current.reset();
    }
  }, [value]);

  const theme = useTheme();

  return (
    <ReCAPTCHA
      ref={ref}
      css={getCaptchaCss({ theme, isError })}
      onChange={onChange}
      sitekey={siteKey || GOOGLE_SITE_KEY}
      hl={lng}
    />
  );
};
