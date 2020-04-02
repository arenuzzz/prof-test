import React from 'react';
import { useStore } from '@lib/effector';

import {
  $messagesCount,
  $searchGroupMessagesParams,
} from '@features/search/model/group-messages-search';

import { MessageList } from './message-list.component';
import { ContentNotFound } from '../content-not-found';
import { Preloader } from '@ui/atoms/preloader';

// import { useSize } from 'react-use';

export type MessageListContainerProps = {};

export function MessageListContainer(props: MessageListContainerProps) {
  const messagesCount = useStore($messagesCount);
  const searchParams = useStore($searchGroupMessagesParams);

  const hasSteps =
    !!searchParams.keyword ||
    (Array.isArray(searchParams.profilesIds) &&
      searchParams.profilesIds.length > 0);

  const groupId = props.data.id as number;

  if (messagesCount.isLoading) {
    return <Preloader title='The data is being loaded now' />;
  }

  return messagesCount.data > 0 || messagesCount.status === 'initial' ? (
    <MessageList
      {...props}
      groupId={groupId}
      hasSteps={hasSteps}
      messageCount={messagesCount.data}
    />
  ) : (
    <ContentNotFound className='center'>
      Taking into account parameters that you entered there are no messages
    </ContentNotFound>
  );
}
