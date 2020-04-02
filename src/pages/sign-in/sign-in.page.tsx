import * as React from 'react';
import { AuthTemplate } from '@ui/templates/auth';
import { SignInFormContainer } from '@features/auth/containers/sign-in-form';
import { RouteComponentProps } from 'react-router';
import { APP_TYPE, COMPANY_NAME, isCompanyType } from '@constants';

export type SignInPageProps = {} & RouteComponentProps;

export type SignInPageFC = React.FC<SignInPageProps>;

export const SignInPage: SignInPageFC = (props) => {
  const title = 'Authorization';

  const subtitle = isCompanyType ? COMPANY_NAME : null;

  return (
    <AuthTemplate
      title={title}
      subtitle={subtitle}
      form={<SignInFormContainer appType={APP_TYPE} />}
    />
  );
};
