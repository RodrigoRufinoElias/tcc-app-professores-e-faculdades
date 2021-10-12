import { createAction, props } from '@ngrx/store';

import { Faculdade } from 'src/app/models/faculdade.model';
import { Professor } from 'src/app/models/professor.model';
import { Aluno } from 'src/app/models/aluno.model';

export const getPerfilAluno = createAction('[Aluno] obtém o perfil do aluno logado.');

export const getPerfilAlunoSuccess = createAction(
  '[Aluno] sucesso ao obter o perfil do aluno logado.',
  props<{ idFirebase: string, aluno: Aluno }>(),
);

export const clearState = createAction('[Aluno] limpa o state.');
