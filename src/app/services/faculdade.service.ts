import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { combineLatest, timer } from 'rxjs';

import { AuthenticationService } from '../seguranca/autenticacao.service';
import { Aluno } from '../models/aluno.model';
import { Faculdade } from '../models/faculdade.model';
import { Entidades } from '../models/entidades.enum';
import * as FaculdadeActions from '../states/faculdade/actions';
import { PerfilService } from './perfil.service';
import { ComentarioFaculdade } from '../models/comentarioFaculdade';

@Injectable({
  providedIn: 'root'
})
export class FaculdadeService {

  avaliacoesAlunoFaculdadeListRef: AngularFireList<any>;
  comentariosAlunoFaculdadeListRef: AngularFireList<any>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthenticationService,
    private store: Store<any>,
    private perfilService: PerfilService,
  ) {}

  get emailLogado() {
    return this.authService.isLoggedIn ? this.authService.userEmail : null;
  }

  obterPerfilFaculdade() {
    this.db.list(Entidades.FACULDADE, ref => ref.orderByChild('email').equalTo(this.emailLogado))
    .snapshotChanges().pipe(take(1)).subscribe(res => {
      let f = res[0].payload.toJSON();
      f['$key'] = res[0].key;
      const faculdade = f as Faculdade;
      this.store.dispatch(FaculdadeActions.getPerfilFaculdadeSuccess({idFirebase: res[0].key, faculdade}))
    });
  }

  listarAvaliacoesEComentariosFaculdade(idFaculdade: number) {
    let listaAvaliacaoRef = this.obterAvaliacoesFaculdade(idFaculdade);
    let listaComentarioRef = this.obterComentariosFaculdade(idFaculdade);

    combineLatest([
      listaAvaliacaoRef.snapshotChanges().pipe(
        map(actions => this.perfilService.mapSnapshotChanges(actions))
      ),
      listaComentarioRef.snapshotChanges().pipe(
        map(actions => this.perfilService.mapSnapshotChanges(actions))
      )
    ]).pipe(
      take(1),
      map(([listaAvaliacoes, listaComentarios]) => {
        return {listaAvaliacoes, listaComentarios};
      })
    ).subscribe(res => {
      this.store.dispatch(FaculdadeActions.getAvaliacoesEComentariosFaculdadeSuccess({
        avaliacoesFaculdade: res.listaAvaliacoes,
        comentariosFaculdade: res.listaComentarios
      }));
    });
  }

  obterAvaliacoesFaculdade(idFaculdade: number) {
    this.avaliacoesAlunoFaculdadeListRef = this.db.list(Entidades.AVALIACAO_FACULDADE, ref => ref.orderByChild('idFaculdade').equalTo(idFaculdade));
    return this.avaliacoesAlunoFaculdadeListRef;
  }

  obterComentariosFaculdade(idFaculdade: number) {
    this.comentariosAlunoFaculdadeListRef = this.db.list(Entidades.COMENTARIO_FACULDADE, ref => ref.orderByChild('idFaculdade').equalTo(idFaculdade));
    return this.comentariosAlunoFaculdadeListRef;
  }

  obterPerfilAlunoDoComentario(idAluno: number) {
    this.db.list(Entidades.ALUNO, ref => ref.orderByChild('id').equalTo(idAluno))
    .snapshotChanges().pipe(take(1)).subscribe(res => {
      let a = res[0].payload.toJSON();
      a['$key'] = res[0].key;
      const aluno = a as Aluno;

      this.store.dispatch(FaculdadeActions.getAlunoDoComentarioSuccess({ aluno }))
    });
  }

  responderComentario(resposta: ComentarioFaculdade) {
    this.db.object(`/${Entidades.COMENTARIO_FACULDADE}/${resposta['key']}`).update({
      respostaFaculdade: resposta.respostaFaculdade
    }).
    finally(() => {
      this.store.dispatch(FaculdadeActions.getAvaliacoesEComentariosFaculdade({ idFaculdade: resposta.idFaculdade }));
      timer(300).subscribe(() => history.back());
    });
  }
}
