import * as React from 'react';
import { styled, cn } from '@styles/theming';
import { Preloader } from '@ui/atoms/preloader/preloader.component';
import { TransitionWrapper } from '@ui/atoms/transition-wrapper/transition-wrapper.component';

type VariantPreloader = 'page' | 'default';

export type PreloaderOverlayProps = {
  title?: string;
  showPreloader: boolean;
  variant?: VariantPreloader;
};

const StyledPreloaderOverlay = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 99999;

  background-color: ${(p) => p.theme.colors.black_1};
  opacity: 0.9;

  /* &.default {
    background-color: ${(p) => p.theme.colors.black_1};
    opacity: 0.9;
  } */
  /* &.page {
    opacity: 1;
    background-color: ${(p) => p.theme.colors.white_1};
  } */
`;

const StyledPreloaderOverlayPage = styled(StyledPreloaderOverlay)`
  opacity: 1;
  background-color: ${(p) => p.theme.colors.white_1};
`;

export const PreloaderOverlay: React.FC<PreloaderOverlayProps> = ({
  title,
  showPreloader,
  variant = 'default',
}) => {
  if (variant === 'page') {
    return (
      <TransitionWrapper show={showPreloader}>
        <StyledPreloaderOverlayPage className={cn(variant)}>
          <Preloader title={title} />
        </StyledPreloaderOverlayPage>
      </TransitionWrapper>
    );
  }
  return (
    <TransitionWrapper show={showPreloader}>
      <StyledPreloaderOverlay className={cn(variant)}>
        <Preloader title={title} />
      </StyledPreloaderOverlay>
    </TransitionWrapper>
  );
};
