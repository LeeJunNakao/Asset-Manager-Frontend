export type TableData = {
  [key: string]: any;
};

export type Masks = {
  [field: string]: (value: string, item: TableData) => string;
};

export interface TableProps {
  data: TableData;
  exclude?: String[];
  masks?: Masks;
  onDelete?: (data: TableData) => any;
  onEdit?: (data: TableData) => any;
  onClick?: (data: TableData) => any;
}
