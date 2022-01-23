import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import * as ConfiguracaoGeralActions from './actions';
import * as AlunoActions from '../aluno/actions';
import { PerfilService } from 'src/app/services/perfil.service';
import { TipoUsuario } from 'src/app/models/usuario.model';
import { AuthenticationService } from 'src/app/seguranca/autenticacao.service';

@Injectable({ providedIn: 'root' })
export class ConfiguracaoGeralEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private perfilService: PerfilService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  verificarPerfilExistente$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConfiguracaoGeralActions.verificarPerfilExistente),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ email }) => {
          this.perfilService.procurarAlunoPorEmail(email).snapshotChanges().subscribe(res => {
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
        tap(({ idAluno, email, nome, listaFaculdades }) => {
          if(idAluno) {
            this.perfilService.editarPerfilAluno(idAluno, nome, listaFaculdades);
          } else {
            this.perfilService.salvarPerfilAluno(email, nome, listaFaculdades);
            this.store.dispatch(ConfiguracaoGeralActions.setPerfil({emailLogado: email, tipoUsuarioLogado: TipoUsuario.ALUNO}));
          }

          timer(1000).subscribe(() =>
            {
              this.irParaAluno();
              this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}));
            }
          );
        }),
      ),
    { dispatch: false },
  );

  salvarPerfilFaculdade$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConfiguracaoGeralActions.salvarPerfilFaculdade),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ idFaculdade, email, nome, siteOficial, listaProfessores }) => {
          if(idFaculdade) {
            this.perfilService.editarPerfilFaculdade(idFaculdade, nome, siteOficial, listaProfessores);
          } else {
            this.perfilService.salvarPerfilFaculdade(email, nome, siteOficial, listaProfessores);
            this.store.dispatch(ConfiguracaoGeralActions.setPerfil({emailLogado: email, tipoUsuarioLogado: TipoUsuario.FACULDADE}));
          }

          timer(1000).subscribe(() =>
            {
              this.irParaFaculdade();
              this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}));
            }
          );
        }),
      ),
    { dispatch: false },
  );

  salvarPerfilProfessor$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConfiguracaoGeralActions.salvarPerfilProfessor),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(({ idProfessor, email, nome, listaFaculdades }) => {
          if(idProfessor) {
            this.perfilService.editarPerfilProfessor(idProfessor, nome, listaFaculdades);
          } else {
            this.perfilService.salvarPerfilProfessor(email, nome, listaFaculdades);
            this.store.dispatch(ConfiguracaoGeralActions.setPerfil({emailLogado: email, tipoUsuarioLogado: TipoUsuario.ALUNO}));
          }

          timer(1000).subscribe(() =>
            {
              this.irParaProfessor();
              this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}));
            }
          );
        }),
      ),
    { dispatch: false },
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConfiguracaoGeralActions.logout),
        tap(() => this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}))),
        tap(() => {
          this.store.dispatch(AlunoActions.clearState());
          this.store.dispatch(ConfiguracaoGeralActions.clearState());
          this.authService.SignOut();
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
