import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContent from 'components/page-content/PageContent';
import FormBuilder from 'components/form/FormBuilder/FormBuilder';
import Table from 'components/table/Table';
import { Payload, InputConfig } from 'components/form/FormBuilder/protocols';
import { SiAddthis } from 'react-icons/si';
import { ImHome } from 'react-icons/im';
import { VscListFlat } from 'react-icons/vsc';
import { selectAssets, updateAsset, addAsset, removeAsset } from 'store/asset';
import MessageBox from 'components/cards/MessageBox';
import { editAsset, createAsset, deleteAsset } from 'http-services/asset';
import { Asset as AssetEntity } from 'entities/asset';

function Asset() {
  const [payload, setPayload] = useState({} as Payload);
  const [mode, setMode] = useState('list');
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [responseError, setResponseError] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
  const assets = useSelector(selectAssets);

  const dispatch = useDispatch();

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

  const create = async () => {
    try {
      const response = await createAsset(payload as Omit<AssetEntity, 'id'>);
      dispatch(addAsset(response));
      setMode('list');
    } catch (error) {}
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

      const response = await editAsset(value as AssetEntity);

      dispatch(updateAsset(response));
      setMode('list');
    } catch (error) {}
  };

  const onDelete = async (data: Payload) => {
    try {
      await deleteAsset(data.id);
      dispatch(removeAsset(data));
    } catch (error) {}
  };

  const forms =
    mode === 'create' ? (
      <FormBuilder
        formData={formData}
        onSubmit={create}
        loading={awaitingResponse}
        formError={responseError}
        setPayload={setPayload}
      />
    ) : mode === 'edit' ? (
      <FormBuilder
        formData={formData}
        filledData={selectedItem}
        onSubmit={onEdit}
        loading={awaitingResponse}
        formError={responseError}
        setPayload={setPayload}
      />
    ) : (
      mode === 'list' && (
        <Table
          data={assets}
          onEdit={handleEdit}
          onDelete={onDelete}
          exclude={['id', 'user_id']}
        />
      )
    );

  return (
    <div id="asset-page" className="page-wrapper">
      <PageContent text="Asset" menu={menu}>
        {mode === 'list' && !assets.length ? (
          <MessageBox message="no item" />
        ) : (
          forms
        )}
      </PageContent>
    </div>
  );
}

export default Asset;
