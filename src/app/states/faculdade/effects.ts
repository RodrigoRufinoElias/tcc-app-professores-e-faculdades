import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import * as FaculdadeActions from './actions';
import * as ConfiguracaoGeralActions from '../geral/actions';
import { FaculdadeService } from 'src/app/services/faculdade.service';

@Injectable({ providedIn: 'root' })
export class FaculdadeEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private faculdadeService: FaculdadeService
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

  getAvaliacoesEComentariosFaculdade$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FaculdadeActions.getAvaliacoesEComentariosFaculdade),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ idFaculdade }) => {
          this.faculdadeService.listarAvaliacoesEComentariosFaculdade(idFaculdade);
        }),
      ),
    { dispatch: false },
  );

  getAvaliacoesEComentariosFaculdadeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FaculdadeActions.getAvaliacoesEComentariosFaculdadeSuccess),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false})))
      ),
    { dispatch: false },
  );

  getAlunoDoComentario$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FaculdadeActions.getAlunoDoComentario),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ idAluno }) => {
          this.faculdadeService.obterPerfilAlunoDoComentario(idAluno);
        }),
      ),
    { dispatch: false },
  );

  getAlunoDoComentarioSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FaculdadeActions.getAlunoDoComentarioSuccess),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false})))
      ),
    { dispatch: false },
  );

  responderComentario$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FaculdadeActions.responderComentario),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ resposta }) => {
          this.faculdadeService.responderComentario(resposta);
        }),
      ),
    { dispatch: false },
  );
}
