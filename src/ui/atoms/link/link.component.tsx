import * as React from 'react';
import { styled } from '@styles/theming';

export type LinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
};

const StyledLink = styled('a')<LinkProps>`
  display: inline-block;

  font-weight: normal;
  font-size: 14px;
  line-height: 140%;

  color: ${(p) => p.theme.colors.blue_1};

  border-bottom: 0 solid ${(p) => p.theme.colors.blue_1};

  transition: opacity ${(p) => p.theme.transitionDurations[0]} ease;

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 1px;
    background: ${(p) => p.theme.colors.blue_1};
    transition: width ${(p) => p.theme.transitionDurations[0]} ease,
      opacity ${(p) => p.theme.transitionDurations[0]} ease;
  }

  &:hover {
    &,
    &::after {
      opacity: 0.8;
    }

    &::after {
      width: 100%;
    }
  }
`;

export const Link: React.FC<LinkProps> = (props) => {
  return <StyledLink {...props} />;
};

export default Link;
