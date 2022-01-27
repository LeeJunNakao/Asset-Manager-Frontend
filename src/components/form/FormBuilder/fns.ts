import React, { forwardRef } from 'react';
import { Input, MultiSelect, Select, Datepicker } from 'components/inputs';
import {
  FieldsData,
  FormProps,
  FormData,
  InputConfig,
  InputProp,
  SelectProp,
  MultiselectProp,
} from './protocols';

export const inferInput = (
  property: InputConfig
): React.FC<InputProp> | React.FC<SelectProp> | React.FC<MultiselectProp> => {
  const inputTypes = {
    input: Input,
    select: Select,
    multiselect: MultiSelect,
    datepicker: Datepicker,
  };

  return inputTypes[property.inputStyle] || Input;
};

export const formatFormData = (
  props: FormProps,
  fieldsData: FieldsData,
  setFieldsData: React.Dispatch<React.SetStateAction<FieldsData>>
): FormData<InputConfig> => ({
  ...props.formData,
  properties: props.formData.properties.map((p) => {
    const setState = (stateValue: any) => {
      setFieldsData({ ...fieldsData, [p.title]: stateValue });
    };
    return {
      ...p,
      getState: () => fieldsData[p.title],
      setState,
    };
  }),
});
