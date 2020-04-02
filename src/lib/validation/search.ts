import {
  formatIncompletePhoneNumber,
  parsePhoneNumberFromString,
} from 'libphonenumber-js/max';
// import { phoneRegex } from './matches';
// function

function createSocialValidation(matcher: string) {
  return (value: string | undefined) => {
    if (!value) {
      return undefined;
    }

    if (value) {
      const match = value.startsWith(matcher);

      if (!match || value.length === matcher.length) {
        return `Entered link doesn't comply with format`;
      }
    }

    return undefined;
  };
}

export function validatePhone(
  value = {
    code: '',
    number: '',
    phoneNumber: '',
    phoneCode: '',
    countryCode: '',
  }
) {
  if (!value.phoneNumber) {
    return undefined;
  }

  const countryCode = value.countryCode.toUpperCase();

  const number = formatIncompletePhoneNumber(value.phoneNumber, countryCode);

  const parsedPhoneNumber = parsePhoneNumberFromString(number, countryCode);

  console.log('countryCode', countryCode);
  console.log('_____NUMBER', number);

  console.log('phoneNumber', value.phoneNumber);
  // console.log('parsed', parsedPhoneNumber);

  if (parsedPhoneNumber) {
    console.log('number', parsedPhoneNumber.number);
    console.log('valid', parsedPhoneNumber.isValid());
    console.log('possible', parsedPhoneNumber.isPossible());
  }

  if (
    !parsedPhoneNumber ||
    (parsedPhoneNumber && !parsedPhoneNumber.isValid())
  ) {
    return 'The phone number has been entered incorrectly';
  }

  return undefined;
}

export function validateInstagram(value: string) {
  if (!value) {
    return undefined;
  }

  if (value.match(/^[.]|[.]$/gm)) {
    return `Entered nickname doesn't comply with format`;
  }

  return undefined;
}

export function validateTelegram(value: string) {
  if (!value) {
    return undefined;
  }

  if (value.length === 1) {
    return undefined;
  }

  if (value.length < 6) {
    return `Entered nickname doesn't comply with format`;
  }

  return undefined;
}

const createFilterChatLink = (link: string) => (str: string) => {
  return !!str && str.startsWith(link) && str.length > link.length;
};

export const facebookLinkTemplate = 'https://www.facebook.com/';
export const vkLinkTemplate = 'https://vk.com/';
export const linkedinLinkTemplate = 'https://www.linkedin.com/in/';
export const instagramLinkTemplate = 'https://www.instagram.com/';
export const whatsappChatLinkTemplate = 'https://chat.whatsapp.com/';
export const viberChatLinkTemplate = 'https://invite.viber.com/';
export const telegramChatLinkTemplate = 'https://t.me/';

export const filterWhatsappChatLink = createFilterChatLink(
  whatsappChatLinkTemplate
);
export const filterViberChatLink = createFilterChatLink(viberChatLinkTemplate);
export const filterTelegramChatLink = createFilterChatLink(
  telegramChatLinkTemplate
);

export const validateFacebook = createSocialValidation(facebookLinkTemplate);
export const validateVkontakte = createSocialValidation(vkLinkTemplate);
// const validateInstagram = createSocialValidation(instagramLinkTemplate);
export const validateLinkedIn = createSocialValidation(linkedinLinkTemplate);

export const validateWhatsappChatLinks = createSocialValidation(
  whatsappChatLinkTemplate
);
export const validateViberChatLinks = createSocialValidation(
  viberChatLinkTemplate
);
export const validateTelegramChatLinks = createSocialValidation(
  telegramChatLinkTemplate
);
