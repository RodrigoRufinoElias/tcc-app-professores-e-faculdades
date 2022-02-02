import { createAction, props } from '@ngrx/store';

import { Professor } from 'src/app/models/professor.model';
import { Aluno } from 'src/app/models/aluno.model';
import { AvaliacaoProfessor } from 'src/app/models/avaliacaoProfessor';
import { ComentarioProfessor } from 'src/app/models/comentarioProfessor';

export const getPerfilProfessor = createAction('[Professor] obtém o perfil do professor logado.');

export const getPerfilProfessorSuccess = createAction(
  '[Professor] sucesso ao obter o perfil do professor logado.',
  props<{ idFirebase: string, professor: Professor }>(),
);

export const getAvaliacoesEComentariosProfessor = createAction(
  '[Professor] obtém as avaliações e comentários de um professor.',
  props<{ idProfessor: number }>(),
);

export const getAvaliacoesEComentariosProfessorSuccess = createAction(
  '[Professor] sucesso ao obter as avaliações e comentários de um professor.',
  props<{ avaliacoesProfessor: AvaliacaoProfessor[], comentariosProfessor: ComentarioProfessor[] }>(),
);

export const getAlunoDoComentario = createAction(
  '[Professor] obtém o perfil do aluno do comentário.',
  props<{ idAluno: number }>(),
);

export const getAlunoDoComentarioSuccess = createAction(
  '[Professor] sucesso ao obter o perfil do aluno do comentário.',
  props<{ aluno: Aluno }>(),
);

export const responderComentario = createAction(
  '[Professor] respondosta ao comentário.',
  props<{ resposta: ComentarioProfessor }>(),
);

export const clearState = createAction('[Professor] limpa o state.');
