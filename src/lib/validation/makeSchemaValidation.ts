import objectPath from 'object-path';

export const parseAndSetYupErrors = (err) => {
  const errors = {};

  err.inner.forEach((error) =>
    objectPath.set(errors, error.path || 'error', error.message)
  );

  return errors;
};

export const makeSchemaValidation = async (
  values: Object,
  validationSchema,
  { field } = { field: false }
) => {
  let formErrors = field ? '' : {};

  try {
    await validationSchema.validate(values, { abortEarly: false });
  } catch (err) {
    // console.log('YUP Errors', err);

    if (field) {
      return err.errors[err.errors.length - 1];
    }

    formErrors = parseAndSetYupErrors(err);
  }

  return formErrors;
};
