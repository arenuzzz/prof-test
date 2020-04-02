import * as React from 'react';
import { styled } from '@styles/theming';
import { Icon } from '@ui/quarks/icon';
import { Typography } from '@ui/atoms/typography';

type SerachFormTemplateProps = {
  form: React.ReactNode;
  title: string;
  className?: string;
};

const StyledHead = styled('div')`
  padding: 20px 20px;

  display: flex;
  align-items: center;

  .head-icon {
    width: 24px;
    height: 24px;

    margin-right: 12px;
    fill: ${(p) => p.theme.colors.gray_1};
  }
`;

const StyledBody = styled('div')`
  flex: 1;
`;

const StyledSearchFormTemplate = styled('div')`
  width: 356px;
  height: 100%;
  max-width: 356px;

  display: flex;
  flex-direction: column;

  border-right: 1px solid ${(p) => p.theme.colors.gray_3};
`;

export const SearchFormTemplate: React.FC<SerachFormTemplateProps> = ({
  form,
  title = '',
  className,
}) => {
  return (
    <StyledSearchFormTemplate className={className}>
      <StyledHead>
        <Icon variant='search' className='head-icon' />
        <Typography as='h2' variant='h2'>
          {title}
        </Typography>
      </StyledHead>
      <StyledBody>{form}</StyledBody>
    </StyledSearchFormTemplate>
  );
};
