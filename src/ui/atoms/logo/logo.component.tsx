import * as React from 'react';
import { ReactComponent as LogoSvg } from '@assets/images/logo.svg';
import { styled } from '@styles/theming';

export type LogoProps = {
  className?: string;
};

export type LogoFC = React.FC<LogoProps>;

const StyledLogoSvg = styled(LogoSvg)`
  width: 100px;
  height: 21px;
`;

export const Logo: LogoFC = (props) => {
  return <StyledLogoSvg {...props} />;
};

export default Logo;
