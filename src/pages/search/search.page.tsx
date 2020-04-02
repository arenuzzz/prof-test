import React from 'react';
import {
  useStore,
  createFetching,
  createEvent,
  createStore,
  createStoreConsumer,
} from '@lib/effector';

import { SearchFormContainer } from '@features/search/components/molecules/search-form';
import { SearchFormTemplate } from '@features/search/components/templates/search-form';

import { SearchPageTemplate } from './search.template';
import { styled } from '@styles/theming';
import {
  ButtonGroup,
  TabItem as ButtonGroupTabItem,
} from '@ui/molecules/button-group';

import { Tabs, TabItem } from '@ui/atoms/tabs';
import { Typography } from './../../ui/atoms/typography/typography.component';
import { Button } from '@ui/atoms/button';
import {
  ExternalSearchCardList,
  BackgroundSearchCardList,
} from '@features/search/components/molecules/search-card-list';

import {
  $checkedExtCardIds,
  $profilesCounts,
  telegramCardsFetching,
  viberCardsFetching,
  instagramCardsFetching,
  whatsappCardsFetching,
  addTrackedExtCardIds,
  addBgModal,
  bgWhatsappCardsFetching,
  bgViberCardsFetching,
  bgTelegramCardsFetching,
  $checkedBgCardIds,
  removeCheckedBgCardIds,
  getMapMarkers,
  $mapMarkers,
  $checkedExtCardIdsCount,
  $checkedBgCardIdsCount,
} from '@features/search/model/search';
import { PreloaderOverlay } from '@ui/molecules/preloader-overlay';
import { SearchType, SearchVariant } from '@features/search/search.constants';
import { Map } from '@ui/molecules/map';
import { Marker } from '@ui/atoms/marker';
import { $searchParams } from '@features/search/model/search-form';

import { AddBackgroundModal } from '@features/search/components/atoms/add-background-modal';
import {
  SearchPlace,
  Location,
  SearchProfilesCountsData,
} from '@features/search/search.types';
import { Icon } from '@ui/quarks/icon';
import { TourCustom } from '@ui/atoms/tour';
import { sleep } from '@lib/helpers';
import { ProfileTour } from '@features/tour/components/profile-tour';

const CheckedExtCardIdsCount = createStoreConsumer($checkedExtCardIdsCount);
const CheckedBgCardIdsCount = createStoreConsumer($checkedBgCardIdsCount);

const StyledSearchMainTemplate = styled('div')`
  width: 100%;

  display: flex;
`;

const StyledSearchTabsWrapper = styled('div')`
  margin: 14px 30px;

  width: 100%;

  display: flex;

  .button-group {
    width: 100%;

    display: flex;
    flex-direction: column;

    & > .tab-menu {
      height: 40px;

      .tab-menu_item {
      }
    }

    & > .tab-view {
      flex: 1;

      margin-top: 15px;

      display: flex;
      width: 100%;

      .tab-view_item {
        flex: 1;

        display: flex;
      }
    }
  }

  .tabs {
    flex: 1;

    display: flex;
    flex-direction: column;

    .tab-view {
      margin-top: 24px;
      flex: 1;
    }

    .tab-view_item {
      height: 100%;
    }
  }
`;

const StyledTabElem = styled('div')`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const StyledTabExternalSearch = styled(StyledTabElem)``;

const StyledTabBackgroundSearch = styled(StyledTabElem)`
  /* background-color: yellow; */
`;

const StyledTabViewGroup = styled('div')`
  display: flex;
  height: 100%;

  .data {
    flex: 2;
  }

  .map {
    flex: 1;
    margin-left: 24px;
  }
`;

const StyledResultsTemplate = styled('div')`
  display: flex;
  flex-direction: column;

  & > .body {
    flex: 1;

    margin-top: 13px;

    display: flex;
  }

  .button-action {
    margin-top: 24px;
    width: 100%;

    &.parse,
    &.delete {
      width: calc(100% - 25px);
    }

    &.delete:not(:disabled) {
      /* background-color: ${(p) => p.theme.colors.red_1}; */
    }

    &.add-in-bg {
    }
  }
`;

type ResultsTemplateProps = {
  title: string;
  className?: string;
  body: React.ReactNode;
};

function ResultsTemplate({ title, body, className }: ResultsTemplateProps) {
  return (
    <StyledResultsTemplate className={className}>
      <Typography as='h4' variant='h2' className='head'>
        {title}
      </Typography>
      <div className='body'>{body}</div>
    </StyledResultsTemplate>
  );
}

const SearchDataWrapper = styled('div')`
  width: 100%;

  display: flex;
  flex-direction: column;

  & > .content {
    flex: 1;
  }

  &.add-background {
    height: 100%;

    & > .content {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

function ParseButton({ type }: { type: SearchType }) {
  const { ids, count } = useStore($checkedExtCardIdsCount);

  return (
    <Button
      type='button'
      variant='secondary'
      className='button-action parse'
      disabled={!ids.length}
      onClick={() => addTrackedExtCardIds({ ids })}
    >
      PARSE
    </Button>
  );
}

function DeleteButton({ type }: { type: SearchType }) {
  const { ids, count } = useStore($checkedBgCardIdsCount);

  return (
    <Button
      type='button'
      variant='danger'
      className='button-action delete'
      disabled={!ids.length}
      onClick={() => removeCheckedBgCardIds({ ids })}
    >
      DELETE
    </Button>
  );
}

function TelegramCardList({ type, count, bgCount }) {
  const { $list, getListData, resetListData } = telegramCardsFetching;
  const { data, isLoading } = useStore($list);
  const searchParams = useStore($searchParams);

  function loadMoreRows() {
    return new Promise((resolve) => {
      getListData({
        promiseResolver: resolve,
        ...searchParams,
        type,
        isBackground: false,
      });
    });
  }

  React.useEffect(() => {
    if (count > 0) {
      loadMoreRows();
    }

    return () => {
      resetListData();
    };
  }, [count]);

  if (!isLoading && data && count === 0) {
    return (
      <>
        <div className='content'>
          <SearchNotFound type={type} bgCount={bgCount} />
        </div>
        {/* <ParseButton type={type} /> */}
      </>
    );
  }

  return (
    <>
      <div className='content'>
        <ExternalSearchCardList
          type={type}
          data={data ? data.content : []}
          totalElements={data ? data.totalElements : 0}
          pageSize={data ? data.pageSize : 0}
          isLoading={isLoading}
          loadMoreRows={loadMoreRows}
        />
      </div>

      <ParseButton type={type} />
    </>
  );
}

function ViberCardList({ type, count, bgCount }) {
  const { $list, getListData, resetListData } = viberCardsFetching;
  const { data, isLoading } = useStore($list);
  const searchParams = useStore($searchParams);

  function loadMoreRows() {
    return new Promise((resolve) => {
      getListData({
        promiseResolver: resolve,
        ...searchParams,
        type,
        isBackground: false,
      });
    });
  }

  React.useEffect(() => {
    if (count > 0) {
      loadMoreRows();
    }

    return () => {
      resetListData();
    };
  }, [count]);

  if (!isLoading && data && count === 0) {
    return (
      <>
        <div className='content'>
          <SearchNotFound type={type} bgCount={bgCount} />
        </div>
        {/* <ParseButton type={type} /> */}
      </>
    );
  }

  return (
    <>
      <div className='content'>
        <ExternalSearchCardList
          type={type}
          data={data ? data.content : []}
          totalElements={data ? data.totalElements : 0}
          pageSize={data ? data.pageSize : 0}
          isLoading={isLoading}
          loadMoreRows={loadMoreRows}
        />
      </div>
      <ParseButton type={type} />
    </>
  );
}

function InstagramCardList({ type, count, bgCount }) {
  const { $list, getListData, resetListData } = instagramCardsFetching;
  const { data, isLoading } = useStore($list);
  const searchParams = useStore($searchParams);

  function loadMoreRows() {
    return new Promise((resolve) => {
      getListData({
        promiseResolver: resolve,
        ...searchParams,
        type,
        isBackground: false,
      });
    });
  }

  React.useEffect(() => {
    if (count > 0) {
      loadMoreRows();
    }

    return () => {
      resetListData();
    };
  }, [count]);

  if (!isLoading && data && count === 0) {
    return (
      <>
        <div className='content'>
          <SearchNotFound type={type} bgCount={bgCount} />
        </div>
        {/* <ParseButton type={type} /> */}
      </>
    );
  }

  return (
    <>
      <div className='content'>
        <ExternalSearchCardList
          type={type}
          data={data ? data.content : []}
          totalElements={data ? data.totalElements : 0}
          pageSize={data ? data.pageSize : 0}
          isLoading={isLoading}
          loadMoreRows={loadMoreRows}
        />
      </div>
      <ParseButton type={type} />
    </>
  );
}

function WhatsappCardList({ type, count, bgCount }) {
  const { $list, getListData, resetListData } = whatsappCardsFetching;
  const { data, isLoading } = useStore($list);
  const searchParams = useStore($searchParams);

  function loadMoreRows() {
    return new Promise((resolve) => {
      getListData({
        promiseResolver: resolve,
        ...searchParams,
        type,
        isBackground: false,
      });
    });
  }
  React.useEffect(() => {
    if (count > 0) {
      loadMoreRows();
    }

    return () => {
      resetListData();
    };
  }, [count]);

  if (!isLoading && data && count === 0) {
    return (
      <>
        <div className='content'>
          <SearchNotFound type={type} bgCount={bgCount} />
        </div>
        {/* <ParseButton type={type} /> */}
      </>
    );
  }

  return (
    <>
      <div className='content'>
        <ExternalSearchCardList
          type={type}
          data={data ? data.content : []}
          totalElements={data ? data.totalElements : 0}
          pageSize={data ? data.pageSize : 0}
          isLoading={isLoading}
          loadMoreRows={loadMoreRows}
        />
      </div>
      <ParseButton type={type} />
    </>
  );
}

const StyledSearchNotFoundInfo = styled('div')`
  max-width: 300px;
  text-align: center;

  svg {
    width: 60px;
    height: 59px;

    margin-bottom: 16px;
  }
`;

function SearchNotFoundInfo({ bgCount }: { bgCount: number }) {
  const hasCrawlerMode = bgCount > 0;

  const iconVariant = hasCrawlerMode ? 'search-success' : 'search-fail';
  const searchInfo = hasCrawlerMode
    ? 'Crawler is looking for this number in background search mode already'
    : `Taking into account parameters that you entered Crawler hasn't found the user`;

  return (
    <StyledSearchNotFoundInfo>
      <Icon variant={iconVariant} />
      <Typography as='p' variant='text'>
        {searchInfo}
      </Typography>
    </StyledSearchNotFoundInfo>
  );
}

function SearchNotFound({ type, bgCount, isBackground = false }) {
  const { phoneNumber } = useStore($searchParams);

  const isShowAddButton =
    !isBackground &&
    type !== SearchType.INSTAGRAM &&
    type !== SearchType.TELEGRAM &&
    !!phoneNumber;

  return (
    <SearchDataWrapper className='add-background'>
      <div className='content'>
        <SearchNotFoundInfo bgCount={bgCount} />
      </div>
      {isShowAddButton && (
        <Button
          type='button'
          variant='secondary'
          className='button-action add-in-bg'
          disabled={bgCount > 0}
          onClick={() => {
            addBgModal.api.open();
          }}
        >
          ADD IN BACKGROUND SEARCH
        </Button>
      )}
    </SearchDataWrapper>
  );
}

function BgWhatsappCardList({ type, count }) {
  const { $list, getListData, resetListData } = bgWhatsappCardsFetching;
  const { data, isLoading } = useStore($list);
  const searchParams = useStore($searchParams);

  function loadMoreRows() {
    return new Promise((resolve) => {
      getListData({
        promiseResolver: resolve,
        ...searchParams,
        type,
        isBackground: true,
      });
    });
  }

  React.useEffect(() => {
    if (count > 0) {
      loadMoreRows();
    }

    return () => {
      resetListData();
    };
  }, [count]);

  if (!isLoading && data && count === 0) {
    return (
      <>
        <SearchNotFound type={type} isBackground />

        {/* <ParseButton type={type} /> */}
      </>
    );
  }

  return (
    <>
      <BackgroundSearchCardList
        type={type}
        data={data ? data.content : []}
        totalElements={data ? data.totalElements : 0}
        pageSize={data ? data.pageSize : 0}
        isLoading={isLoading}
        loadMoreRows={loadMoreRows}
      />
    </>
  );
}

function BgViberCardList({ type, count }) {
  const { $list, getListData, resetListData } = bgViberCardsFetching;
  const { data, isLoading } = useStore($list);
  const searchParams = useStore($searchParams);

  function loadMoreRows() {
    return new Promise((resolve) => {
      getListData({
        promiseResolver: resolve,
        ...searchParams,
        type,
        isBackground: true,
      });
    });
  }

  React.useEffect(() => {
    if (count > 0) {
      loadMoreRows();
    }

    return () => {
      resetListData();
    };
  }, [count]);

  if (!isLoading && data && count === 0) {
    return (
      <>
        <SearchNotFound type={type} isBackground />

        {/* <ParseButton type={type} /> */}
      </>
    );
  }

  return (
    <BackgroundSearchCardList
      type={type}
      data={data ? data.content : []}
      totalElements={data ? data.totalElements : 0}
      pageSize={data ? data.pageSize : 0}
      isLoading={isLoading}
      loadMoreRows={loadMoreRows}
    />
  );
}

function ExternalMap({ type }: { type: SearchType }) {
  const checkedIds = useStore($checkedExtCardIds.map((data) => data[type]));
  const coordinates = useStore($mapMarkers.map((data) => data[type]));

  React.useEffect(() => {
    const places: SearchPlace[] = [];

    Object.values(checkedIds).forEach((value) => {
      if (value && value.checked && value.place) {
        places.push(value.place);
      }
    });

    getMapMarkers({ places, type });
  }, [checkedIds, type]);

  return <Map coordinates={coordinates} isFitCoordinates />;
}

function ExternalSearchTabItem({ count, bgCount, type, status = 'initial' }) {
  const isShowSearchData = status !== 'initial';

  return (
    <StyledTabViewGroup>
      <ResultsTemplate
        className='data'
        title='Search results'
        body={
          isShowSearchData && (
            <SearchDataWrapper>
              {type === SearchType.TELEGRAM && (
                <>
                  <TelegramCardList
                    count={count}
                    bgCount={bgCount}
                    type={SearchType.TELEGRAM}
                  />
                </>
              )}
              {type === SearchType.VIBER && (
                <ViberCardList
                  count={count}
                  bgCount={bgCount}
                  type={SearchType.VIBER}
                />
              )}
              {type === SearchType.WHATSAPP && (
                <WhatsappCardList
                  count={count}
                  bgCount={bgCount}
                  type={SearchType.WHATSAPP}
                />
              )}
              {type === SearchType.INSTAGRAM && (
                <InstagramCardList
                  count={count}
                  bgCount={bgCount}
                  type={SearchType.INSTAGRAM}
                />
              )}
            </SearchDataWrapper>
          )
        }
      />
      <ResultsTemplate
        className='map'
        title='Map'
        body={
          <SearchDataWrapper>
            <div className='content'>
              <ExternalMap type={type} />
            </div>
          </SearchDataWrapper>
        }
      />
    </StyledTabViewGroup>
  );
}

function BackgroundSearchTabItem({ count, type, status = 'initial' }) {
  const isShowSearchData = status !== 'initial';

  return (
    <StyledTabViewGroup>
      <ResultsTemplate
        className='data'
        title='Search results'
        body={
          isShowSearchData && (
            <SearchDataWrapper>
              <div className='content'>
                {type === SearchType.WHATSAPP && (
                  <BgWhatsappCardList count={count} type={type} />
                )}
                {type === SearchType.VIBER && (
                  <BgViberCardList count={count} type={type} />
                )}
              </div>
              {count > 0 && <DeleteButton type={type} />}
            </SearchDataWrapper>
          )
        }
      />
      <ResultsTemplate
        className='map'
        title='Map'
        body={
          <SearchDataWrapper>
            <div className='content'>
              <Map />
            </div>
          </SearchDataWrapper>
        }
      />
    </StyledTabViewGroup>
  );
}

const setExtSearchActiveTab = createEvent<any>();
const $extSearchActiveTab = createStore<string>(SearchType.INSTAGRAM);

$extSearchActiveTab.on(setExtSearchActiveTab, (state, value) => value || state);

const setBgSearchActiveTab = createEvent<any>();
const $bgSearchActiveTab = createStore<string>(SearchType.VIBER);

$bgSearchActiveTab.on(setBgSearchActiveTab, (state, value) => value || state);

const setProfileSearchActiveTab = createEvent<any>();
const $profileSearchActiveTab = createStore<string>(SearchVariant.EXTERNAL);

$profileSearchActiveTab.on(
  setProfileSearchActiveTab,
  (state, value) => value || state
);

const labels = {
  [SearchType.INSTAGRAM]: 'Instagram',
  [SearchType.TELEGRAM]: 'Telegram',
  [SearchType.WHATSAPP]: 'WhatsApp',
  [SearchType.VIBER]: 'Viber',
};

function formatExtTabCount(count = 0) {
  return `(${count})`;
}

function formatBgTabCount({ addedCount = 0, totalCount = 0 }) {
  return `(${addedCount}/${totalCount})`;
}

function getAllBgCountValues(bgData: SearchProfilesCountsData) {
  let totalCount = 0;
  let addedCount = 0;

  bgData.forEach((item) => {
    if (item.addedCount) {
      addedCount += item.addedCount;
    }
    if (item.totalCount) {
      totalCount += item.totalCount;
    }
  });

  return { totalCount, addedCount };
}

function ExternalTab({ data, status, bgData }) {
  const extSearchActiveTab = useStore($extSearchActiveTab);

  React.useEffect(() => {
    if (data) {
      const hasActiveTabItems = data.some(
        (item) => item.type === extSearchActiveTab && item.count > 0
      );

      if (!hasActiveTabItems) {
        const findTabWithItems = data.find((item) => item.count > 0);

        if (findTabWithItems) {
          setExtSearchActiveTab(findTabWithItems.type);
        }
      }
    }
  }, [data]);

  return (
    <StyledTabExternalSearch>
      <AddBackgroundModal type={extSearchActiveTab as SearchType} />
      <Tabs
        index={extSearchActiveTab}
        defaultIndex={extSearchActiveTab}
        onTabClick={(idx) => setExtSearchActiveTab(idx)}
        renderLabel={({ label, count }) => {
          return `${label} ${formatExtTabCount(count)}`;
        }}
      >
        {data &&
          data.map(({ type, count }) => {
            const bgTab = bgData.find((bg) => bg.type === type);
            const bgCount = bgTab ? bgTab.count : 0;

            return (
              <TabItem
                key={type}
                label={labels[type]}
                count={count}
                index={type}
              >
                <ExternalSearchTabItem
                  type={type}
                  bgCount={bgCount}
                  count={count}
                  status={status}
                />
              </TabItem>
            );
          })}
      </Tabs>
    </StyledTabExternalSearch>
  );
}

function BackgroundTab({ data, status }) {
  const bgSearchActiveTab = useStore($bgSearchActiveTab);

  React.useEffect(() => {
    if (data) {
      const hasActiveTabItems = data.some(
        (item) => item.type === bgSearchActiveTab && item.count > 0
      );

      if (!hasActiveTabItems) {
        const findTabWithItems = data.find((item) => item.count > 0);

        if (findTabWithItems) {
          setBgSearchActiveTab(findTabWithItems.type);
        }
      }
    }
  }, [data]);

  return (
    <StyledTabBackgroundSearch>
      <Tabs
        index={bgSearchActiveTab}
        defaultIndex={bgSearchActiveTab}
        onTabClick={(idx) => setBgSearchActiveTab(idx)}
        renderLabel={({ label, count }) => {
          return `${label} ${formatExtTabCount(count)}`;
        }}
      >
        {data &&
          data.map(({ type, count }) => {
            return (
              <TabItem
                key={type}
                label={labels[type]}
                count={count}
                index={type}
              >
                <BackgroundSearchTabItem
                  type={type}
                  count={count}
                  status={status}
                />
              </TabItem>
            );
          })}
      </Tabs>
    </StyledTabBackgroundSearch>
  );
}

function SearchMainResults() {
  const profileSearchActiveTab = useStore($profileSearchActiveTab);
  const { data, isLoading, status } = useStore($profilesCounts);

  const { EXTERNAL, BACKGROUND } = data;

  // const bgCounts = getAllBgCountValues(BACKGROUND.data || []);

  return (
    <StyledSearchTabsWrapper>
      <ButtonGroup
        className='search-button-group'
        onTabClick={(idx) => setProfileSearchActiveTab(idx)}
        index={profileSearchActiveTab}
        defaultIndex={SearchVariant.EXTERNAL}
        renderLabel={({ label, index }) => {
          return index === SearchVariant.EXTERNAL ? (
            <CheckedExtCardIdsCount>
              {({ count }) => `${label} ${formatExtTabCount(count)}`}
            </CheckedExtCardIdsCount>
          ) : (
            <CheckedBgCardIdsCount>
              {({ count }) => `${label} ${formatExtTabCount(count)}`}
            </CheckedBgCardIdsCount>
          );
        }}
      >
        <ButtonGroupTabItem
          label='External search'
          index={SearchVariant.EXTERNAL}
        >
          {!isLoading && (
            <ExternalTab
              data={EXTERNAL.data}
              status={status}
              bgData={BACKGROUND.data}
            />
          )}
        </ButtonGroupTabItem>
        <ButtonGroupTabItem
          label='Background search'
          className='background'
          index={SearchVariant.BACKGROUND}
        >
          {!isLoading && (
            <BackgroundTab data={BACKGROUND.data} status={status} />
          )}
        </ButtonGroupTabItem>
      </ButtonGroup>
    </StyledSearchTabsWrapper>
  );
}

function SearchPreloader() {
  const { isLoading } = useStore($profilesCounts);

  return (
    <PreloaderOverlay
      title='The data is being loaded now'
      showPreloader={isLoading}
    />
  );
}

export function SearchPage() {
  // const [doTour, setTour] = React.useState(false);

  return (
    <>
      <SearchPreloader />
      <SearchPageTemplate>
        <SearchFormTemplate
          className='search-form-template'
          title='External search'
          form={<SearchFormContainer />}
        />
        <StyledSearchMainTemplate>
          <SearchMainResults />
          <ProfileTour type='search' />
        </StyledSearchMainTemplate>
      </SearchPageTemplate>
    </>
  );
}
