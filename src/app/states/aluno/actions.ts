import { createAction, props } from '@ngrx/store';

import { Faculdade } from 'src/app/models/faculdade.model';
import { Professor } from 'src/app/models/professor.model';
import { Aluno } from 'src/app/models/aluno.model';

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

export const clearState = createAction('[Aluno] limpa o state.');
