import * as React from 'react';
import { styled, keyframes } from '@styles/theming';

export type MarkerTypeProps = {
  lat: number;
  lng: number;
};

const shadowAnim = keyframes`
0%{
transform: scale(0);
opacity: 0;
}
50%{
opacity: 0.2;
}
100%{
transform: scale(1);
opacity: 0;
}
`;

const StyledMarker = styled('div')`
  width: 20px;
  height: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .dot {
    width: 6px;
    height: 6px;
    position: relative;
    z-index: 1;
    background-color: ${(p) => p.theme.colors.blue_1};
    border-radius: 50%;
  }
  .shadow {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    background-color: ${(p) => p.theme.colors.blue_1};
    opacity: 0.2;
    animation: ${shadowAnim} 1s ease infinite;
  }
`;
export const Marker: React.FC<MarkerTypeProps> = () => {
  return (
    <StyledMarker>
      <div className='shadow' />
      <div className='dot' />
    </StyledMarker>
  );
};
