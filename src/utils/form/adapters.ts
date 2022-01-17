import { Dispatch, SetStateAction } from 'react';
import {
  FormErrors,
  ValidationPipeArg,
} from 'components/form/FormBuilder/protocols';

export const generateFormErrors = (names: string[]): FormErrors => {
  const entries = names.map((n) => [n, { error: false, message: '' }]);

  return Object.fromEntries(entries);
};

export const updateFormErrors = (
  validationResult: ValidationPipeArg[],
  setFormError: Dispatch<SetStateAction<FormErrors>>
): FormErrors => {
  const formDataEntries = validationResult.map((result) => [
    result.item.title,
    result.result,
  ]);
  const formData: FormErrors = Object.fromEntries(formDataEntries);
  setFormError(formData);
  return formData;
};

export const isFormvalid = (formErrors: FormErrors): boolean => {
  return Object.values(formErrors).every((i) => i.error === false);
};
