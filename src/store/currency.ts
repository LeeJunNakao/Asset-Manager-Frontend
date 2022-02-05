import { createSlice } from '@reduxjs/toolkit';
import { Currency } from 'entities/currency';

interface State {
  currencies: Currency[];
  selectedCurrency: Currency | null;
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currencies: [],
    selectedCurrency: null,
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
    setSelectedCurrency: (state, action: { payload: Currency }) => {
      state.selectedCurrency = action.payload;
    },
  },
});

export const selectCurrencies = (state: any) =>
  (state.currency as State).currencies;
export const getSelectedCurrency = (state: any) =>
  (state.currency as State).selectedCurrency;

export const {
  setCurrencies,
  updateCurrency,
  addCurrency,
  removeCurrency,
  setSelectedCurrency,
} = currencySlice.actions;
export default currencySlice.reducer;
