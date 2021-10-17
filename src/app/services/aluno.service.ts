import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AuthenticationService } from '../seguranca/autenticacao.service';
import { Aluno } from '../models/aluno.model';
import { Professor } from '../models/professor.model';
import { Faculdade } from '../models/faculdade.model';
import { Entidades } from '../models/entidades.enum';
import * as AlunoActions from '../states/aluno/actions';
import { selectPerfil } from '../states/geral/selectors';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthenticationService,
    private store: Store<any>
  ) {}

  get emailLogado() {
    return this.authService.isLoggedIn ? this.authService.userEmail : null;
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
