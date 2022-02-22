import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useHomologationDispatch = () => useDispatch<AppDispatch>();
export const useHomologationSelector: TypedUseSelectorHook<RootState> = useSelector;