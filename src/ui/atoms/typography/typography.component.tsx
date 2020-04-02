import * as React from 'react';
// import styled from '@emotion/styled-base';
import { styled } from '@styles/theming';

export type TypographyVariant = 'h1' | 'h2' | 'text' | 'label';

export type TypographyProps = {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  as?: any;
};

export type TypographyVariantComponents = {
  [T in TypographyVariant]: React.FC<TypographyProps>;
};

const StyledH1 = styled('h1')`
  font-size: 26px;
  line-height: 31px;
  color: ${(p) => p.theme.colors.black_1};
`;

const StyledH2 = styled('h2')`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.black_1};
`;

const StyledText = styled('span')`
  display: block;
  font-size: 14px;
  line-height: 160%;
  color: ${(p) => p.theme.colors.gray_1};
`;

const StyledLabel = styled('label')`
  font-weight: 500;
  font-size: 14px;
  /* line-height: 140%; */
  color: ${(p) => p.theme.colors.black_1};
`;

export const variantComponents: TypographyVariantComponents = {
  h1: StyledH1,
  h2: StyledH2,
  text: StyledText,
  label: StyledLabel,
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'h1',
  children,
  className,
  as,
}) => {
  const Component = variantComponents[variant];

  return Component ? (
    <Component variant={variant} className={className} as={as}>
      {children}
    </Component>
  ) : null;
};

export default Typography;
