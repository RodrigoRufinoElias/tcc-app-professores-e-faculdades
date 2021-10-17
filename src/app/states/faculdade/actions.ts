import { createAction, props } from '@ngrx/store';

import { Faculdade } from 'src/app/models/faculdade.model';
import { Professor } from 'src/app/models/professor.model';
import { Aluno } from 'src/app/models/aluno.model';

export const getPerfilFaculdade = createAction('[Faculdade] obtém o perfil da faculdade logado.');

export const getPerfilFaculdadeSuccess = createAction(
  '[Faculdade] sucesso ao obter o perfil da faculdade logado.',
  props<{ idFirebase: string, faculdade: Faculdade }>(),
);

export const clearState = createAction('[Faculdade] limpa o state.');
