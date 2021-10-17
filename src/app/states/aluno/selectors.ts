import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlunoState, alunoFeatureKey } from './reducers';

export const alunoState = createFeatureSelector<AlunoState>(
  alunoFeatureKey,
);

export const selectAluno = createSelector(
  alunoState,
  (c) => c.aluno,
);

export const selectIdFirebaseAluno = createSelector(
  alunoState,
  (c) => c.idFirebase,
);
