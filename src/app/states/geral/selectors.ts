import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfiguracaoGeralState, configuracaoGeralFeatureKey } from './reducers';

export const configuracaoGeralState = createFeatureSelector<ConfiguracaoGeralState>(
  configuracaoGeralFeatureKey,
);

export const selectIsLoading = createSelector(
  configuracaoGeralState,
  (c) => c.isLoading,
);

export const selectIsLoggedIn = createSelector(
  configuracaoGeralState,
  (c) => c.isLoggedIn,
);

export const selectMensagemDeErro = createSelector(
  configuracaoGeralState,
  (c) => c.mensagemDeErro,
);

export const selectPerfil = createSelector(
  configuracaoGeralState,
  (c) => {
    return {
      emailLogado: c.emailLogado,
      tipoUsuarioLogado: c.tipoUsuarioLogado
    }
  },
);
