import * as React from 'react';
import Tour from 'reactour';
import './index.scss';

export type TourProps = {
  steps: [];
  doTour: boolean;
  showArrows?: boolean;
  showDots?: boolean;
};

export const TourCustom: React.FC<TourProps> = ({
  steps,
  doTour = false,
  showArrows = false,
  showDots = false,
}) => {
  const [isOpen, toggleOpen] = React.useState(doTour);
  return (
    <Tour
      steps={steps}
      isOpen={isOpen}
      onRequestClose={() => toggleOpen(!isOpen)}
      className='helper'
      rounded={0}
      showNavigation={showDots}
      showNumber={false}
      showButtons={showArrows}
    />
  );
};
