import { createAction, props } from '@ngrx/store';

import { Faculdade } from 'src/app/models/faculdade.model';
import { Professor } from 'src/app/models/professor.model';
import { Aluno } from 'src/app/models/aluno.model';
import { AvaliacaoFaculdade } from 'src/app/models/avaliacaoFaculdade';
import { ComentarioFaculdade } from 'src/app/models/comentarioFaculdade';

export const getPerfilAluno = createAction('[Aluno] obtém o perfil do aluno logado.');

export const getPerfilAlunoSuccess = createAction(
  '[Aluno] sucesso ao obter o perfil do aluno logado.',
  props<{ idFirebase: string, aluno: Aluno }>(),
);

export const getFaculdadesAluno = createAction('[Aluno] obtém as faculdades do aluno logado.');

export const getFaculdadesAlunoSuccess = createAction(
  '[Aluno] sucesso ao obter as faculdades do aluno logado.',
  props<{ faculdades: Faculdade[] }>(),
);

export const getAvaliacoesEComentariosFaculdade = createAction(
  '[Aluno] obtém as avaliações e comentários de uma faculdade.',
  props<{ idFaculdade: number }>(),
);

export const getAvaliacoesEComentariosFaculdadeSuccess = createAction(
  '[Aluno] sucesso ao obter as avaliações e comentários de uma faculdade.',
  props<{ avaliacoes: AvaliacaoFaculdade[], comentarios: ComentarioFaculdade[] }>(),
);

export const avaliarFaculdade = createAction(
  '[Aluno] avaliar a faculdade.',
  props<{ idFaculdade: number, idAluno: number, avaliacao: number, comentario: string }>(),
);

export const comentarFaculdade = createAction(
  '[Aluno] comentar sobre a faculdade.',
  props<{ idFaculdade: number, idAluno: number, comentario: string }>(),
);

export const clearState = createAction('[Aluno] limpa o state.');
