import { Dispatch, SetStateAction } from 'react';

export enum ValidationType {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface ValidationConfig {
  required?: boolean;
  type?: ValidationType;
  callback?: (arg?: any) => any;
}

export interface ValidationResult {
  error: boolean;
  message: string;
}

export interface ValidationPipeArg {
  item: InputConfig;
  result: ValidationResult;
}
export type SelectOption = {
  value: string;
  label: string;
};

type Options = Array<string | SelectOption>;

export interface InputConfig {
  title: string;
  label: string;
  type: string;
  inputStyle: 'input' | 'select';
  properties?: this;
  getState: () => any;
  setState: (state: any) => void;
  validation?: ValidationConfig;
  options?: Options;
}

export type InputConfigProp = Omit<InputConfig, 'getState' | 'setState'>;

export type InputProp = {
  label: string;
  type?: string;
  setContent: (value: string) => void;
  config?: InputConfig;
  error?: boolean;
  errorMessage?: string;
  data?: string;
};

export interface SelectProp extends Omit<InputProp, 'data' | 'setContent'> {
  options: Options;
  data: Options;
  setContent: (value: Options) => void;
}

export interface FormErrors {
  [field: string]: {
    error: boolean;
    message: string;
  };
}

export interface Payload {
  [field: string]: any;
}

export interface FormData<T> {
  title: string;
  properties: T[];
}

export interface FormProps {
  loading?: boolean;
  formData: FormData<InputConfigProp>;
  formError?: string;
  btnColor?: string;
  filledData?: Payload;
  setPayload: Dispatch<SetStateAction<Payload>>;
  onSubmit?: (args?: any) => void;
  setErrors?: Dispatch<SetStateAction<FormErrors>>;
}

export interface FieldsData {
  [field: string]: any;
}
