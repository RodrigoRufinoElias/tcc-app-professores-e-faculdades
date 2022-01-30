import { ActionReducer, Action, createReducer, on } from '@ngrx/store';

import * as Actions from './actions';
import { Faculdade } from 'src/app/models/faculdade.model';
import { Aluno } from 'src/app/models/aluno.model';
import { AvaliacaoFaculdade } from 'src/app/models/avaliacaoFaculdade';
import { ComentarioFaculdade } from 'src/app/models/comentarioFaculdade';

export const faculdadeFeatureKey = 'faculdade-state';

export interface FaculdadeState {
  idFirebase: string;
  faculdade: Faculdade;
  avaliacoesFaculdade: AvaliacaoFaculdade[];
  comentariosFaculdade: ComentarioFaculdade[];
  alunoDoComentario: Aluno;
}

export const initialState: FaculdadeState = {
  idFirebase: undefined,
  faculdade: null,
  avaliacoesFaculdade: [],
  comentariosFaculdade: [],
  alunoDoComentario: null
};

export const faculdadeReduce: ActionReducer<FaculdadeState, Action> = createReducer(
  initialState,
  on(Actions.getPerfilFaculdadeSuccess, (state, { idFirebase, faculdade }) => ({
    ...state,
    idFirebase,
    faculdade
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

export function reducers(state: FaculdadeState, action: Action) {
  return faculdadeReduce(state, action);
}
