export const toISODate = (date: Date) => date.toISOString().split('T')[0];

export const sortByDate = (a: { date: Date }, b: { date: Date }) =>
  a.date.getTime() - b.date.getTime();
