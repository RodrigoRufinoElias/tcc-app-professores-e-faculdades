import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import { AuthenticationService } from '../seguranca/autenticacao.service';
import { Aluno } from '../models/aluno.model';
import { Professor } from '../models/professor.model';
import { Faculdade } from '../models/faculdade.model';
import { Entidades } from '../models/entidades.enum';
import * as AlunoActions from '../states/aluno/actions';
import { selectAluno } from '../states/aluno/selectors';
import { PerfilService } from './perfil.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthenticationService,
    private perfilService: PerfilService,
    private store: Store<any>
  ) {}

  get emailLogado() {
    return this.authService.isLoggedIn ? this.authService.userEmail : null;
  }

  get aluno() {
    let aluno: Aluno;

    this.store.pipe(
      take(1),
      select(selectAluno),
    ).subscribe(a => aluno = a);

    return aluno;
  }

  obterPerfilAluno() {
    this.db.list(Entidades.ALUNO, ref => ref.orderByChild('email').equalTo(this.emailLogado))
    .snapshotChanges().pipe(take(1)).subscribe(res => {
      let a = res[0].payload.toJSON();
      a['$key'] = res[0].key;
      const aluno = a as Aluno;
      this.store.dispatch(AlunoActions.getPerfilAlunoSuccess({idFirebase: res[0].key, aluno}))
    });
  }

  listarFaculdades() {
    let lista = this.perfilService.listarFaculdades();

    let listaAlunoFaculdade: AngularFireList<any> = this.perfilService.listarRelacaoAlunoFaculdadePorIdAluno(this.aluno.id);

    combineLatest([
      lista.snapshotChanges().pipe(
        map(actions => this.perfilService.mapSnapshotChanges(actions))
      ),
      listaAlunoFaculdade.snapshotChanges().pipe(
        map(actions => this.perfilService.mapSnapshotChanges(actions))
      )
    ]).pipe(
      take(1),
      map(([listaCompleta, listaRelacionalCompleta]) => {
        let listaEscolhidaAux = [];

        listaRelacionalCompleta.forEach(lr => {
          const [l] = listaCompleta.filter((lc) => lc.id === lr.idFaculdade);
          listaEscolhidaAux.push(l);
        });

        return listaEscolhidaAux;
      })
    ).subscribe(res => {
      this.store.dispatch(AlunoActions.getFaculdadesAlunoSuccess({ faculdades: res }));
    });
  }

  detalharFaculdade() {

  }

  avaliarFaculdade() {

  }

  comentarFaculdade() {

  }

  visualizarComentarioFaculdade() {

  }

  listarProfessores() {

  }

  detalharProfessor() {

  }

  avaliarProfessor() {

  }

  comentarProfessor() {

  }

  visualizarComentarioProfessor() {

  }
}
