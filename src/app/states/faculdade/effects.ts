import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as FaculdadeActions from './actions';
import * as ConfiguracaoGeralActions from '../geral/actions';
import { FaculdadeService } from 'src/app/services/faculdade.service';
import { TipoUsuario } from 'src/app/models/usuario.model';

@Injectable({ providedIn: 'root' })
export class FaculdadeEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private faculdadeService: FaculdadeService,
    private router: Router
  ) {}

  getPerfilFaculdade$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FaculdadeActions.getPerfilFaculdade),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(() => {
          this.faculdadeService.obterPerfilFaculdade();
        }),
      ),
    { dispatch: false },
  );

  getPerfilFaculdadeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FaculdadeActions.getPerfilFaculdadeSuccess),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false})))
      ),
    { dispatch: false },
  );
}
