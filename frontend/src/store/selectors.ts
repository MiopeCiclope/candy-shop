import { createSelector } from 'reselect';
import { Candy } from '../models/candy-model';
import { RootState } from './store';

interface AggregatedCandy {
  name: string;
  totalEaten: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const aggregateCandyByKey = (candies: Candy[], key: keyof Candy): AggregatedCandy[] => {
  const candyMap: { [name: string]: number } = {};

  candies.forEach((candy) => {
    if (!candyMap[candy[key]]) {
      candyMap[candy[key]] = 0;
    }
    candyMap[candy[key]] += candy.eaten;
  });

  return Object.keys(candyMap).map((name) => ({
    name,
    totalEaten: candyMap[name],
  }));
}

const getCandyData = (state: RootState) => state.candyReducer.data;
const getAggregateKey = (_: RootState, aggregateKey: string | null) => aggregateKey;

export const isLoading = (state: RootState) => state.candyReducer.loading;
export const hasError = (state: RootState) => state.candyReducer.error;

export const getReduxCandies = createSelector(
  [getCandyData, getAggregateKey],
  (candyData, key) => {
    if (key) {
      return aggregateCandyByKey(candyData, key as keyof Candy).map((row, index) => ({ id: index, ...row }));
    }
    return candyData.map((row, index) => ({ id: index, ...row, date: formatDate((row as Candy).date) }));
  }
);
