// src/hooks/useReview.ts
import { useAppDispatch, useAppSelector } from "../redux";
import {
  getRevisionData,
  getIsReviewing,
  getActiveRevision,
  startRevision,
  submitRevision,
  addSuggestion
} from '../redux/justipreciacion/homologacion/revisiones';
import { RevisionEntry, RevisionSuggestion } from '../redux/justipreciacion/homologacion/revisiones/revisiones.interface';

export const useReview = () => {
  const revisionData = useAppSelector(getRevisionData);
  const isReviewing = useAppSelector(getIsReviewing);
  const activeRevision = useAppSelector(getActiveRevision);
  const dispatch = useAppDispatch();

  const getRevision = (version: string): RevisionEntry | undefined => {
    return revisionData?.revisiones.find((r) => r.version === version);
  };

  const startNewRevision = (reviewer: string) => {
    const version = `v${Date.now()}`;
    dispatch(startRevision({ reviewer, version }));
  };

  const addRevisionSuggestion = (suggestion: RevisionSuggestion) => {
    dispatch(addSuggestion(suggestion));
  };

  const submitCurrentRevision = (generalComments?: string) => {
    dispatch(submitRevision({ generalComments }));
  };

  return {
    revisionData,
    isReviewing,
    activeRevision,
    getRevision,
    startNewRevision,
    addRevisionSuggestion,
    submitCurrentRevision,
  };
};
