import React, { ReactElement } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export type DatePickerProps = ReactDatePickerProps;

export function DatePicker(props: DatePickerProps) {
  return <ReactDatePicker {...props} />;
}
