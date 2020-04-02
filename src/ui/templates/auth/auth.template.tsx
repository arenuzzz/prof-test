import * as React from 'react';
import { styled } from '@styles/theming';
import { Typography } from '@ui/atoms/typography';

export type AuthTemplateProps = {
  title: string;
  subtitle?: string | null;
  form: React.ReactNode;
};

export type AuthTemplateFC = React.FC<AuthTemplateProps>;

const StyledAuthTemplate = styled('section')`
  width: 480px;
  padding: 21px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .section-body {
    flex-grow: 1;

    display: flex;
    align-items: center;

    .content {
      width: 100%;

      .title,
      .subtitle {
        margin-bottom: 20px;
      }
    }
  }

  /* .section-foot {
    margin: 0 auto;
  } */
`;

export const AuthTemplate: AuthTemplateFC = ({
  form,
  title,
  subtitle: subtitleText,
}) => {
  const subtitleComp = subtitleText ? (
    <Typography variant='text' className='subtitle'>
      {subtitleText}
    </Typography>
  ) : null;

  return (
    <StyledAuthTemplate>
      <div className='section-body'>
        <div className='content'>
          <Typography variant='h1' className='title'>
            {title}
          </Typography>
          {subtitleComp}
          {form}
        </div>
      </div>
    </StyledAuthTemplate>
  );
};

export default AuthTemplate;
