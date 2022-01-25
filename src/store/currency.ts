import { createSlice } from '@reduxjs/toolkit';
import { Currency } from 'entities/currency';

interface State {
  currencies: Currency[];
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currencies: [],
  } as State,
  reducers: {
    setCurrencies: (state, action) => {
      state.currencies = action.payload;
    },
    updateCurrency: (state, action) => {
      const id = action.payload.id;
      const index = state.currencies.findIndex((i) => i.id === id);
      const currencies = [...state.currencies];

      currencies.splice(index, 1, action.payload);

      state.currencies = currencies;
    },
    addCurrency: (state, action) => {
      state.currencies = [...state.currencies, action.payload];
    },
    removeCurrency: (state, action) => {
      const id = action.payload.id;
      const index = state.currencies.findIndex((i) => i.id === id);
      const currencies = [...state.currencies];

      currencies.splice(index, 1);

      state.currencies = currencies;
    },
  },
});

export const selectCurrencies = (state: any) => state.currency.currencies;

export const { setCurrencies, updateCurrency, addCurrency, removeCurrency } =
  currencySlice.actions;
export default currencySlice.reducer;
