import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import * as ConfiguracaoGeralActions from './actions';
import { PerfilService } from 'src/app/services/perfil.service';
import { TipoUsuario } from 'src/app/models/usuario.model';

@Injectable({ providedIn: 'root' })
export class ConfiguracaoGeralEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private perfilService: PerfilService,
    private router: Router
  ) {}

  verificarPerfilExistente$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConfiguracaoGeralActions.verificarPerfilExistente),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ email }) => {
          this.perfilService.procurarAluno(email).snapshotChanges().subscribe(res => {
            if(res.length >= 1) {
              this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}));
              this.store.dispatch(ConfiguracaoGeralActions.setPerfil({emailLogado: email, tipoUsuarioLogado: TipoUsuario.ALUNO}));
              this.irParaAluno();
            } else {
              this.perfilService.procurarProfessor(email).snapshotChanges().subscribe(res => {
                if(res.length >= 1) {
                  this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}));
                  this.store.dispatch(ConfiguracaoGeralActions.setPerfil({emailLogado: email, tipoUsuarioLogado: TipoUsuario.PROFESSOR}));
                  this.irParaProfessor();
                } else {
                  this.perfilService.procurarFaculdade(email).snapshotChanges().subscribe(res => {
                    if(res.length >= 1) {
                      this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}));
                      this.store.dispatch(ConfiguracaoGeralActions.setPerfil({emailLogado: email, tipoUsuarioLogado: TipoUsuario.FACULDADE}));
                      this.irParaFaculdade();
                    } else {
                      this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}));
                      this.store.dispatch(ConfiguracaoGeralActions.setPerfil({emailLogado: email, tipoUsuarioLogado: null}));
                      this.irParaSelecaoPerfil();
                    }
                  });
                }
              });
            }
          })
        })
      ),
    { dispatch: false },
  );

  salvarPerfilAluno$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConfiguracaoGeralActions.salvarPerfilAluno),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ email, nome, listaFaculdades }) => {
          this.perfilService.salvarPerfilAluno(email, nome, listaFaculdades);
          this.store.dispatch(ConfiguracaoGeralActions.setPerfil({emailLogado: email, tipoUsuarioLogado: TipoUsuario.ALUNO}));
          timer(1000).subscribe(() => this.irParaAluno());
        }),
      ),
    { dispatch: false },
  );

  salvarPerfilFaculdade$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConfiguracaoGeralActions.salvarPerfilFaculdade),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ email, nome, siteOficial, listaProfessores }) => {
          this.perfilService.salvarPerfilFaculdade(email, nome, siteOficial, listaProfessores);
          this.store.dispatch(ConfiguracaoGeralActions.setPerfil({emailLogado: email, tipoUsuarioLogado: TipoUsuario.FACULDADE}));
          timer(1000).subscribe(() => this.irParaFaculdade());
        }),
      ),
    { dispatch: false },
  );

  salvarPerfilProfessor$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConfiguracaoGeralActions.salvarPerfilProfessor),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ email, nome, listaFaculdades }) => {
          this.perfilService.salvarPerfilProfessor(email, nome, listaFaculdades);
          this.store.dispatch(ConfiguracaoGeralActions.setPerfil({emailLogado: email, tipoUsuarioLogado: TipoUsuario.PROFESSOR}));
          timer(1000).subscribe(() => this.irParaProfessor());
        }),
      ),
    { dispatch: false },
  );

  irParaSelecaoPerfil() {
    this.router.navigate(['selecao-perfil']);
  }

  irParaAluno() {
    this.router.navigate(['aluno']);
  }

  irParaFaculdade() {
    this.router.navigate(['faculdade']);
  }

  irParaProfessor() {
    this.router.navigate(['professor']);
  }
}
