import { createAction, props } from '@ngrx/store';

import { TipoUsuario } from 'src/app/models/usuario.model';
import { Faculdade } from 'src/app/models/faculdade.model';

export const isLoading = createAction(
  '[Configuração Geral] informa loading da tela.',
  props<{ isLoading: boolean }>(),
);

export const isLoggedIn = createAction(
  '[Configuração Geral] informa se o usuário está logado.',
  props<{ isLoggedIn: boolean }>(),
);

export const setPerfil = createAction(
  '[Configuração Geral] guarda o perfil do usuário logado.',
  props<{ emailLogado: string, tipoUsuarioLogado: TipoUsuario }>(),
);

export const setMsgDeErro = createAction(
  '[Configuração Geral] guarda a mensagem de erro do sistema.',
  props<{ mensagemDeErro: string }>(),
);

export const limpaMsgDeErro = createAction('[Configuração Geral] limpa a mensagem de erro do sistema.');

export const clearState = createAction('[Configuração Geral] limpa o state.');

export const verificarPerfilExistente = createAction(
  '[Configuração Geral] verifica se o perfil existe na base.',
  props<{ email: string }>(),
);

export const salvarPerfilAluno = createAction(
  '[Configuração Geral] salva o perfil do aluno.',
  props<{ email: string, nome: string, listaFaculdades: Faculdade[] }>(),
);
