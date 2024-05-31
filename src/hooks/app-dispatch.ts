import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store';

type DispatchFunction = () => AppDispatch;

const useAppDispatch: DispatchFunction = useDispatch;

export default useAppDispatch;
