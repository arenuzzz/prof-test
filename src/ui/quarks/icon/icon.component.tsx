import * as React from 'react';
import { ReactComponent as IconCheck } from '@assets/images/sprite-images/i-check.svg';
import { ReactComponent as IconClose } from '@assets/images/sprite-images/i-close.svg';
import { ReactComponent as IconCloseFull } from '@assets/images/sprite-images/i-close-full.svg';
import { ReactComponent as IconDeleteSvg } from '@assets/images/sprite-images/i-delete.svg';
import { ReactComponent as IconDown } from '@assets/images/sprite-images/i-down.svg';
import { ReactComponent as IconSearch } from '@assets/images/sprite-images/i-search.svg';
import { ReactComponent as IconLogo } from '@assets/images/sprite-images/i-logo.svg';
import { ReactComponent as IconSocialGroup } from '@assets/images/sprite-images/i-social-group.svg';
import { ReactComponent as IconDefaultAvatar } from '@assets/images/sprite-images/i-default-avatar.svg';
import { ReactComponent as IconAlert } from '@assets/images/sprite-images/i-alert.svg';
import { ReactComponent as IconSearchSuccess } from '@assets/images/sprite-images/i-search-success.svg';
import { ReactComponent as IconSearchFail } from '@assets/images/sprite-images/i-search-fail.svg';
import { ReactComponent as IconAttachment } from '@assets/images/sprite-images/i-attachment.svg';
import { ReactComponent as IconSearchPerson } from '@assets/images/sprite-images/i-search-person.svg';
import { ReactComponent as IconMessagePerson } from '@assets/images/sprite-images/i-mess-person.svg';
import { ReactComponent as IconMessageClock } from '@assets/images/sprite-images/i-mess-clock.svg';
import { ReactComponent as IconChevronLeft } from '@assets/images/sprite-images/i-chevron-left.svg';
import { ReactComponent as IconArrowDown } from '@assets/images/sprite-images/i-arrow-down.svg';
import { ReactComponent as IconAvatarAdmin } from '@assets/images/sprite-images/i-avatar-admin.svg';

export type ComponentSvg = React.FC<React.SVGProps<SVGSVGElement>>;
export type IconVariant =
  | 'check'
  | 'chevron-left'
  | 'arrow-down'
  | 'close'
  | 'close-full'
  | 'delete'
  | 'down'
  | 'search'
  | 'search-success'
  | 'search-fail'
  | 'social-group'
  | 'default-avatar'
  | 'logo'
  | 'attachment'
  | 'search-person'
  | 'mess-person'
  | 'mess-clock'
  | 'alert'
  | 'avatar-admin';

export type IconVariantComponents = {
  [T in IconVariant]: ComponentSvg;
};

export type IconProps = {
  variant: IconVariant;
  className?: string;
  style?: React.CSSProperties;
};

const variantComponents: IconVariantComponents = {
  check: IconCheck,
  'chevron-left': IconChevronLeft,
  'arrow-down': IconArrowDown,
  close: IconClose,
  'close-full': IconCloseFull,
  delete: IconDeleteSvg,
  down: IconDown,
  search: IconSearch,
  'search-success': IconSearchSuccess,
  'search-fail': IconSearchFail,
  logo: IconLogo,
  'social-group': IconSocialGroup,
  'search-person': IconSearchPerson,
  'mess-clock': IconMessageClock,
  'mess-person': IconMessagePerson,
  'default-avatar': IconDefaultAvatar,
  alert: IconAlert,
  attachment: IconAttachment,
  'avatar-admin': IconAvatarAdmin,
};

export const Icon: React.FC<IconProps> = ({ variant, ...props }) => {
  const Component = variantComponents[variant];

  return Component ? <Component {...props} /> : null;
};

export default Icon;
