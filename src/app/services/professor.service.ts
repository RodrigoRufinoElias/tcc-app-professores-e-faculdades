import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { combineLatest, timer } from 'rxjs';

import { AuthenticationService } from '../seguranca/autenticacao.service';
import { Aluno } from '../models/aluno.model';
import { Professor } from '../models/professor.model';
import { Entidades } from '../models/entidades.enum';
import * as ProfessorActions from '../states/professor/actions';
import { PerfilService } from './perfil.service';
import { ComentarioProfessor } from '../models/comentarioProfessor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  avaliacoesAlunoProfessorListRef: AngularFireList<any>;
  comentariosAlunoProfessorListRef: AngularFireList<any>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthenticationService,
    private store: Store<any>,
    private perfilService: PerfilService,
  ) {}

  get emailLogado() {
    return this.authService.isLoggedIn ? this.authService.userEmail : null;
  }

  obterPerfilProfessor() {
    this.db.list(Entidades.PROFESSOR, ref => ref.orderByChild('email').equalTo(this.emailLogado))
    .snapshotChanges().pipe(take(1)).subscribe(res => {
      let p = res[0].payload.toJSON();
      p['$key'] = res[0].key;
      const professor = p as Professor;
      this.store.dispatch(ProfessorActions.getPerfilProfessorSuccess({idFirebase: res[0].key, professor}))
    });
  }

  listarAvaliacoesEComentariosProfessor(idProfessor: number) {
    let listaAvaliacaoRef = this.obterAvaliacoesProfessor(idProfessor);
    let listaComentarioRef = this.obterComentariosProfessor(idProfessor);

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
      this.store.dispatch(ProfessorActions.getAvaliacoesEComentariosProfessorSuccess({
        avaliacoesProfessor: res.listaAvaliacoes,
        comentariosProfessor: res.listaComentarios
      }));
    });
  }

  obterAvaliacoesProfessor(idProfessor: number) {
    this.avaliacoesAlunoProfessorListRef = this.db.list(Entidades.AVALIACAO_PROFESSOR, ref => ref.orderByChild('idProfessor').equalTo(idProfessor));
    return this.avaliacoesAlunoProfessorListRef;
  }

  obterComentariosProfessor(idProfessor: number) {
    this.comentariosAlunoProfessorListRef = this.db.list(Entidades.COMENTARIO_PROFESSOR, ref => ref.orderByChild('idProfessor').equalTo(idProfessor));
    return this.comentariosAlunoProfessorListRef;
  }

  obterPerfilAlunoDoComentario(idAluno: number) {
    this.db.list(Entidades.ALUNO, ref => ref.orderByChild('id').equalTo(idAluno))
    .snapshotChanges().pipe(take(1)).subscribe(res => {
      let a = res[0].payload.toJSON();
      a['$key'] = res[0].key;
      const aluno = a as Aluno;

      this.store.dispatch(ProfessorActions.getAlunoDoComentarioSuccess({ aluno }))
    });
  }

  responderComentario(resposta: ComentarioProfessor) {
    this.db.object(`/${Entidades.COMENTARIO_PROFESSOR}/${resposta['key']}`).update({
      respostaProfessor: resposta.respostaProfessor
    }).
    finally(() => {
      this.store.dispatch(ProfessorActions.getAvaliacoesEComentariosProfessor({ idProfessor: resposta.idProfessor }));
      timer(300).subscribe(() => history.back());
    });
  }
}
