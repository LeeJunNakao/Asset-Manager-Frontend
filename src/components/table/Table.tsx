import { v4 as uuidv4 } from 'uuid';
import { FaTrash } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { TableData, TableProps } from './protocols';
import { formatRowItem } from './fns';
import './style.scss';

export default function Table(props: TableProps) {
  const headerData: string[] =
    props.data[0] &&
    Object.keys(props.data[0]).filter((key: string) =>
      props.exclude ? !props.exclude.includes(key) : true
    );

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

  const items = props.data.map((item: TableData) => (
    <div className="table-row" style={componentStyle} key={uuidv4()}>
      {headerData.map(formatRowItem(props, item))}
      <div className="actions">
        <FaTrash
          className="icon"
          onClick={() => props.onDelete && props.onDelete(item)}
        />
        <MdModeEditOutline
          className="icon"
          onClick={() => props.onEdit && props.onEdit(item)}
        />
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
