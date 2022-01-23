import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as AlunoActions from './actions';
import * as ConfiguracaoGeralActions from '../geral/actions';
import { AlunoService } from 'src/app/services/aluno.service';

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

  getFaculdadesAluno$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AlunoActions.getFaculdadesAluno),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(() => {
          this.alunoService.listarFaculdades();
        }),
      ),
    { dispatch: false },
  );

  getFaculdadesAlunoSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AlunoActions.getFaculdadesAlunoSuccess),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false})))
      ),
    { dispatch: false },
  );

  getAvaliacoesEComentariosFaculdade$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AlunoActions.getAvaliacoesEComentariosFaculdade),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ idFaculdade }) => {
          this.alunoService.listarAvaliacoesEComentariosFaculdade(idFaculdade);
        }),
      ),
    { dispatch: false },
  );

  getAvaliacoesEComentariosFaculdadeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AlunoActions.getAvaliacoesEComentariosFaculdadeSuccess),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false})))
      ),
    { dispatch: false },
  );

  avaliarFaculdade$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AlunoActions.avaliarFaculdade),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ idFaculdade, idAluno, avaliacao, comentario }) => {
          this.alunoService.avaliarFaculdade(idFaculdade, idAluno, avaliacao, comentario);
        })
      ),
    { dispatch: false },
  );

  comentarFaculdade$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AlunoActions.comentarFaculdade),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ idFaculdade, idAluno, comentario }) => {
          this.alunoService.comentarFaculdade(idFaculdade, idAluno, comentario);
        }),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}))),
      ),
    { dispatch: false },
  );

  getProfessoresAluno$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AlunoActions.getProfessoresAluno),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(() => {
          this.alunoService.listarProfessores();
        }),
      ),
    { dispatch: false },
  );

  getProfessoresAlunoSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AlunoActions.getProfessoresAlunoSuccess),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false})))
      ),
    { dispatch: false },
  );

  getAlunoDoComentario$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AlunoActions.getAlunoDoComentario),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ idAluno }) => {
          this.alunoService.obterPerfilAlunoDoComentario(idAluno);
        }),
      ),
    { dispatch: false },
  );

  getAlunoDoComentarioSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AlunoActions.getAlunoDoComentarioSuccess),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false})))
      ),
    { dispatch: false },
  );
}
