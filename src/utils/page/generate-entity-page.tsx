import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContent from 'components/page-content/PageContent';
import FormBuilder from 'components/form/FormBuilder/FormBuilder';
import Table from 'components/table/Table';
import { Payload, InputConfig } from 'components/form/FormBuilder/protocols';
import { SiAddthis } from 'react-icons/si';
import { ImHome } from 'react-icons/im';
import { VscListFlat } from 'react-icons/vsc';
import MessageBox from 'components/cards/MessageBox';
import {
  FormData,
  InputConfigProp,
} from 'components/form/FormBuilder/protocols';

interface Props {
  title: string;
  formData: FormData<InputConfigProp>;
  table?: {
    exclude?: string[];
  };
  service: {
    createItem: (i: any) => Promise<Payload>;
    editItem: (i: any) => Promise<Payload>;
    deleteItem: (id: number) => Promise<void>;
  };
  store: {
    selectItems: any;
    addItem: any;
    updateItem: any;
    removeItem: any;
  };
}

export function generatePage(props: Props) {
  return function PageModel() {
    const [payload, setPayload] = useState({} as Payload);
    const [mode, setMode] = useState('list');
    const [awaitingResponse, setAwaitingResponse] = useState(false);
    const [responseError, setResponseError] = useState('');
    const [selectedItem, setSelectedItem] = useState({});
    const items = useSelector(props.store.selectItems) as Payload[];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const create = async () => {
      try {
        const response = await props.service.createItem(payload as Payload);
        dispatch(props.store.addItem(response));
        setMode('list');
      } catch (error) {}
    };

    const menu = [
      {
        icon: ImHome,
        text: 'home',
        onClick: () => navigate('/'),
      },
      {
        icon: mode === 'create' ? VscListFlat : SiAddthis,
        text: mode === 'create' || mode === 'edit' ? 'list' : 'create',
        onClick:
          mode === 'create' || mode === 'edit'
            ? () => setMode('list')
            : () => setMode('create'),
      },
    ];

    const handleEdit = (data: Payload) => {
      setSelectedItem(data);
      setMode('edit');
    };

    const onEdit = async () => {
      try {
        const value = {
          ...selectedItem,
          ...payload,
        };

        const response = await props.service.editItem(value as Payload);

        dispatch(props.store.updateItem(response));
        setMode('list');
      } catch (error) {}
    };

    const onDelete = async (data: Payload) => {
      try {
        await props.service.deleteItem(data.id);
        dispatch(props.store.removeItem(data));
      } catch (error) {}
    };

    const Forms =
      mode === 'create' ? (
        <FormBuilder
          formData={props.formData}
          onSubmit={create}
          loading={awaitingResponse}
          formError={responseError}
          setPayload={setPayload}
        />
      ) : mode === 'edit' ? (
        <FormBuilder
          formData={props.formData}
          filledData={selectedItem}
          onSubmit={onEdit}
          loading={awaitingResponse}
          formError={responseError}
          setPayload={setPayload}
        />
      ) : (
        mode === 'list' && (
          <Table
            data={items as Payload}
            onEdit={handleEdit}
            onDelete={onDelete}
            exclude={props.table?.exclude || ['id', 'user_id']}
          />
        )
      );

    return (
      <div id="asset-page" className="page-wrapper">
        <PageContent text={props.title} menu={menu}>
          {mode === 'list' && !items.length ? (
            <MessageBox message="no item" />
          ) : (
            Forms
          )}
        </PageContent>
      </div>
    );
  };
}
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

export default generatePage;
