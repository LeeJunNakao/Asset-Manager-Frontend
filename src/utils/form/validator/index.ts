import {
  InputConfig,
  ValidationPipeArg,
} from 'components/form/FormBuilder/protocols';
import { required, callback, email, password } from './validation-fns';
import { pipe } from 'utils/functions';

export const validator = (items: InputConfig[]): ValidationPipeArg[] => {
  return items.map((item) => {
    return pipe(item, required, email, password, callback);
  });
};
