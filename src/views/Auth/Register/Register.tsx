import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from 'http-services/auth';
import FormBuilder from 'components/form/FormBuilder/FormBuilder';
import {
  Payload,
  InputConfig,
  ValidationType,
} from 'components/form/FormBuilder/protocols';
import { setLogin } from 'store/auth';
function Register() {
  const [responseError, setResponseError] = useState('');
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [payload, setPayload] = useState({} as Payload);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formData = {
    title: 'Login',
    properties: [
      {
        title: 'name',
        label: 'Name',
        type: 'text',
        inputStyle: 'input' as InputConfig['inputStyle'],
        validation: {
          required: true,
        },
      },
      {
        title: 'email',
        label: 'Email',
        type: 'text',
        inputStyle: 'input' as InputConfig['inputStyle'],
        validation: {
          required: true,
          type: ValidationType.EMAIL,
        },
      },
      {
        title: 'password',
        label: 'Password',
        type: 'password',
        inputStyle: 'input' as InputConfig['inputStyle'],
        validation: {
          required: true,
          type: ValidationType.PASSWORD,
        },
      },
      {
        title: 'repeatPassword',
        label: 'Repeat password',
        type: 'password',
        inputStyle: 'input' as InputConfig['inputStyle'],
        validation: {
          required: true,
          callback: (repeatValue: string) =>
            repeatValue === payload.password
              ? { error: false, message: '' }
              : { error: true, message: 'Must be equal to password' },
        },
      },
    ],
  };

  const submit = async () => {
    try {
      setAwaitingResponse(true);
      const { name, email, password } = payload;
      const { token } = await register({ name, email, password });
      localStorage.setItem('access_token', token);

      dispatch(setLogin());
      navigate('/');
    } catch (error: any) {
      setResponseError(error.response.data.message);
      setAwaitingResponse(false);
    }
  };

  return (
    <div>
      <FormBuilder
        formData={formData}
        btnColor={'black'}
        onSubmit={submit}
        formError={responseError}
        loading={awaitingResponse}
        setPayload={setPayload}
      />
    </div>
  );
}

export default Register;
