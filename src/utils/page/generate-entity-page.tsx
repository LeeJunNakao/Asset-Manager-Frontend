import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContent, { MenuItem } from 'components/page-content/PageContent';
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
import { Masks } from 'components/table/protocols';

type GenerateConfig = {
  title: string;
  formData: FormData<InputConfigProp>;
  table?: {
    exclude?: string[];
    onClick?: (item: Payload) => void;
    masks?: Masks;
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
};

type Props = {
  upperChildren?: JSX.Element;
  menu?: MenuItem[];
};

export function generatePage(config: GenerateConfig) {
  return function PageModel(props?: Props) {
    const [payload, setPayload] = useState({} as Payload);
    const [mode, setMode] = useState('list');
    const [awaitingResponse, setAwaitingResponse] = useState(false);
    const [responseError, setResponseError] = useState('');
    const [selectedItem, setSelectedItem] = useState({});
    const items = useSelector(config.store.selectItems) as Payload[];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const create = async () => {
      try {
        const response = await config.service.createItem(payload as Payload);
        dispatch(config.store.addItem(response));
        setMode('list');
      } catch (error) {
        setResponseError('Failed to create');
      }
    };

    const menu = [
      ...(props?.menu || []),
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

        const response = await config.service.editItem(value as Payload);

        dispatch(config.store.updateItem(response));
        setMode('list');
      } catch (error) {
        setResponseError('Failed to edit');
      }
    };

    const onDelete = async (data: Payload) => {
      try {
        await config.service.deleteItem(data.id);
        dispatch(config.store.removeItem(data));
      } catch (error) {
        setResponseError('Failed to delete');
      }
    };

    const Forms =
      mode === 'create' ? (
        <FormBuilder
          formData={config.formData}
          onSubmit={create}
          loading={awaitingResponse}
          formError={responseError}
          setPayload={setPayload}
        />
      ) : mode === 'edit' ? (
        <FormBuilder
          formData={config.formData}
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
            onClick={config.table?.onClick}
            exclude={config.table?.exclude || ['id', 'user_id']}
            masks={config.table?.masks}
          />
        )
      );

    return (
      <div id="asset-page" className="page-wrapper">
        <PageContent text={config.title} menu={menu}>
          {props?.upperChildren}
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
