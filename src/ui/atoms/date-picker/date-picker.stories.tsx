import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { DatePicker } from './date-picker.component';

import { Input } from '../input';

storiesOf('Design System|Atoms/date-picker', module)
  .add('default', () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    );
  })
  .add('range', () => {
    const minDate = new Date('2020.02.01');
    const maxDate = new Date('2020.04.12');

    const [startDate, setStartDate] = useState<Date | null>(minDate);
    const [endDate, setEndDate] = useState<Date | null>(maxDate);

    // console.log(startDate);
    // console.log(endDate);

    return (
      <div style={{ display: 'flex' }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={endDate}
          dateFormat='MM.dd.yyyy'
          customInput={<Input />}
          //   isClearable
          //   placeholderText='Start date'
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={maxDate}
          dateFormat='MM.dd.yyyy'
          customInput={<Input />}
          //   isClearable
          //   placeholderText='End date'
        />
      </div>
    );
  });
