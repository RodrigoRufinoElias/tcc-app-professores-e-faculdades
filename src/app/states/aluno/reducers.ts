import { ActionReducer, Action, createReducer, on } from '@ngrx/store';

import { Aluno } from 'src/app/models/aluno.model';
import { TipoUsuario } from 'src/app/models/usuario.model';
import * as Actions from './actions';
import { Faculdade } from 'src/app/models/faculdade.model';
import { Professor } from 'src/app/models/professor.model';

export const alunoFeatureKey = 'aluno-state';

export interface AlunoState {
  idFirebase: string;
  aluno: Aluno;
  faculdades: Faculdade[];
}

export const initialState: AlunoState = {
  idFirebase: undefined,
  aluno: null,
  faculdades: []
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
  on(Actions.clearState, (state) => ({
    ...state,
    ...initialState,
  }))
);

export function reducers(state: AlunoState, action: Action) {
  return alunoReduce(state, action);
}
