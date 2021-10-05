import { createAction, props } from '@ngrx/store';

export const isLoading = createAction(
  '[Configuração Geral] informa loading da tela.',
  props<{ isLoading: boolean }>(),
);

export const setPerfil = createAction(
  '[Configuração Geral] guarda o perfil do usuário logado.',
  props<{ emailLogado: string, tipoUsuarioLogado: 'A' | 'F' | 'P' }>(),
);

export const setMsgDeErro = createAction(
  '[Configuração Geral] guarda a mensagem de erro do sistema.',
  props<{ mensagemDeErro: string }>(),
);

export const limpaMsgDeErro = createAction('[Configuração Geral] limpa a mensagem de erro do sistema.');

export const clearState = createAction('[Configuração Geral] limpa o state.');
