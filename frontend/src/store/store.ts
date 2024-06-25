import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { CandyReducer } from './reducer';
import { CandyActions, CandyShopState } from './store-types';

export const initialState: CandyShopState = {
  data: [],
  loading: false,
  error: null,
};

export const rootReducer = combineReducers({
  candyReducer: CandyReducer(initialState)
});

type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type { RootState, CandyActions };
