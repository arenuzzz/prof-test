import React from 'react';
import { useStore } from '@lib/effector';

import {
  $messagesCount,
  $searchGroupMessagesParams,
  sendMessage,
  freezeSendMessageDateTimeChanged,
} from '@features/search/model/group-messages-search';

import {
  MessageSendPanel,
  MessageSendPanelProps,
} from './message-send-panel.component';

export type MessageSendPanelContainerProps = Omit<
  MessageSendPanelProps,
  'onSubmit'
>;

export function MessageSendPanelContainer({
  data,
}: MessageSendPanelContainerProps) {
  const messagesCount = useStore($messagesCount);

  React.useEffect(() => {
    if (data.unfreezeSendDateTime) {
      freezeSendMessageDateTimeChanged(data.unfreezeSendDateTime);
    }
  }, [data.unfreezeSendDateTime]);

  async function onSubmit(values, form) {
    sendMessage({
      groupId: data.id as number,
      message: values.message,
    });

    setTimeout(() => {
      form.reset();
    }, 0);
  }

  return messagesCount.data > 0 || messagesCount.status === 'initial' ? (
    <MessageSendPanel data={data} onSubmit={onSubmit} />
  ) : null;
}
