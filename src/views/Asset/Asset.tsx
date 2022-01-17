import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContent from 'components/page-content/PageContent';
import FormBuilder from 'components/form/FormBuilder/FormBuilder';
import Table from 'components/table/Table';
import { Payload, InputConfig } from 'components/form/FormBuilder/protocols';
import { SiAddthis } from 'react-icons/si';
import { ImHome } from 'react-icons/im';
import { VscListFlat } from 'react-icons/vsc';
import { assets } from './assets-data';

function Asset() {
  const [payload, setPayload] = useState({} as Payload);
  const [mode, setMode] = useState('list');
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [responseError, setResponseError] = useState('');

  const formData = {
    title: 'Asset',
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
        title: 'code',
        label: 'Code',
        type: 'text',
        inputStyle: 'input' as InputConfig['inputStyle'],
        validation: {
          required: true,
        },
      },
    ],
  };

  const submit = () => {
    console.log(payload);
  };

  const navigate = useNavigate();

  const menu = [
    {
      icon: ImHome,
      text: 'home',
      onClick: () => navigate('/'),
    },
    {
      icon: mode === 'create' ? VscListFlat : SiAddthis,
      text: mode === 'create' ? 'list' : 'create',
      onClick:
        mode === 'create' ? () => setMode('list') : () => setMode('create'),
    },
  ];

  return (
    <div id="asset-page" className="page-wrapper">
      <PageContent text="Asset" menu={menu}>
        {mode === 'create' && (
          <FormBuilder
            formData={formData}
            onSubmit={submit}
            loading={awaitingResponse}
            formError={responseError}
            setPayload={setPayload}
          />
        )}
        {mode === 'list' && <Table data={assets} exclude={['id', 'user_id']} />}
      </PageContent>
    </div>
  );
}

export default Asset;
