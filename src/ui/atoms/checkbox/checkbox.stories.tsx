import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Checkbox } from './checkbox.component';
// import { action } from '@storybook/addon-actions';

// export const actions = {
//   onClick: action('onClick'),
// };

storiesOf('Design System|Atoms/Checkbox', module).add('primary', () => {
  const [isChecked, toggleCheck] = React.useState(false);

  return (
    <div style={{ margin: 50 }}>
      <Checkbox
        id='1'
        isChecked={isChecked}
        onChange={(e) => toggleCheck(!isChecked)}
      />
    </div>
  );
});
