// src/hooks/useReview.ts
import { useAppDispatch, useAppSelector } from "../redux";
import {
  addOrUpdateRevision,getHomologaciones,
  setRevisiones,
} from '../redux/justipreciacion/homologacion';
export interface PageRevision {
  observations: string;
  reviewer: string;
  reviewed_at: string;
}
export const useReview = () => {
  const revisiones = useAppSelector(getHomologaciones);
  const dispatch = useAppDispatch();

  const getPageRevision = (version: string, pageKey: `page${number}`): PageRevision | undefined => {
    const revision = revisiones.find((r) => r.version === version);
    return revision?.pages[pageKey];
  };

  const updatePageRevision = (
    version: string,
    pageKey: `page${number}`,
    observations: string,
    reviewer: string
  ) => {
    dispatch(addOrUpdateRevision({ version, pageKey, observations, reviewer }));
  };

  return {
    revisiones,
    getPageRevision,
    updatePageRevision,
    setRevisiones: (data: typeof revisiones) => dispatch(setRevisiones(data)),
  };
};
