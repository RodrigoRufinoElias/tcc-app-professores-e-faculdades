import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfessorState, professorFeatureKey } from './reducers';

export const professorState = createFeatureSelector<ProfessorState>(
  professorFeatureKey,
);

export const selectProfessor = createSelector(
  professorState,
  (c) => c.professor,
);

export const selectIdFirebaseProfessor = createSelector(
  professorState,
  (c) => c.idFirebase,
);

export const selectAvaliacoesProfessor = createSelector(
  professorState,
  (c) => c.avaliacoesProfessor,
);

export const selectComentariosProfessor = createSelector(
  professorState,
  (c) => c.comentariosProfessor,
);

export const selectAlunoDoComentario = createSelector(
  professorState,
  (c) => c.alunoDoComentario,
);
