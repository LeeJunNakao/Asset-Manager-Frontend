import {
  ValidationPipeArg,
  ValidationType,
  InputConfig,
} from 'components/form/FormBuilder/protocols';
import errorMessages from './messages';

const getDefaultResult = () => ({ error: false, message: '' });

export const required = (item: InputConfig): ValidationPipeArg => {
  if (item.validation?.required) {
    const state = item.getState();
    const hasError = state === undefined || state === null || state === '';
    return {
      item,
      result: {
        error: hasError,
        message: hasError ? errorMessages.required : '',
      },
    };
  }

  return { item, result: getDefaultResult() };
};

export const callback = ({
  item,
  result,
}: ValidationPipeArg): ValidationPipeArg => {
  if (result.error) return { item, result };

  if (item.validation?.callback) {
    const state = item.getState();
    return {
      item,
      result: item.validation.callback(state),
    };
  }

  return {
    item,
    result,
  };
};

export const email = ({
  item,
  result,
}: ValidationPipeArg): ValidationPipeArg => {
  if (result.error) return { item, result };

  const regex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const state = item.getState();
  const isValid = regex.test(state);

  if (item.validation?.type === ValidationType.EMAIL) {
    return {
      item,
      result: {
        error: !isValid,
        message: isValid ? '' : errorMessages.email,
      },
    };
  }

  return {
    item,
    result,
  };
};

export const password = ({
  item,
  result,
}: ValidationPipeArg): ValidationPipeArg => {
  if (result.error) return { item, result };

  const regex = /((?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])){8,12}/;

  const state = item.getState();
  const isValid = regex.test(state);

  if (item.validation?.type === ValidationType.PASSWORD) {
    return {
      item,
      result: {
        error: !isValid,
        message: isValid ? '' : errorMessages.password,
      },
    };
  }

  return {
    item,
    result,
  };
};
