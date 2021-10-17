import { ActionReducer, Action, createReducer, on } from '@ngrx/store';

import { Professor } from 'src/app/models/professor.model';
import { TipoUsuario } from 'src/app/models/usuario.model';
import * as Actions from './actions';

export const professorFeatureKey = 'professor-state';

export interface ProfessorState {
  idFirebase: string;
  professor: Professor;
}

export const initialState: ProfessorState = {
  idFirebase: undefined,
  professor: null
};

export const professorReduce: ActionReducer<ProfessorState, Action> = createReducer(
  initialState,
  on(Actions.getPerfilProfessorSuccess, (state, { idFirebase, professor }) => ({
    ...state,
    idFirebase,
    professor
  })),
  on(Actions.clearState, (state) => ({
    ...state,
    ...initialState,
  }))
);

export function reducers(state: ProfessorState, action: Action) {
  return professorReduce(state, action);
}
