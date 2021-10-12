import { ActionReducer, Action, createReducer, on } from '@ngrx/store';

import { Aluno } from 'src/app/models/aluno.model';
import { TipoUsuario } from 'src/app/models/usuario.model';
import * as Actions from './actions';

export const alunoFeatureKey = 'aluno-state';

export interface AlunoState {
  idFirebase: string;
  aluno: Aluno;
}

export const initialState: AlunoState = {
  idFirebase: undefined,
  aluno: null
};

export const alunoReduce: ActionReducer<AlunoState, Action> = createReducer(
  initialState,
  on(Actions.getPerfilAlunoSuccess, (state, { idFirebase, aluno }) => ({
    ...state,
    idFirebase,
    aluno
  })),
  on(Actions.clearState, (state) => ({
    ...state,
    ...initialState,
  }))
);

export function reducers(state: AlunoState, action: Action) {
  return alunoReduce(state, action);
}
