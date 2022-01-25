import { createSlice } from '@reduxjs/toolkit';
import { Portfolio } from 'entities/portfolio';

interface State {
  portfolios: Portfolio[];
}

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    portfolios: [],
  } as State,
  reducers: {
    setPortfolios: (state, action) => {
      state.portfolios = action.payload;
    },
    updatePortfolio: (state, action) => {
      const id = action.payload.id;
      const index = state.portfolios.findIndex((i) => i.id === id);
      const portfolios = [...state.portfolios];

      portfolios.splice(index, 1, action.payload);

      state.portfolios = portfolios;
    },
    addPortfolio: (state, action) => {
      state.portfolios = [...state.portfolios, action.payload];
    },
    removePortfolio: (state, action) => {
      const id = action.payload.id;
      const index = state.portfolios.findIndex((i) => i.id === id);
      const portfolios = [...state.portfolios];

      portfolios.splice(index, 1);

      state.portfolios = portfolios;
    },
  },
});

export const selectPortfolios = (state: any) => state.portfolio.portfolios;

export const { setPortfolios, updatePortfolio, addPortfolio, removePortfolio } =
  portfolioSlice.actions;
export default portfolioSlice.reducer;
