import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FaculdadeState, faculdadeFeatureKey } from './reducers';

export const faculdadeState = createFeatureSelector<FaculdadeState>(
  faculdadeFeatureKey,
);

export const selectFaculdade = createSelector(
  faculdadeState,
  (c) => c.faculdade,
);

export const selectIdFirebaseFaculdade = createSelector(
  faculdadeState,
  (c) => c.idFirebase,
);

export const selectAvaliacoesFaculdade = createSelector(
  faculdadeState,
  (c) => c.avaliacoesFaculdade,
);

export const selectComentariosFaculdade = createSelector(
  faculdadeState,
  (c) => c.comentariosFaculdade,
);

export const selectAlunoDoComentario = createSelector(
  faculdadeState,
  (c) => c.alunoDoComentario,
);
