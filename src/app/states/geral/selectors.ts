import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfiguracaoGeralState, configuracaoGeralFeatureKey } from './reducers';

export const configuracaoGeralState = createFeatureSelector<ConfiguracaoGeralState>(
  configuracaoGeralFeatureKey,
);

export const selectIsLoading = createSelector(
  configuracaoGeralState,
  (c) => c.isLoading,
);

export const selectMensagemDeErro = createSelector(
  configuracaoGeralState,
  (c) => c.mensagemDeErro,
);

export const selectPerfil = createSelector(
  configuracaoGeralState,
  (c) => { c.emailLogado, c.tipoUsuarioLogado },
);
