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

export const selectAvaliacoesFaculdade = createSelector(
  alunoState,
  (c) => c.avaliacoesFaculdade,
);

export const selectComentariosFaculdade = createSelector(
  alunoState,
  (c) => c.comentariosFaculdade,
);

export const selectProfessores = createSelector(
  alunoState,
  (c) => c.professores,
);

export const selectAvaliacoesProfessor = createSelector(
  alunoState,
  (c) => c.avaliacoesProfessor,
);

export const selectComentariosProfessor = createSelector(
  alunoState,
  (c) => c.comentariosProfessor,
);

export const selectAlunoDoComentario = createSelector(
  alunoState,
  (c) => c.alunoDoComentario,
);
