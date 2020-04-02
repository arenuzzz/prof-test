import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import { AuthTemplate } from './auth.template';
import { SignInForm } from '@ui/organisms/sign-in-form';
import { SignUpForm } from '@ui/organisms/sign-up-form';
import { withLayout } from '@ui/templates/layout/layout.template';
import { AppType } from '@constants';

export const regTemplateProps = {
  title: 'Registration',
  subtitle: 'Name of the organization',
};

export const authTemplateProps = {
  title: 'Authorization',
  subtitle: 'Name of the organization',
};

export const actions = {
  onClick: action('onClick'),
};

storiesOf('Design System|Templates/AuthTemplate', module)
  .addDecorator(withLayout)
  .add('Authorization', () => {
    const title = text('title', authTemplateProps.title);

    function onSubmit() {}

    const form = <SignInForm onSubmit={onSubmit} />;

    return <AuthTemplate title={title} form={form} />;
  })
  .add('Authorization/Company', () => {
    const title = text('title', authTemplateProps.title);
    const subtitle = text('subtitle', authTemplateProps.subtitle);

    function onSubmit() {}
    const form = <SignInForm onSubmit={onSubmit} appType={AppType.COMPANY} />;

    return <AuthTemplate title={title} subtitle={subtitle} form={form} />;
  })
  .add('Registration', () => {
    const title = text('title', regTemplateProps.title);

    function onSubmit() {}

    const form = <SignUpForm onSubmit={onSubmit} />;

    return <AuthTemplate title={title} form={form} />;
  })
  .add('Registration/Company', () => {
    const title = text('title', regTemplateProps.title);
    const subtitle = text('subtitle', regTemplateProps.subtitle);

    function onSubmit() {}

    const form = <SignUpForm onSubmit={onSubmit} appType={AppType.COMPANY} />;

    return <AuthTemplate title={title} subtitle={subtitle} form={form} />;
  });
