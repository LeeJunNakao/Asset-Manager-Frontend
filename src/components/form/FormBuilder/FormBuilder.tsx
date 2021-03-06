import { useState, useEffect } from 'react';
import Button from 'components/buttons/Button/Button';
import {
  generateFormErrors,
  isFormvalid,
  updateFormErrors,
} from 'utils/form/adapters';
import { validator } from 'utils/form/validator';
import Loading from 'components/icons/Loading';
import { FormProps, FieldsData, FormData, InputConfig } from './protocols';
import { inferInput, formatFormData } from './fns';
import './styles.scss';

function FormBuilder(props: FormProps) {
  const [fieldsData, setFieldsData] = useState({} as FieldsData);

  useEffect(() => {
    props.setPayload(fieldsData);
  }, [fieldsData, props]);

  const formData: FormData<InputConfig> = formatFormData(
    props,
    fieldsData,
    setFieldsData
  );

  const [formErrors, setErrors] = useState(
    generateFormErrors(formData.properties.map((i) => i.title))
  );

  useEffect(() => {
    if (props.setErrors) props.setErrors(formErrors);
  }, [formErrors, props]);

  const buildedForm = formData.properties.map((p, idx) => {
    const Component = inferInput(p as InputConfig);
    const error = formErrors[p.title].error;
    const errorMessage = formErrors[p.title].message;
    const payload = props.filledData ? props.filledData[p.title] : '';

    return (
      <Component
        config={p}
        setContent={p.setState}
        key={idx.toString()}
        label={p.label}
        error={error}
        errorMessage={errorMessage}
        data={payload}
        options={p.options || []}
      ></Component>
    );
  });

  const onSubmit = async () => {
    const result = validator(formData.properties);
    const errors = updateFormErrors(result, setErrors);
    if (props.onSubmit && isFormvalid(errors)) props.onSubmit();
  };

  const Form = (
    <div className="form-component-wrapper">
      <>{buildedForm}</>
      <span className="message-error">{props.formError}</span>
      <div className="buttons-wrapper">
        {props.loading ? (
          <Loading />
        ) : (
          <Button
            text="Submit"
            onClick={onSubmit}
            color={props.btnColor || 'black'}
          />
        )}
      </div>
    </div>
  );

  return <>{Form}</>;
}

export default FormBuilder;
