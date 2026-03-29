import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from './rootReducer';
import type { AppDispatch } from './store';

/** Hook de dispatch tipado — úsalo en lugar de useDispatch */
export const useAppDispatch: () => AppDispatch = useDispatch;

/** Hook de selector tipado — úsalo en lugar de useSelector */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;