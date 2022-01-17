import Input from 'components/inputs/Input/Input';
import { FieldsData, FormProps, FormData, InputConfig } from './protocols';

export const inferInput = (property: InputConfig): any => {
  const inputTypes = {
    input: Input,
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
    const setState = (stateValue: any) =>
      setFieldsData({ ...fieldsData, [p.title]: stateValue });

    return {
      ...p,
      getState: () => fieldsData[p.title],
      setState,
    };
  }),
});
