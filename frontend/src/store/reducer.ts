import { CandyActions } from "./store";
import { CandyShopState, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS } from "./store-types";

export const CandyReducer = (initialState: any) => (state = initialState, action: CandyActions): CandyShopState => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        data: state.data,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        error: null,
        loading: false,
        data: action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        data: [],
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
