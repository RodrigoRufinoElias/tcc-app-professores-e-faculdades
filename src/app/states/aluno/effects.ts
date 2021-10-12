import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as AlunoActions from './actions';
import * as ConfiguracaoGeralActions from '../geral/actions';
import { AlunoService } from 'src/app/services/aluno.service';
import { TipoUsuario } from 'src/app/models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AlunoEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private alunoService: AlunoService,
    private router: Router
  ) {}

  getPerfilAluno$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AlunoActions.getPerfilAluno),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(() => {
          this.alunoService.obterPerfilAluno();
        }),
      ),
    { dispatch: false },
  );

  getPerfilAlunoSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AlunoActions.getPerfilAlunoSuccess),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false})))
      ),
    { dispatch: false },
  );
}
