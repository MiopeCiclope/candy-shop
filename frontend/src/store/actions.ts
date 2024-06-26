import { ThunkAction } from '@reduxjs/toolkit';
import { Candy } from '../models/candy-model';
import { Response } from '../models/response-model';
import { CandyActions, RootState } from './store';
import { FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS } from './store-types';

export const getAllCandy = (): Promise<Response<Candy[]>> =>
  fetch('/api/candy')
    .then(response => response.json())
    .then(response => {
      if (!response.isSuccessful) {
        throw new Error("Error fetching candy");
      }
      return response;
    })

export const fetchData = (): ThunkAction<void, RootState, unknown, CandyActions> => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    try {
      const response = await getAllCandy()
      dispatch({
        type: FETCH_DATA_SUCCESS, payload: response.data
      });
    } catch (error: any) {
      dispatch({ type: FETCH_DATA_FAILURE, error: error.message });
    }
  };
};
