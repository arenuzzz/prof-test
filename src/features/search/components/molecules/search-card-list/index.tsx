import React from 'react';
import * as _ from 'lodash';
import Tooltip from 'react-tooltip';
import Highlighter from 'react-highlight-words';

import { Scrollbars } from 'react-custom-scrollbars';
import { ResultCard, GroupResultCard } from '@features/search/search.types';
import { createStoreConsumer } from '@lib/effector';
// import {
//   List,
//   AutoSizer,
//   InfiniteLoader,
//   ListRowRenderer,
// } from 'react-virtualized/dist/es';
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer';
import { List, ListRowRenderer } from 'react-virtualized/dist/es/List';
import InfiniteLoader from 'react-virtualized/dist/es/InfiniteLoader';

// import { width, height } from 'styled-system';
import { Card, GroupItems } from '@ui/organisms/card';
import { Preloader } from '@ui/atoms/preloader';
import { SearchType, ParsingStatus } from '@features/search/search.constants';
import {
  $checkedExtCardIds,
  $checkedBgCardIds,
  onCheckedExtCardChange,
  onCheckedBgCardChange,
  $checkedExtGroupCardIds,
  $checkedIntGroupCardIds,
  onCheckedExtGroupCardChange,
  onCheckedIntGroupCardChange,
} from '@features/search/model/search';
import {
  $searchParams,
  $searchCountryPhoneName,
} from '@features/search/model/search-form';
import {
  $checkedGroupProfilesIds,
  onCheckedGroupProfileChange,
} from '@features/search/model/group-messages-search';
import { Typography } from '@ui/atoms/typography';
import { ProfileTour } from '@features/tour/components/profile-tour';
import { styled } from '@styles/theming';
import { useHistory } from 'react-router-dom';

// import { TourCustom } from '@ui/atoms/tour';

export type SearchListProps = {
  data: Array<{}>;
  totalElements: number;
  pageSize: number;
  isLoading: boolean;
  loadMoreRows: (p: any) => Promise<any>;
  rowRenderer: ListRowRenderer;
  rowHeight: number;
  showTooltips?: boolean;
};

export type SearchCardListProps = {
  data: ResultCard[];
  type: SearchType;
  count?: number;
  pageSize: number;
  totalElements: number;
  isLoading: boolean;
  loadMoreRows: (p: any) => Promise<any>;
};

export type SearchGroupCardListProps = {
  data: GroupResultCard[];
  type: SearchType;
  count?: number;
  pageSize: number;
  totalElements: number;
  isLoading: boolean;
  loadMoreRows: (p: any) => Promise<any>;
};

export type SearchGroupProfilesCardListProps = {
  data: ResultCard[];
  initialsParts: string;
  pageSize: number;
  totalElements: number;
  isLoading: boolean;
  loadMoreRows: (p: any) => Promise<any>;
};

const CheckedExtCardIdsConsumer = createStoreConsumer($checkedExtCardIds);
const CheckedBgCardIdsConsumer = createStoreConsumer($checkedBgCardIds);
const SearchCountryPhoneNameConsumer = createStoreConsumer(
  $searchCountryPhoneName
);

const CheckedExtGroupCardIdsConsumer = createStoreConsumer(
  $checkedExtGroupCardIds
);
const CheckedIntGroupCardIdsConsumer = createStoreConsumer(
  $checkedIntGroupCardIds
);

const CheckedGroupProfileIdsConsumer = createStoreConsumer(
  $checkedGroupProfilesIds
);

const rebuildTooltip = _.debounce(() => Tooltip.rebuild(), 200, {
  leading: false,
  trailing: true,
});

const getDescription = (card: ResultCard) => {
  switch (card.type) {
    case SearchType.FACEBOOK:
    case SearchType.VKONTAKTE:
      return [
        card.birthDate || '',
        `${card.city ? `${card.city},` : ''} ${card.country || ''}`,
        card.phoneNumber || '',
      ];

    case SearchType.LINKEDIN:
      return [card.birthDate || '', card.link, card.phoneNumber || ''];

    case SearchType.VIBER:
    case SearchType.WHATSAPP:
      return [card.phoneNumber || ''];

    case SearchType.TELEGRAM:
    case SearchType.INSTAGRAM:
      return [card.nickname || '', card.phoneNumber || ''];

    default:
      return [];
  }
};

const getGroupDescription = (card: GroupResultCard): GroupItems => {
  return [
    card.totalMembersCount || 0,
    card.trackedMembersCount || 0,
    card.lastMessageDateTime || '',
    card.messagesCount || 0,
  ];
};

const StyledSearchList = styled('div')`
  width: 100%;

  .tooltip {
    max-width: 300px;
    padding: 8px;

    border-radius: 4px;

    display: flex;
    align-items: center;

    font-size: 12px;
    line-height: 15px;
    opacity: 1;

    background-color: ${(p) => p.theme.colors.black_1};
  }
`;

export function SearchList({
  data,
  totalElements,
  pageSize,
  isLoading,
  loadMoreRows,
  rowRenderer,
  rowHeight = 150,
  showTooltips = true,
}: SearchListProps) {
  const ref = React.useRef<List | null>(null);

  const handleScroll = ({ target }) => {
    const { scrollTop, scrollLeft } = target;
    // console.log(ref.current);
    if (ref.current) {
      const { Grid: grid } = ref.current;

      if (grid) {
        grid.handleScrollEvent({ scrollTop, scrollLeft });
      }
    }
  };

  function isRowLoaded({ index }) {
    return !!data[index];
  }

  return (
    <>
      <StyledSearchList
        className='profile-list'
        style={{
          height: isLoading ? 'calc(100% - 50px)' : '100%',
        }}
      >
        <AutoSizer
          onResize={() => {
            rebuildTooltip();
          }}
        >
          {({ width, height }) => {
            return (
              <Scrollbars
                autoHide
                style={{ width, height }}
                onScroll={handleScroll}
              >
                <InfiniteLoader
                  isRowLoaded={isRowLoaded}
                  loadMoreRows={loadMoreRows}
                  rowCount={totalElements}
                  minimumBatchSize={pageSize}
                  // threshold={7}
                >
                  {({ onRowsRendered, registerChild }) => (
                    <List
                      rowCount={totalElements}
                      ref={registerChild}
                      onRowsRendered={onRowsRendered}
                      rowRenderer={rowRenderer}
                      width={width}
                      height={height}
                      rowHeight={rowHeight}
                      style={{
                        overflowX: 'visible',
                        overflowY: 'visible',
                        paddingRight: '25px',
                      }}
                    />
                  )}
                </InfiniteLoader>
              </Scrollbars>
            );
          }}
        </AutoSizer>
        {showTooltips && (
          <>
            <Tooltip
              id='tracked-group-card-tooltip'
              effect='solid'
              place='left'
              className='tooltip'
            >
              Messages are being updated right now. You can't apply any action
              to group untill Crawler parses messages
            </Tooltip>
            <Tooltip
              id='total-members-count-tooltip'
              effect='solid'
              place='top'
              className='tooltip'
            >
              Total number of group participants
            </Tooltip>
            <Tooltip
              id='tracked-members-count-tooltip'
              effect='solid'
              place='top'
              className='tooltip'
            >
              Number of group participants that have TRACKED or STOPED status
            </Tooltip>
            <Tooltip
              id='last-message-date-time-tooltip'
              effect='solid'
              place='top'
              className='tooltip'
            >
              Time when last portion of the messages has been parsed
            </Tooltip>
            <Tooltip
              id='messages-count-tooltip'
              effect='solid'
              place='top'
              className='tooltip'
            >
              Number of messages that have been written by group participants
              that have TRACKED or STOPED status in last portion of the messages
              that has been parsed
            </Tooltip>
          </>
        )}
      </StyledSearchList>
      {isLoading && (
        <div
          style={{
            width: '100%',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Preloader title='The data is being loaded now' />
        </div>
      )}
    </>
  );
}

function getPlace(country, city, countryPhoneName, type) {
  if (country) {
    return {
      country,
      city,
    };
  }

  if (
    (type === SearchType.WHATSAPP || type === SearchType.VIBER) &&
    countryPhoneName !== ''
  ) {
    return {
      country: countryPhoneName,
    };
  }

  return undefined;
}

export function ExternalSearchCardList({
  type,
  data,
  totalElements,
  pageSize,
  isLoading,
  loadMoreRows,
}: SearchCardListProps) {
  if (!totalElements) {
    return null;
  }

  // const hasFirstTracked = false;
  const hasFirstTracked = data.slice(0, 10).some((card) => card.isTracked);

  // console.log('data', data);
  // console.log('hasFirstTracked', hasFirstTracked);

  const rowRenderer = ({ index, key, style }) => {
    const card = data[index];

    if (!card) {
      return null;
    }

    const description = getDescription(card) || [];

    return (
      <div key={key} style={style}>
        <SearchCountryPhoneNameConsumer>
          {(countryPhoneName) => (
            <CheckedExtCardIdsConsumer>
              {(checkedIds) => {
                const isChecked = checkedIds[type][card.id]
                  ? checkedIds[type][card.id].checked
                  : false;

                const isTracked = card.isTracked || false;

                function onCheckedChange({ currentTarget: { checked } }) {
                  const place = getPlace(
                    card.country,
                    card.city,
                    countryPhoneName,
                    type
                  );

                  onCheckedExtCardChange({
                    id: card.id,
                    checked,
                    type: card.type,
                    place,
                  });
                }

                return (
                  <>
                    {isTracked && !hasFirstTracked && (
                      <ProfileTour type='tracked-card' />
                    )}
                    <Card
                      id={card.id.toString()}
                      onGroupClick={() => {}}
                      onCheckedChange={onCheckedChange}
                      variant='messenger'
                      isChecked={isChecked}
                      isTracked={isTracked}
                      hasFirstTracked={hasFirstTracked}
                      isBackground={false}
                      name={card.initials}
                      imgSrc={card.avatarLink}
                      link={card.link}
                      groupCount={0}
                      description={description}
                    />
                  </>
                );
              }}
            </CheckedExtCardIdsConsumer>
          )}
        </SearchCountryPhoneNameConsumer>
      </div>
    );
  };

  return (
    <>
      {data.length > 0 && hasFirstTracked && <ProfileTour type='tracked' />}
      {data.length > 0 && !hasFirstTracked && <ProfileTour type='parse' />}
      <SearchList
        data={data}
        totalElements={totalElements}
        pageSize={pageSize}
        isLoading={isLoading}
        loadMoreRows={loadMoreRows}
        rowRenderer={rowRenderer}
        rowHeight={150}
      />
    </>
  );
}

export function BackgroundSearchCardList({
  type,
  data,
  totalElements,
  pageSize,
  isLoading,
  loadMoreRows,
}: SearchCardListProps) {
  const rowRenderer = ({ index, key, style }) => {
    const card = data[index];

    if (!card) {
      return null;
    }

    const description = getDescription(card);

    return (
      <div key={key} style={style}>
        <CheckedBgCardIdsConsumer>
          {(checkedIds) => {
            const isChecked = checkedIds[type][card.id]
              ? checkedIds[type][card.id].checked
              : false;

            function onCheckedChange({ currentTarget: { checked } }) {
              onCheckedBgCardChange({
                id: card.id,
                checked,
                type: card.type,
              });
            }

            return (
              <Card
                id={card.id.toString()}
                onGroupClick={() => {}}
                onCheckedChange={onCheckedChange}
                variant='messenger'
                isChecked={isChecked}
                isBackground
                name={card.initials}
                imgSrc={card.avatarLink}
                link={card.link}
                groupCount={0}
                description={description}
              />
            );
          }}
        </CheckedBgCardIdsConsumer>
      </div>
    );
  };

  return (
    <>
      {data.length > 0 && <ProfileTour type='background' />}
      <SearchList
        data={data}
        totalElements={totalElements}
        pageSize={pageSize}
        isLoading={isLoading}
        loadMoreRows={loadMoreRows}
        rowRenderer={rowRenderer}
        rowHeight={150}
      />
    </>
  );
}

export function ExternalSearchGroupsCardList({
  type,
  data,
  totalElements,
  pageSize,
  isLoading,
  loadMoreRows,
}: SearchGroupCardListProps) {
  const history = useHistory();
  if (!totalElements) {
    return null;
  }

  // const hasFirstTracked = false;
  // const hasFirstTracked = data.slice(0, 10).some((card) => card.isTracked);

  // console.log('data', data);
  // console.log('hasFirstTracked', hasFirstTracked);

  const rowRenderer = ({ index, key, style }) => {
    const card = data[index];

    if (!card) {
      return null;
    }

    return (
      <div key={key} style={style}>
        <CheckedExtGroupCardIdsConsumer>
          {(checkedIds) => {
            const isChecked = checkedIds[type][card.id]
              ? checkedIds[type][card.id].checked
              : false;

            function onCheckedChange({ currentTarget: { checked } }) {
              onCheckedExtGroupCardChange({
                id: card.id,
                checked,
                type: card.type,
              });
            }

            const { parsingStatus, id: groupId } = card;

            function onInfoClick() {
              if (
                parsingStatus === ParsingStatus.STOPPED ||
                parsingStatus === ParsingStatus.TRACKED
              ) {
                history.push(`/groups/${groupId}`);
              }
            }

            return (
              <>
                {(card.parsingStatus === 'TRACKED' ||
                  card.parsingStatus === 'PARSING') && (
                  <ProfileTour type='tracked-group-card' />
                )}
                {card.parsingStatus === 'STOPPED' && (
                  <ProfileTour type='stopped-group-card' />
                )}
                <Card
                  id={card.id.toString()}
                  onInfoClick={onInfoClick}
                  onCheckedChange={onCheckedChange}
                  variant='group'
                  mode='external'
                  className='group-card'
                  isChecked={isChecked}
                  parsingStatus={card.parsingStatus}
                  name={card.name}
                  imgSrc={card.avatarLink}
                  link={card.link}
                />
              </>
            );
          }}
        </CheckedExtGroupCardIdsConsumer>
      </div>
    );
  };

  return (
    <>
      <SearchList
        data={data}
        totalElements={totalElements}
        pageSize={pageSize}
        isLoading={isLoading}
        loadMoreRows={loadMoreRows}
        rowRenderer={rowRenderer}
        rowHeight={85}
      />
    </>
  );
}

export function InternalSearchGroupsCardList({
  type,
  data,
  totalElements,
  pageSize,
  isLoading,
  loadMoreRows,
}: SearchGroupCardListProps) {
  const history = useHistory();

  if (!totalElements) {
    return null;
  }

  // const hasFirstTracked = false;
  // const hasFirstTracked = data.slice(0, 10).some((card) => card.isTracked);

  // console.log('data', data);
  // console.log('hasFirstTracked', hasFirstTracked);

  const rowRenderer = ({ index, key, style }) => {
    const card = data[index];

    if (!card) {
      return null;
    }

    return (
      <div key={key} style={style}>
        <CheckedIntGroupCardIdsConsumer>
          {(checkedIds) => {
            const isChecked = checkedIds[type][card.id]
              ? checkedIds[type][card.id].checked
              : false;

            const groupDescription = getGroupDescription(card) || [];

            function onCheckedChange({ currentTarget: { checked } }) {
              onCheckedIntGroupCardChange({
                id: card.id,
                checked,
                type: card.type,
              });
            }

            const { parsingStatus, id: groupId } = card;

            function onInfoClick() {
              if (
                parsingStatus === ParsingStatus.STOPPED ||
                parsingStatus === ParsingStatus.TRACKED
              ) {
                history.push(`/groups/${groupId}`);
              }
            }

            return (
              <>
                {(card.parsingStatus === 'TRACKED' ||
                  card.parsingStatus === 'PARSING') && (
                  <ProfileTour type='tracked-group-card' />
                )}
                {card.parsingStatus === 'STOPPED' && (
                  <ProfileTour type='stopped-group-card' />
                )}
                <Card
                  id={card.id.toString()}
                  onInfoClick={onInfoClick}
                  onCheckedChange={onCheckedChange}
                  variant='group'
                  mode='internal'
                  className='group-card'
                  isChecked={isChecked}
                  name={card.name}
                  imgSrc={card.avatarLink}
                  link={card.link}
                  parsingStatus={card.parsingStatus}
                  groupItems={groupDescription}
                />
              </>
            );
          }}
        </CheckedIntGroupCardIdsConsumer>
      </div>
    );
  };

  return (
    <>
      <SearchList
        data={data}
        totalElements={totalElements}
        pageSize={pageSize}
        isLoading={isLoading}
        loadMoreRows={loadMoreRows}
        rowRenderer={rowRenderer}
        rowHeight={85}
      />
    </>
  );
}

export function SearchGroupProfilesCardList({
  initialsParts,
  data,
  totalElements,
  pageSize,
  isLoading,
  loadMoreRows,
}: SearchGroupProfilesCardListProps) {
  if (!totalElements) {
    return null;
  }

  // const hasFirstTracked = false;
  // const hasFirstTracked = data.slice(0, 10).some((card) => card.isTracked);

  // console.log('data', data);
  // console.log('hasFirstTracked', hasFirstTracked);

  const rowRenderer = ({ index, key, style }) => {
    const card = data[index];

    if (!card) {
      return null;
    }

    function onCheckedChange({ currentTarget: { checked } }) {
      onCheckedGroupProfileChange({
        id: card.id,
        checked,
      });
    }

    const messages = `${card.messagesCount || 0} messages`;

    const name = (
      <Highlighter
        highlightClassName='highlight'
        searchWords={[initialsParts]}
        autoEscape={true}
        textToHighlight={card.initials}
      />
    );

    return (
      <div key={key} style={style}>
        <CheckedGroupProfileIdsConsumer>
          {(checkedIds) => {
            const isChecked = checkedIds[card.id] || false;

            return (
              <>
                <Card
                  id={card.id.toString()}
                  onGroupClick={() => {}}
                  onCheckedChange={onCheckedChange}
                  variant='group-member'
                  name={name}
                  className='group-card'
                  isChecked={isChecked}
                  imgSrc={card.avatarLink}
                  link={card.link}
                  description={[messages]}
                />
              </>
            );
          }}
        </CheckedGroupProfileIdsConsumer>
      </div>
    );
  };

  return (
    <>
      <SearchList
        showTooltips={false}
        data={data}
        totalElements={totalElements}
        pageSize={pageSize}
        isLoading={isLoading}
        loadMoreRows={loadMoreRows}
        rowRenderer={rowRenderer}
        rowHeight={55}
      />
    </>
  );
}
