import React from 'react';
// import { VariableSizeList as List } from 'react-window';
// import InfiniteLoader from 'react-window-infinite-loader';
// import AutoSizer from 'react-virtualized-auto-sizer';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Grid,
  InfiniteLoader,
  WindowScroller,
  List,
  ScrollSync,
} from 'react-virtualized';
import { Scrollbars, positionValues } from 'react-custom-scrollbars';
import { styled, cn, position } from '@styles/theming';
import { Message } from '@ui/molecules/message-item';
import { profilerApi } from '@api/profiler';

import { MessagePaginationType } from '@features/search/search.constants';
import { SwitcherMessage } from '@ui/atoms/switcher-message';
import { formatMessageDateTime } from '@lib/date';
import {
  scrollBehaviorChanged,
  $messageList,
  messageListScrollToHighlightedChanged,
} from '@features/search/model/group-messages-search';
import { useStore } from 'effector-react';

export type MessageListProps = {
  searchParams: object;
  hasSteps: boolean;
  messageCount: number;
  groupId: number;
};

const defaultState = {
  data: [],
  isLoading: false,
  scrollHeight: null,
  scrollToHighlighted: true,
  type: null,
  firstMessageId: null,
  lastMessageId: null,
  minBatchSize: 11,
};

export function MessageList({
  hasSteps = false,
  messageCount,
  groupId = 0,
}: MessageListProps) {
  const scrollRef = React.useRef<null | Scrollbars>(null);
  const messageList = useStore($messageList);

  // console.log(hasSteps);
  // console.log('MessageListData', messageList);

  const [switcherState, setSwitcherState] = React.useState({
    current: messageCount,
    count: messageCount,
  });

  function getMessage(item) {
    const mode = item.isAdmin && 'admin';
    const variant = item.isHighlighted ? 'search' : 'normal';

    return (
      <div style={{ padding: '5px 0' }} key={item.id}>
        <Message
          name={item.initials}
          nickname={item.phoneNumber || item.nickname}
          timeStamp={item.dateTime}
          content={item.message}
          variant={variant}
          mode={mode}
          position={item.position || 'left'}
        />
      </div>
    );
  }

  function onUpdate(posValues: positionValues) {
    if (messageList.isLoading) {
      return;
    }

    console.log(messageList);

    if (messageList.data.length === 0) {
      scrollBehaviorChanged({
        pagination: hasSteps
          ? MessagePaginationType.LAST
          : MessagePaginationType.INITIAL,
        groupId,
        posValues,
        scrollToHighlighted: hasSteps,
      });

      return;
    }

    if (
      posValues.scrollHeight === posValues.clientHeight &&
      (messageList.pagination === MessagePaginationType.FIRST ||
        messageList.pagination === MessagePaginationType.PREVIOUS)
    ) {
      scrollBehaviorChanged({
        pagination: MessagePaginationType.SCROLL_DOWN,
        groupId,
        posValues,
        scrollToHighlighted: true,
      });

      return;
    }

    if (
      posValues.scrollHeight === posValues.clientHeight &&
      (messageList.pagination === MessagePaginationType.LAST ||
        messageList.pagination === MessagePaginationType.NEXT)
    ) {
      scrollBehaviorChanged({
        pagination: MessagePaginationType.SCROLL_UP,
        groupId,
        posValues,
        scrollToHighlighted: true,
      });

      return;
    }

    if (posValues.top === 0 && messageList.firstMessageId !== null) {
      scrollBehaviorChanged({
        pagination: MessagePaginationType.SCROLL_UP,
        groupId,
        posValues,
      });

      return;
    }

    if (posValues.top === 1 && messageList.lastMessageId !== null) {
      scrollBehaviorChanged({
        pagination: MessagePaginationType.SCROLL_DOWN,
        groupId,
        posValues,
      });
    }
  }

  function toPrev() {
    setSwitcherState((swState) => ({
      ...swState,
      current: swState.current - 1,
    }));

    scrollBehaviorChanged({
      pagination: MessagePaginationType.PREVIOUS,
      groupId,
      scrollToHighlighted: true,
    });
  }
  function toNext() {
    setSwitcherState((swState) => ({
      ...swState,
      current: swState.current + 1,
    }));

    scrollBehaviorChanged({
      pagination: MessagePaginationType.NEXT,
      groupId,
      scrollToHighlighted: true,
    });
  }
  function toLast() {
    setSwitcherState((swState) => ({
      ...swState,
      current: swState.count,
    }));

    scrollBehaviorChanged({
      pagination: MessagePaginationType.LAST,
      groupId,
      scrollToHighlighted: true,
    });
  }
  function toFirst() {
    setSwitcherState((swState) => ({
      ...swState,
      current: 1,
    }));

    scrollBehaviorChanged({
      pagination: MessagePaginationType.FIRST,
      groupId,
      scrollToHighlighted: true,
    });
  }

  function getScrollHighlightedPosition(): number | null {
    const nodeList = document.querySelectorAll<HTMLDivElement>(
      '.group-message.search'
    );

    if (nodeList.length) {
      const searchItem = nodeList[0];

      // console.log(searchItem.offsetTop);

      const calculatedScrollItemHeight =
        searchItem.offsetTop - searchItem.getBoundingClientRect().height;

      return calculatedScrollItemHeight;
    }

    return null;
  }

  React.useEffect(() => {
    const scroll = scrollRef.current;

    if (scroll) {
      const values = scroll.getValues();

      if (messageList.pagination === MessagePaginationType.INITIAL) {
        scroll.scrollToBottom();
      } else if (messageList.scrollToHighlighted) {
        const scrollTopPos = getScrollHighlightedPosition();

        if (scrollTopPos) {
          scroll.scrollTop(scrollTopPos);
        }
      } else if (messageList.pagination === MessagePaginationType.SCROLL_UP) {
        scroll.scrollTop(values.scrollHeight - messageList.scrollHeight);
      }

      // if (messageList.scrollToHighlighted) {

      // }

      messageListScrollToHighlightedChanged(false);
    }
  }, [
    messageList.pagination,
    messageList.scrollHeight,
    messageList.firstMessageId,
    messageList.lastMessageId,
    messageList.scrollToHighlighted,
  ]);

  return (
    <StyledMessageList>
      {hasSteps && (
        <SwitcherMessage
          className='message-switcher'
          disabled={messageList.isLoading}
          current={switcherState.current}
          count={switcherState.count}
          toNext={toNext}
          toPrev={toPrev}
          toLast={toLast}
          toFirst={toFirst}
        />
      )}
      <Scrollbars
        ref={scrollRef}
        onUpdate={onUpdate}
        universal
        autoHide
        className={cn('scrollbar')}
      >
        {messageList.data.map(getMessage)}
      </Scrollbars>
    </StyledMessageList>
  );
}

const StyledMessageList = styled('div')`
  flex: 1;

  margin-top: 8px;

  height: 100%;
  width: 100%;

  position: relative;

  .message-switcher {
    position: absolute;
    right: 30px;
    top: 0;

    z-index: 10;

    max-width: 300px;
  }
`;
