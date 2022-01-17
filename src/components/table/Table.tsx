import './Table.scss';
import { FaTrash } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';

interface TableData {
  [key: string]: any;
}

interface TableProps {
  data: TableData;
  exclude?: String[];
}

export default function Table(props: TableProps) {
  const headerData = Object.keys(props.data[0]).filter((key: string) =>
    props.exclude ? !props.exclude.includes(key) : true
  );

  const header = headerData.map((key: string) => (
    <div className="header-item">{key}</div>
  ));

  const componentStyle = {
    'grid-template-columns': '1fr '.repeat(header.length),
  } as React.CSSProperties;

  const items = props.data.map((item: TableData) => (
    <div className="table-row" style={componentStyle}>
      {headerData.map((h) => (
        <div>{item[h]}</div>
      ))}
      <div className="actions">
        <FaTrash className="icon" />
        <MdModeEditOutline className="icon" />
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
