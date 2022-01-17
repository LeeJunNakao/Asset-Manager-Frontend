import { useState } from 'react';
import FormBuilder from 'components/form/FormBuilder/FormBuilder';
import {
  Payload,
  InputConfig,
  ValidationType,
} from 'components/form/FormBuilder/protocols';
import { recoverPassword } from 'http-services/auth';

function RecovePassword() {
  const [responseError, setResponseError] = useState('');
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [payload, setPayload] = useState({} as Payload);

  const formData = {
    title: 'Login',
    properties: [
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
    ],
  };

  const submit = async () => {
    try {
      setAwaitingResponse(true);
      const { email } = payload;
      await recoverPassword({ email });
    } catch (error: any) {
      setResponseError(error.response.data.message);
    } finally {
      setAwaitingResponse(false);
    }
  };

  return (
    <div>
      <FormBuilder
        formData={formData}
        formError={responseError}
        btnColor={'black'}
        loading={awaitingResponse}
        setPayload={setPayload}
        onSubmit={submit}
      />
    </div>
  );
}

export default RecovePassword;
