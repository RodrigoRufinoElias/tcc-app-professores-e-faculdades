import { createAction, props } from '@ngrx/store';

import { Faculdade } from 'src/app/models/faculdade.model';
import { Aluno } from 'src/app/models/aluno.model';
import { AvaliacaoFaculdade } from 'src/app/models/avaliacaoFaculdade';
import { ComentarioFaculdade } from 'src/app/models/comentarioFaculdade';

export const getPerfilFaculdade = createAction('[Faculdade] obtém o perfil da faculdade logado.');

export const getPerfilFaculdadeSuccess = createAction(
  '[Faculdade] sucesso ao obter o perfil da faculdade logado.',
  props<{ idFirebase: string, faculdade: Faculdade }>(),
);

export const getAvaliacoesEComentariosFaculdade = createAction(
  '[Faculdade] obtém as avaliações e comentários de uma faculdade.',
  props<{ idFaculdade: number }>(),
);

export const getAvaliacoesEComentariosFaculdadeSuccess = createAction(
  '[Faculdade] sucesso ao obter as avaliações e comentários de uma faculdade.',
  props<{ avaliacoesFaculdade: AvaliacaoFaculdade[], comentariosFaculdade: ComentarioFaculdade[] }>(),
);

export const getAlunoDoComentario = createAction(
  '[Faculdade] obtém o perfil do aluno do comentário.',
  props<{ idAluno: number }>(),
);

export const getAlunoDoComentarioSuccess = createAction(
  '[Faculdade] sucesso ao obter o perfil do aluno do comentário.',
  props<{ aluno: Aluno }>(),
);

export const responderComentario = createAction(
  '[Faculdade] respondosta ao comentário.',
  props<{ resposta: ComentarioFaculdade }>(),
);

export const clearState = createAction('[Faculdade] limpa o state.');
