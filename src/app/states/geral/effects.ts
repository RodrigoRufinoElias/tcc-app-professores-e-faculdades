import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

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
            } else {
              this.perfilService.procurarProfessor(email).snapshotChanges().subscribe(res => {
                if(res.length >= 1) {
                  this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}));
                  this.store.dispatch(ConfiguracaoGeralActions.setPerfil({emailLogado: email, tipoUsuarioLogado: TipoUsuario.PROFESSOR}));
                } else {
                  this.perfilService.procurarFaculdade(email).snapshotChanges().subscribe(res => {
                    if(res.length >= 1) {
                      this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}));
                      this.store.dispatch(ConfiguracaoGeralActions.setPerfil({emailLogado: email, tipoUsuarioLogado: TipoUsuario.FACULDADE}));
                    } else {
                      this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}));
                      this.store.dispatch(ConfiguracaoGeralActions.setPerfil({emailLogado: email, tipoUsuarioLogado: null}));
                      this.router.navigate(['selecao-perfil']);
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
        }),
      ),
    { dispatch: false },
  );
}
