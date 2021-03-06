import { createAction, props } from '@ngrx/store';

import { Faculdade } from 'src/app/models/faculdade.model';
import { Professor } from 'src/app/models/professor.model';
import { Aluno } from 'src/app/models/aluno.model';
import { AvaliacaoFaculdade } from 'src/app/models/avaliacaoFaculdade';
import { ComentarioFaculdade } from 'src/app/models/comentarioFaculdade';
import { AvaliacaoProfessor } from 'src/app/models/avaliacaoProfessor';
import { ComentarioProfessor } from 'src/app/models/comentarioProfessor';

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
  props<{ avaliacoesFaculdade: AvaliacaoFaculdade[], comentariosFaculdade: ComentarioFaculdade[] }>(),
);

export const avaliarFaculdade = createAction(
  '[Aluno] avaliar e comentar sobre a faculdade.',
  props<{ idFaculdade: number, idAluno: number, avaliacao: number, comentario: string }>(),
);

export const comentarFaculdade = createAction(
  '[Aluno] comentar sobre a faculdade.',
  props<{ idFaculdade: number, idAluno: number, comentario: string }>(),
);

export const getAlunoDoComentario = createAction(
  '[Aluno] obtém o perfil do aluno do comentário.',
  props<{ idAluno: number }>(),
);

export const getAlunoDoComentarioSuccess = createAction(
  '[Aluno] sucesso ao obter o perfil do aluno do comentário.',
  props<{ aluno: Aluno }>(),
);

export const getProfessoresAluno = createAction('[Aluno] obtém os professores do aluno logado.');

export const getProfessoresAlunoSuccess = createAction(
  '[Aluno] sucesso ao obter os professores do aluno logado.',
  props<{ professores: Professor[] }>(),
);

export const getAvaliacoesEComentariosProfessor = createAction(
  '[Aluno] obtém as avaliações e comentários de um professor.',
  props<{ idProfessor: number }>(),
);

export const getAvaliacoesEComentariosProfessorSuccess = createAction(
  '[Aluno] sucesso ao obter as avaliações e comentários de um professor.',
  props<{ avaliacoesProfessor: AvaliacaoProfessor[], comentariosProfessor: ComentarioProfessor[] }>(),
);

export const avaliarProfessor = createAction(
  '[Aluno] avaliar e comentar sobre o professor.',
  props<{ idProfessor: number, idAluno: number, avaliacao: number, comentario: string, grauBomRuim: number }>(),
);

export const comentarProfessor = createAction(
  '[Aluno] comentar sobre o professor.',
  props<{ idProfessor: number, idAluno: number, comentario: string, grauBomRuim: number }>(),
);

export const clearState = createAction('[Aluno] limpa o state.');
