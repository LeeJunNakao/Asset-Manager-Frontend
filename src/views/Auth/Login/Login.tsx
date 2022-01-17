import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from 'http-services/auth';
import FormBuilder from 'components/form/FormBuilder/FormBuilder';
import {
  Payload,
  ValidationType,
  InputConfig,
} from 'components/form/FormBuilder/protocols';
import { setLogin } from 'store/auth';
import './Login.scss';

interface LoginProps {
  setForm: (formName: string) => void;
}

function Login(props: LoginProps) {
  const [responseError, setResponseError] = useState('');
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [payload, setPayload] = useState({} as Payload);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async () => {
    try {
      setAwaitingResponse(true);
      const { email, password } = payload;
      const { token } = await login({ email, password });
      localStorage.setItem('access_token', token);
      dispatch(setLogin());
      navigate('/');
    } catch (error: any) {
      setResponseError(error.response.data.message);
    } finally {
      setAwaitingResponse(false);
    }
  };

  const formData = {
    title: 'Login',
    properties: [
      {
        title: 'email',
        label: 'Email',
        type: 'text',
        inputStyle: 'input' as InputConfig['inputStyle'],
        validation: {
          type: ValidationType.EMAIL,
          required: true,
        },
      },
      {
        title: 'password',
        label: 'Password',
        type: 'password',
        inputStyle: 'input' as InputConfig['inputStyle'],
        validation: {
          type: ValidationType.PASSWORD,
          required: true,
        },
      },
    ],
  };

  return (
    <div id="login-form">
      <FormBuilder
        formData={formData}
        onSubmit={submit}
        btnColor={'black'}
        formError={responseError}
        loading={awaitingResponse}
        setPayload={setPayload}
      />
      <div className="link-wrapper">
        <a href="#" onClick={() => props.setForm('recover')}>
          Recover password
        </a>
      </div>
    </div>
  );
}

export default Login;
