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
export type SelectOption<T> = {
  value: T;
  label: string;
};

type Options<T> = Array<SelectOption<T>>;

export type MultiselectData<T> = Set<T>;

export interface InputConfig {
  title: string;
  label: string;
  type: string;
  inputStyle: 'input' | 'select' | 'multiselect';
  properties?: this;
  getState: () => any;
  setState: (state: any) => void;
  validation?: ValidationConfig;
  options?: Options<any>;
}

export type InputConfigProp = Omit<InputConfig, 'getState' | 'setState'>;

export type InputProp = {
  label?: string;
  type?: string;
  setContent: (value: string) => void;
  config?: InputConfig;
  error?: boolean;
  errorMessage?: string;
  data?: string;
};

export interface MultiselectProp<T>
  extends Omit<InputProp, 'data' | 'setContent'> {
  options: Options<T>;
  data: T[];
  setContent: (value: T[]) => void;
}

export interface SelectProp<T> extends Omit<InputProp, 'data' | 'setContent'> {
  options: Options<T>;
  data?: T | null;
  setContent: (value: T) => void;
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
