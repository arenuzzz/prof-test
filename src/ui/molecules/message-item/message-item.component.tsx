import * as React from 'react';
import { styled } from '@styles/theming';
import { Avatar } from '@ui/atoms/avatar';
import cn from 'classnames';

export type MessageVariant = 'normal' | 'search';
export type MessageMode = 'admin';
export type MessagePosition = 'left' | 'right';

export type MessageTypeProps = {
  imgSrc?: string;
  content?: string;
  name?: string;
  nickname?: string;
  timeStamp?: number | string;
  variant: MessageVariant;
  mode?: MessageMode;
  position: MessagePosition;
};

const StyledMessageWrapper = styled('div')`
  display: flex;
  justify-content: center;

  &.search {
    background-color: ${(p) => p.theme.colors.blue_2};
    padding: 7px 30px;

    .group-message {
      background-color: ${(p) => p.theme.colors.white_1};
    }
  }

  .container {
    max-width: 870px;
    width: 100%;
  }
`;

const StyledMessage = styled('div')`
  display: flex;
  max-width: 587px;
  flex-direction: column;
  padding: 12px 24px 16px 12px;
  background-color: ${(p) => p.theme.colors.blue_2};
  border-radius: 12px 12px 12px 0;
  position: relative;
  z-index: 1;

  &.left {
    margin-right: auto;
  }

  &.right {
    margin-left: auto;
  }

  .avatar {
    display: flex;
    .avatar-img {
      margin: 0;
      background-color: ${(p) => p.theme.colors.white_1};
      svg {
        fill: ${(p) => p.theme.colors.black_1};
      }
    }

    .name {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 12px;
    }
    .title {
      font-weight: ${(p) => p.theme.fontWeights[1]};
      font-size: ${(p) => p.theme.fontSizes[1]}px;
      color: ${(p) => p.theme.colors.black_1};
      line-height: 19px;
    }
    .nickname {
      font-size: ${(p) => p.theme.fontSizes[5]}px;
      color: ${(p) => p.theme.colors.gray_1};
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    margin: 12px 0 12px 56px;
    p {
      font-size: ${(p) => p.theme.fontSizes[0]}px;
      font-weight: ${(p) => p.theme.fontWeights[0]};
      line-height: 160%;
    }
  }
  .timestamp {
    width: 100%;
    text-align: right;
    font-size: ${(p) => p.theme.fontSizes[5]}px;
    line-height: 15px;
    color: ${(p) => p.theme.colors.gray_1};
  }

  &.admin {
    background-color: ${(p) => p.theme.colors.blue_1};
    color: ${(p) => p.theme.colors.white_1};

    .timestamp {
      color: ${(p) => p.theme.colors.white_1};
    }

    .wrapper {
      display: flex;

      .content {
        flex: 1;
        margin: 0;
      }
    }

    width: 100%;
    max-width: 100%;
  }
`;

export const Message: React.FC<MessageTypeProps> = ({
  imgSrc,
  content,
  name,
  nickname,
  timeStamp,
  variant = 'normal',
  mode = '',
  position = 'left',
}) => {
  return (
    <StyledMessageWrapper
      className={cn('group-message-wrapper', mode, variant, position)}
    >
      <div className='container'>
        <StyledMessage className={cn('group-message', mode, variant, position)}>
          <div className='wrapper'>
            <div className='avatar'>
              <Avatar
                imgSrc={imgSrc}
                className='avatar-img'
                variant={mode === 'admin' ? 'avatar-admin' : 'default-avatar'}
              />
              <div className='name'>
                <span className='title'>{name}</span>
                <span className='nickname'>{nickname}</span>
              </div>
            </div>
            <div className='content'>
              <p>{content}</p>
            </div>
          </div>
          <div className='timestamp'>{timeStamp}</div>
        </StyledMessage>
      </div>
    </StyledMessageWrapper>
  );
};

export default Message;
