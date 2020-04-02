import React, { ReactNode, ReactElement } from 'react';
import {
  Form as FinalForm,
  Field,
  FormProps as FinalFormProps,
  FormSpy,
} from 'react-final-form';
import TextareaAutosize from 'react-textarea-autosize';

import { Button } from '@ui/atoms/button';
import ReactTimer, {
  TimerControls,
  TimerProps,
} from 'react-compound-timer/build';
import { styled } from '@styles/theming';
import { Form } from '@ui/molecules/form';
import { SearchType } from '@features/search/search.constants';
import { SearchGroupSubheaderData } from '@features/search/search.types';
import { useStore } from 'effector-react';

import {
  $freezeSendMessageMs,
  freezeSendMessageDateTimeChanged,
} from '@features/search/model/group-messages-search';

export type MessageSendPanelProps = FinalFormProps & {
  data: SearchGroupSubheaderData;
};

export type SendMessageTimerProps = TimerProps & {
  children: (
    data: TimerControls & {
      getTimer: () => ReactNode;
    }
  ) => ReactNode;
};

const messageLimits = {
  [SearchType.WHATSAPP]: 65356,
  [SearchType.VIBER]: 7000,
  [SearchType.TELEGRAM]: 4096,
};

function getMessageLimit(type: SearchType): number {
  return messageLimits[type] || 65356;
}

function SendMessageTimer({
  children,
  isOverTimer,
  isStartTimer,
  ...props
}: SendMessageTimerProps) {
  const freezeSendMessageMs = useStore($freezeSendMessageMs);

  React.useEffect(() => {
    if (freezeSendMessageMs > 0) {
      isStartTimer();
    } else {
      isOverTimer();
    }
  }, [freezeSendMessageMs]);

  if (freezeSendMessageMs <= 0) {
    return children({ content: 'SEND', haveTime: false });
  }

  return (
    <ReactTimer
      {...props}
      checkpoints={[
        {
          time: 0,
          callback: isOverTimer,
        },
      ]}
      initialTime={freezeSendMessageMs}
      direction='backward'
      formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
    >
      {(timerProps) => {
        const haveTime = timerProps.getTime() > 0;

        const btnContent = haveTime ? (
          <>
            <ReactTimer.Hours />:
            <ReactTimer.Minutes />:
            <ReactTimer.Seconds />
          </>
        ) : (
          'SEND'
        );

        return children({ content: btnContent, haveTime });
      }}
    </ReactTimer>
  );
}

export function MessageSendPanel({ data, onSubmit }) {
  const messageLimit = getMessageLimit(data.type);
  const [isTimer, setIsTimer] = React.useState(false);

  function isOverTimer() {
    setIsTimer(false);
  }

  function isStartTimer() {
    setIsTimer(true);
  }

  return (
    <FinalForm
      // onSubmit={onSubmit}
      onSubmit={() => {}}
      subscription={{}}
      render={({ handleSubmit }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <StyledMessageSendPanel>
              <Field<string>
                name='message'
                render={({ input }) => {
                  return (
                    <TextareaAutosize
                      value={input.value}
                      onChange={input.onChange}
                      placeholder='Enter message'
                      // disabled={isTimer}
                      disabled
                      maxRows={6}
                      maxLength={messageLimit}
                      // disabled
                    />
                  );
                }}
              />
              <FormSpy
                subscription={{ submitting: true, pristine: true }}
                render={({ submitting, pristine }) => {
                  return (
                    <SendMessageTimer
                      isOverTimer={isOverTimer}
                      isStartTimer={isStartTimer}
                    >
                      {({ content, haveTime }) => {
                        return (
                          <Button
                            type='submit'
                            variant='secondary'
                            className='btn-send'
                            disabled
                            // disabled={submitting || pristine || haveTime}
                          >
                            {content}
                          </Button>
                        );
                      }}
                    </SendMessageTimer>
                  );
                }}
              />
            </StyledMessageSendPanel>
          </Form>
        );
      }}
    />
  );
}

const StyledMessageSendPanel = styled('div')`
  margin: 16px 0;
  /* height: 40px; */

  display: flex;
  align-items: flex-end;

  .btn-send {
    width: 170px;
    margin-left: 18px;
  }

  textarea {
    flex: 1;
    min-height: 40px;
    padding: 11px 14px;
    height: 100%;
    width: 100%;

    font-family: 'Inter';
    color: ${(p) => p.theme.colors.gray_1};
    font-size: 14px;
    line-height: 17px;

    border: 1px solid #eeeeee;
    border-radius: 4px;

    &:disabled {
      opacity: 0.4;
      background-color: ${(p) => p.theme.colors.gray_2};

      &::placeholder {
        opacity: 0.5;
      }
    }
  }
`;
