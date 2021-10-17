import { ActionReducer, Action, createReducer, on } from '@ngrx/store';

import { Faculdade } from 'src/app/models/faculdade.model';
import { TipoUsuario } from 'src/app/models/usuario.model';
import * as Actions from './actions';

export const faculdadeFeatureKey = 'faculdade-state';

export interface FaculdadeState {
  idFirebase: string;
  faculdade: Faculdade;
}

export const initialState: FaculdadeState = {
  idFirebase: undefined,
  faculdade: null
};

export const faculdadeReduce: ActionReducer<FaculdadeState, Action> = createReducer(
  initialState,
  on(Actions.getPerfilFaculdadeSuccess, (state, { idFirebase, faculdade }) => ({
    ...state,
    idFirebase,
    faculdade
  })),
  on(Actions.clearState, (state) => ({
    ...state,
    ...initialState,
  }))
);

export function reducers(state: FaculdadeState, action: Action) {
  return faculdadeReduce(state, action);
}
