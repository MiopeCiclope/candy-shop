import { Action } from "@reduxjs/toolkit";
import { Candy } from "../models/candy-model";

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export interface FetchDataRequestAction extends Action<typeof FETCH_DATA_REQUEST> { }
export interface FetchDataSuccessAction extends Action<typeof FETCH_DATA_SUCCESS> {
  payload: Candy[];
}
export interface FetchDataFailureAction extends Action<typeof FETCH_DATA_FAILURE> {
  error: string;
}

export type CandyActions = FetchDataRequestAction | FetchDataSuccessAction | FetchDataFailureAction;

export interface CandyShopState {
  data: Candy[];
  loading: boolean;
  error: string | null;
}
