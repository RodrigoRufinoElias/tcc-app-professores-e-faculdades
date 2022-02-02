import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import * as ProfessorActions from './actions';
import * as ConfiguracaoGeralActions from '../geral/actions';
import { ProfessorService } from 'src/app/services/professor.service';

@Injectable({ providedIn: 'root' })
export class ProfessorEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private professorService: ProfessorService
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

  getAvaliacoesEComentariosProfessor$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfessorActions.getAvaliacoesEComentariosProfessor),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ idProfessor }) => {
          this.professorService.listarAvaliacoesEComentariosProfessor(idProfessor);
        }),
      ),
    { dispatch: false },
  );

  getAvaliacoesEComentariosProfessorSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfessorActions.getAvaliacoesEComentariosProfessorSuccess),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false})))
      ),
    { dispatch: false },
  );

  getAlunoDoComentario$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfessorActions.getAlunoDoComentario),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ idAluno }) => {
          this.professorService.obterPerfilAlunoDoComentario(idAluno);
        }),
      ),
    { dispatch: false },
  );

  getAlunoDoComentarioSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfessorActions.getAlunoDoComentarioSuccess),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false})))
      ),
    { dispatch: false },
  );

  responderComentario$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfessorActions.responderComentario),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ resposta }) => {
          this.professorService.responderComentario(resposta);
        }),
      ),
    { dispatch: false },
  );
}
