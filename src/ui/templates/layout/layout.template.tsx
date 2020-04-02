import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { styled } from '@styles/theming';
import { Header } from '@ui/organisms/header';
import { PreloaderOverlay } from '@ui/molecules/preloader-overlay';
import { useStore } from 'effector-react';
import { $isShowMainPreloader, mainPreloaderApi } from '@features/auth/model';
import { $isLoggedIn } from '@features/auth/model/session';

export type LayoutTemplateProps = {
  children?: React.ReactNode;
};

export type LayoutTemplateFC = React.FC<LayoutTemplateProps>;

const StyledMain = styled('main')``;

const StyledLayout = styled('div')`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  & > header {
    height: 60px;
  }

  & > .main {
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function MainPreloader() {
  const isShowMainPreloader = useStore($isShowMainPreloader);

  return (
    <PreloaderOverlay showPreloader={isShowMainPreloader} variant='page' />
  );
}

export const LayoutTemplate: LayoutTemplateFC = ({ children }) => {
  const isLoggedIn = useStore($isLoggedIn);
  // const isSearchPage = useRouteMatch('/search');
  const headerVariant = isLoggedIn ? 'secondary' : 'primary';

  return (
    // <React.Suspense fallback={}>
    <StyledLayout className='layout'>
      <MainPreloader />
      <Header variant={headerVariant} isLoggedIn={isLoggedIn} />
      <div className='main'>{children}</div>
    </StyledLayout>
    // </React.Suspense>
  );
};

export const withLayout = (story: Function) => (
  <LayoutTemplate>{story()}</LayoutTemplate>
);

export default LayoutTemplate;
