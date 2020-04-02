import React from 'react';
import { useStore } from 'effector-react';
import {
  validateViberChatLinks,
  validateTelegramChatLinks,
  validateWhatsappChatLinks,
} from '@lib/validation/search';
import {
  $initialSearchGroupsFormValues,
  searchGroups,
} from '@features/search/model/groups-search-form';
import {
  SearchGroupsFormProps,
  SearchGroupsForm,
} from './search-groups-form.component';
import { ProfileTour } from '@features/tour/components/profile-tour';

export type SearchGroupsFormContainerProps = {};

const linkValidator = {
  viberLinks: validateViberChatLinks,
  telegramLinks: validateTelegramChatLinks,
  whatsappLinks: validateWhatsappChatLinks,
};

function getLinksData(key, { data, link }) {
  const newData = [...data];

  if (link) {
    const invalidLinkError = linkValidator[key] && linkValidator[key](link);

    if (!invalidLinkError) {
      newData.push(link);
    }
  }

  return newData.length ? Array.from(new Set(newData)) : [];
}

export function SearchGroupsFormContainer(
  props: SearchGroupsFormContainerProps
) {
  const initialValues = useStore($initialSearchGroupsFormValues);

  function onSubmit(values) {
    const formData = {};

    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === 'object') {
        if (value !== null && Array.isArray(value.data)) {
          const data = getLinksData(key, value);

          if (data.length) {
            formData[key] = data;
          }
        }
      } else if (value) {
        formData[key] = value;
      }
    });

    searchGroups(formData);
  }

  return <SearchGroupsForm onSubmit={onSubmit} initialValues={initialValues} />;
}
