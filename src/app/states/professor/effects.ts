import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as ProfessorActions from './actions';
import * as ConfiguracaoGeralActions from '../geral/actions';
import { ProfessorService } from 'src/app/services/professor.service';
import { TipoUsuario } from 'src/app/models/usuario.model';

@Injectable({ providedIn: 'root' })
export class ProfessorEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private professorService: ProfessorService,
    private router: Router
  ) {}

  getPerfilProfessor$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfessorActions.getPerfilProfessor),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(() => {
          this.professorService.obterPerfilProfessor();
        }),
      ),
    { dispatch: false },
  );

  getPerfilProfessorSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfessorActions.getPerfilProfessorSuccess),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false})))
      ),
    { dispatch: false },
  );
}
