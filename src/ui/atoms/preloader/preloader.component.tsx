import * as React from 'react';
import { styled, keyframes, Theme, layout } from '@styles/theming';

export type PreloaderProps = {
  title?: string;
};

const preloaderAnim = keyframes`
  0%{
      opacity: 0.3;
  }
  35%{
      opacity: 0.7;
    }
  
  100%{
      opacity: 0.3;
  }
`;

const StyledPreloader = styled('div')<PreloaderProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: opacity ${(p) => p.theme.transitions[1]};

  .container {
    width: 40px;
    display: flex;
    justify-content: space-between;
    div {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      opacity: 0.3;
      background-color: ${(p) => p.theme.colors.gray_1};
      transition: opacity ${(p) => p.theme.transitions[0]};
      animation: ${preloaderAnim} 0.8s 0s infinite;
      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      &:nth-child(3) {
        animation-delay: 0.5s;
      }
    }
  }
  .title {
    margin-top: 15px;
    font-size: ${(p) => p.theme.fontSizes[0]};
    line-height: 17px;
    color: ${(p) => p.theme.colors.gray_1};
    opacity: 0.7;
  }
`;

export const Preloader: React.FC<PreloaderProps> = ({ title, ...props }) => {
  return (
    <StyledPreloader {...props}>
      <div className='container'>
        <div />
        <div />
        <div />
      </div>
      {title ? <div className='title'>{title}</div> : null}
    </StyledPreloader>
  );
};
