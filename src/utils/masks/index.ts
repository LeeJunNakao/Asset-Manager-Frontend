export const maskCurrency = (
  value: number,
  decimals: number,
  currencyCode: string
): string => {
  return `${value.toFixed(decimals)} ${currencyCode}`;
};
