import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchData } from '../store/actions';
import { Candy } from '../models/candy-model';

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

const aggregateByKey = (candies: Candy[], key: keyof Candy): AggregatedCandy[] => {
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

const useCandies = (aggregateKey: keyof Candy | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const { candies, loading, error } = useSelector((state: RootState) => {
    const reduxCandies = aggregateKey ?
      aggregateByKey(state.candyReducer.data, aggregateKey).map((row, index) => ({ id: index, ...row }))
      : state.candyReducer.data.map((row, index) => ({ id: index, ...row, date: formatDate((row as Candy).date) }))

    return { candies: reduxCandies, loading: state.candyReducer.loading, error: state.candyReducer.error }
  })

  //fetches API data
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return { candies, loading, error };
};

export default useCandies;
