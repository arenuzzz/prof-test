import { FieldError } from '@api/profiler';

type FormErrors = {
  [index: string]: string;
};

export const EMPTY_ERROR = 'EMPTY_ERROR';

function is(error: any): boolean {
  const isError = error === EMPTY_ERROR ? true : !!error;

  return isError;
}

function getMessage(error: string): string | undefined {
  if (error == EMPTY_ERROR) {
    return;
  }

  return error;
}

function parseFieldErrorMessages(details: FieldError[]): FormErrors {
  const errors: FormErrors = {};

  details.forEach(({ field, message }) => {
    errors[field] = message;
  });

  return errors;
}

export const Error = {
  is,
  getMessage,
  parseFieldErrorMessages,
};
