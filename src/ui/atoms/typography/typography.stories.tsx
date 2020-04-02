import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

// import { linkTo } from '@storybook/addon-links';
// import { withInfo } from '@storybook/addon-info';

import { Typography, TypographyProps } from './typography.component';

export const propsH1: TypographyProps = {
  variant: 'h1',
  children: 'Headline 1 / Inter Semibold',
};

export const propsText: TypographyProps = {
  variant: 'text',
  children: 'TEXT / Inter Regular',
};

export const propsLabel: TypographyProps = {
  variant: 'label',
  children: 'Button text / Inter Regular',
};

storiesOf('Design System|Atoms/Typography', module)
  .add('h1', () => {
    const variantH1 = text(
      'variant',
      propsH1.variant
    ) as TypographyProps['variant'];
    const childrenH1 = text('children', propsH1.children as string);

    return <Typography variant={variantH1}>{childrenH1}</Typography>;
  })
  .add('text', () => {
    const variantText = text(
      'variant',
      propsText.variant
    ) as TypographyProps['variant'];
    const childrenText = text(
      'children',
      propsText.children as string
    ) as TypographyProps['children'];
    return <Typography variant={variantText}>{childrenText}</Typography>;
  })
  .add('label', () => {
    const variantLabel = text(
      'variant',
      propsLabel.variant
    ) as TypographyProps['variant'];
    const childrenLabel = text(
      'children',
      propsLabel.children as string
    ) as TypographyProps['children'];

    return <Typography variant={variantLabel}>{childrenLabel}</Typography>;
  });
