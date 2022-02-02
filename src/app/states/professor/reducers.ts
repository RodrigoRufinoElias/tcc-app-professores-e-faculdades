import { ActionReducer, Action, createReducer, on } from '@ngrx/store';

import * as Actions from './actions';
import { Aluno } from 'src/app/models/aluno.model';
import { Professor } from 'src/app/models/professor.model';
import { AvaliacaoProfessor } from 'src/app/models/avaliacaoProfessor';
import { ComentarioProfessor } from 'src/app/models/comentarioProfessor';

export const professorFeatureKey = 'professor-state';

export interface ProfessorState {
  idFirebase: string;
  professor: Professor;
  avaliacoesProfessor: AvaliacaoProfessor[];
  comentariosProfessor: ComentarioProfessor[];
  alunoDoComentario: Aluno;
}

export const initialState: ProfessorState = {
  idFirebase: undefined,
  professor: null,
  avaliacoesProfessor: [],
  comentariosProfessor: [],
  alunoDoComentario: null
};

export const professorReduce: ActionReducer<ProfessorState, Action> = createReducer(
  initialState,
  on(Actions.getPerfilProfessorSuccess, (state, { idFirebase, professor }) => ({
    ...state,
    idFirebase,
    professor
  })),
  on(Actions.getAvaliacoesEComentariosProfessor, (state) => ({
    ...state,
    avaliacoesProfessor: [],
    comentariosProfessor: []
  })),
  on(Actions.getAvaliacoesEComentariosProfessorSuccess, (state, { avaliacoesProfessor, comentariosProfessor }) => ({
    ...state,
    avaliacoesProfessor,
    comentariosProfessor
  })),
  on(Actions.getAlunoDoComentario, (state) => ({
    ...state,
    alunoDoComentario: null
  })),
  on(Actions.getAlunoDoComentarioSuccess, (state, { aluno }) => ({
    ...state,
    alunoDoComentario: aluno
  })),
  on(Actions.clearState, (state) => ({
    ...state,
    ...initialState,
  }))
);

export function reducers(state: ProfessorState, action: Action) {
  return professorReduce(state, action);
}
