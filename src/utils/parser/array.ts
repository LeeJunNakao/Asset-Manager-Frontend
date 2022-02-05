type Key = string | number;
type Item = {
  [key: Key]: any;
};
type GroupedItems = {
  [key: Key]: Item[];
};

export const groupBy = (items: Item[], key: Key): GroupedItems => {
  return items.reduce((acc: GroupedItems, curr: Item) => {
    const data: GroupedItems = {
      ...acc,
      [curr[key]]: [...(acc[curr[key]] || []), curr],
    };

    return data;
  }, {});
};
