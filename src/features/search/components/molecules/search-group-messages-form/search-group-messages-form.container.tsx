import React, { ReactElement } from 'react';
import { useStore } from 'effector-react';
import format from 'date-fns/format';

import {
  $initialSearchGroupMessagesFormValues,
  $checkedGroupProfileIdsInfo,
  searchGroupMessages,
} from '@features/search/model/group-messages-search';

import { SearchGroupMessagesForm } from './search-group-messages-form.component';

export type SearchGroupMessagesFormContainerProps = {
  minDate: Date;
  maxDate: Date;
};

function getISODate(date: Date): string {
  const formattedDate = format(date, 'yyyy-MM-dd');

  return formattedDate;
}

export function SearchGroupMessagesContainer({
  minDate,
  maxDate,
  data,
}: SearchGroupMessagesFormContainerProps): ReactElement {
  const initialValues = useStore($initialSearchGroupMessagesFormValues);

  console.log('Values', initialValues);
  // const minDate = new Date('2020.02.01');
  // const maxDate = new Date('2020.04.12');

  const groupId = data.id;

  // if (!initialValues.date) {
  //   initialValues.date = {
  //     fromDate: minDate,
  //     toDate: maxDate,
  //   };
  // }

  function onSubmit(values) {
    const { ids: profilesIds } = $checkedGroupProfileIdsInfo.getState();

    // console.log('values', values);
    // console.log('ids', profileIds);

    const formData = {
      groupId,
      profilesIds,
      date: {
        fromDate: getISODate(values.date.fromDate),
        toDate: getISODate(values.date.toDate),
      },
      keyword: values.keyword,
    };

    searchGroupMessages(formData);
  }

  return (
    <SearchGroupMessagesForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      // minDate={minDate}
      // maxDate={maxDate}
      groupId={groupId}
    />
  );
}
