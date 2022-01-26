import { ActionReducer, Action, createReducer, on } from '@ngrx/store';

import { Aluno } from 'src/app/models/aluno.model';
import * as Actions from './actions';
import { Faculdade } from 'src/app/models/faculdade.model';
import { Professor } from 'src/app/models/professor.model';
import { AvaliacaoFaculdade } from 'src/app/models/avaliacaoFaculdade';
import { ComentarioFaculdade } from 'src/app/models/comentarioFaculdade';
import { AvaliacaoProfessor } from 'src/app/models/avaliacaoProfessor';
import { ComentarioProfessor } from 'src/app/models/comentarioProfessor';

export const alunoFeatureKey = 'aluno-state';

export interface AlunoState {
  idFirebase: string;
  aluno: Aluno;
  faculdades: Faculdade[];
  avaliacoesFaculdade: AvaliacaoFaculdade[];
  comentariosFaculdade: ComentarioFaculdade[];
  professores: Professor[];
  avaliacoesProfessor: AvaliacaoProfessor[];
  comentariosProfessor: ComentarioProfessor[];
  alunoDoComentario: Aluno;
}

export const initialState: AlunoState = {
  idFirebase: undefined,
  aluno: null,
  faculdades: [],
  avaliacoesFaculdade: [],
  comentariosFaculdade: [],
  professores: [],
  avaliacoesProfessor: [],
  comentariosProfessor: [],
  alunoDoComentario: null,
};

export const alunoReduce: ActionReducer<AlunoState, Action> = createReducer(
  initialState,
  on(Actions.getPerfilAlunoSuccess, (state, { idFirebase, aluno }) => ({
    ...state,
    idFirebase,
    aluno
  })),
  on(Actions.getFaculdadesAlunoSuccess, (state, { faculdades }) => ({
    ...state,
    faculdades
  })),
  on(Actions.getAvaliacoesEComentariosFaculdade, (state) => ({
    ...state,
    avaliacoesFaculdade: [],
    comentariosFaculdade: []
  })),
  on(Actions.getAvaliacoesEComentariosFaculdadeSuccess, (state, { avaliacoesFaculdade, comentariosFaculdade }) => ({
    ...state,
    avaliacoesFaculdade,
    comentariosFaculdade
  })),
  on(Actions.getProfessoresAlunoSuccess, (state, { professores }) => ({
    ...state,
    professores
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

export function reducers(state: AlunoState, action: Action) {
  return alunoReduce(state, action);
}
