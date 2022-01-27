import { v4 as uuidv4 } from 'uuid';
import { TableData, TableProps, Masks } from './protocols';

export const formatRowItem =
  (props: TableProps, item: TableData) => (headerItem: string) => {
    const mask = props.masks && props.masks[headerItem];
    const rawValue = item[headerItem];
    const value = mask ? mask(rawValue, item) : rawValue;
    return (
      <div
        key={uuidv4()}
        onClick={() => props.onClick && props.onClick(item)}
        className={props.onClick && 'row-data'}
      >
        {value}
      </div>
    );
  };
