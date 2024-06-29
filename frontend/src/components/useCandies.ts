import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchData } from '../store/actions';
import { Candy } from '../models/candy-model';
import { getReduxCandies, hasError, isLoading } from '../store/selectors';

const useCandies = (aggregateKey: keyof Candy | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const candies = useSelector((state: RootState) => getReduxCandies(state, aggregateKey));
  const loading = useSelector((state: RootState) => isLoading(state));
  const error = useSelector((state: RootState) => hasError(state));

  //fetches API data
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return { candies, loading, error };
};

export default useCandies;
