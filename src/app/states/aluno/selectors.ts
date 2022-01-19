import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlunoState, alunoFeatureKey } from './reducers';

export const alunoState = createFeatureSelector<AlunoState>(
  alunoFeatureKey,
);

export const selectIdFirebaseAluno = createSelector(
  alunoState,
  (c) => c.idFirebase,
);

export const selectAluno = createSelector(
  alunoState,
  (c) => c.aluno,
);

export const selectIdAluno = createSelector(
  alunoState,
  (c) => c.aluno.id,
);

export const selectFaculdades = createSelector(
  alunoState,
  (c) => c.faculdades,
);

export const selectAvaliacoes = createSelector(
  alunoState,
  (c) => c.avaliacoes,
);

export const selectComentarios = createSelector(
  alunoState,
  (c) => c.comentarios,
);
