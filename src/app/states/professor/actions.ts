import { createAction, props } from '@ngrx/store';

import { Faculdade } from 'src/app/models/faculdade.model';
import { Professor } from 'src/app/models/professor.model';
import { Aluno } from 'src/app/models/aluno.model';

export const getPerfilProfessor = createAction('[Professor] obtém o perfil do professor logado.');

export const getPerfilProfessorSuccess = createAction(
  '[Professor] sucesso ao obter o perfil do professor logado.',
  props<{ idFirebase: string, professor: Professor }>(),
);

export const clearState = createAction('[Professor] limpa o state.');
