import { ActionReducer, Action, createReducer, on } from '@ngrx/store';
import { TipoUsuario } from 'src/app/models/usuario.model';

import * as Actions from './actions';

export const configuracaoGeralFeatureKey = 'configuracao-geral-state';

export interface ConfiguracaoGeralState {
  isLoading: boolean;
  isLoggedIn: boolean;
  emailLogado: string;
  tipoUsuarioLogado: TipoUsuario;
  mensagemDeErro: string;
}

export const initialState: ConfiguracaoGeralState = {
  isLoading: false,
  isLoggedIn: false,
  emailLogado: undefined,
  tipoUsuarioLogado: null,
  mensagemDeErro: undefined,
};

export const configuracaoGeralReduce: ActionReducer<ConfiguracaoGeralState, Action> = createReducer(
  initialState,
  on(Actions.isLoading, (state, { isLoading }) => ({ ...state, isLoading })),
  on(Actions.isLoggedIn, (state, { isLoggedIn }) => ({ ...state, isLoggedIn })),
  on(Actions.setPerfil, (state, { emailLogado, tipoUsuarioLogado }) => ({
    ...state,
    emailLogado,
    tipoUsuarioLogado
  })),
  on(Actions.setMsgDeErro, (state, { mensagemDeErro }) => ({
    ...state,
    mensagemDeErro
  })),
  on(Actions.limpaMsgDeErro, (state) => ({
    ...state,
    mensagemDeErro: undefined
  })),
  on(Actions.clearState, (state) => ({
    ...state,
    ...initialState,
  }))
);

export function reducers(state: ConfiguracaoGeralState, action: Action) {
  return configuracaoGeralReduce(state, action);
}
