import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AuthenticationService } from '../seguranca/autenticacao.service';
import { Aluno } from '../models/aluno.model';
import { Professor } from '../models/professor.model';
import { Faculdade } from '../models/faculdade.model';
import { Entidades } from '../models/entidades.enum';
import * as ProfessorActions from '../states/professor/actions';
import { selectPerfil } from '../states/geral/selectors';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthenticationService,
    private store: Store<any>
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

  detalharAvaliacaoComentarios() {

  }

  responderComentario() {

  }

  adicionarComentarioGeral() {

  }
}
