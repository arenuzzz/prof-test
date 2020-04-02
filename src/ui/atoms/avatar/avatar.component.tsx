import * as React from 'react';
import { styled } from '@styles/theming';
import { Icon } from '@ui/quarks/icon';

export type AvatarTypeProps = {
  imgSrc?: string;
  className?: string;
  variant?: string;
};

const StyledAvatar = styled(`div`)<AvatarTypeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 12px 16px 16px;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  background-color: ${(p) => p.theme.colors.gray_2};
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
  }
  .default-avatar {
    fill: ${(p) => p.theme.colors.gray_1};
  }
`;

export const Avatar: React.FC<AvatarTypeProps> = ({
  imgSrc = '',
  className = '',
  variant = 'default-avatar',
}) => {
  const variantIcon =
    variant === 'default-avatar' ? (
      <Icon className='default-avatar' variant='default-avatar' />
    ) : variant === 'avatar-admin' ? (
      <Icon className='default-avatar' variant='avatar-admin' />
    ) : (
      <Icon className='default-avatar' variant='social-group' />
    );
  return (
    <StyledAvatar className={className}>
      {imgSrc ? <img src={imgSrc} alt='' /> : variantIcon}
    </StyledAvatar>
  );
};
