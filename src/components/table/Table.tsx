import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaTrash } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { TableData, TableProps } from './protocols';
import { formatRowItem } from './fns';
import { FiX } from 'react-icons/fi';
import './style.scss';

export default function Table(props: TableProps) {
  const headerData: string[] =
    props.data[0] &&
    Object.keys(props.data[0]).filter((key: string) =>
      props.exclude ? !props.exclude.includes(key) : true
    );

  const [deletingItem, setDeletingItem] = useState<TableData | null>(null);

  const header = headerData
    ? headerData.map((key: string) => (
        <div className="header-item" key={uuidv4()}>
          {key}
        </div>
      ))
    : [];

  const componentStyle = {
    gridTemplateColumns: `${'1fr '.repeat(header.length)} 40px`,
  } as React.CSSProperties;

  const handleDelete = (item: TableData) => {
    if (deletingItem?.id === item.id) {
      if (props.onDelete) props.onDelete(item);
    } else {
      setDeletingItem(item);
    }
  };

  const DeleteIcons = (item: TableData) => {
    if (deletingItem?.id === item.id) {
      return [
        <FaTrash className="icon" onClick={() => handleDelete(item)} />,
        <FiX className="icon" onClick={() => setDeletingItem(null)} />,
      ];
    }
    return <FaTrash className="icon" onClick={() => handleDelete(item)} />;
  };

  const items = props.data.map((item: TableData) => (
    <div
      className={`table-row ${deletingItem?.id === item.id ? 'deleting' : ''}`}
      style={componentStyle}
      key={uuidv4()}
    >
      {headerData.map(formatRowItem(props, item))}
      <div className="actions">
        {DeleteIcons(item)}
        {(!deletingItem || !(deletingItem?.id === item.id)) && (
          <MdModeEditOutline
            className="icon"
            onClick={() => props.onEdit && props.onEdit(item)}
          />
        )}
      </div>
    </div>
  ));

  return (
    <div className="table-component">
      <div className="table-row header" style={componentStyle}>
        {header}
      </div>
      {items}
    </div>
  );
}
