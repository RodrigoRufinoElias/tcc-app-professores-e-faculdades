import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AuthenticationService } from '../seguranca/autenticacao.service';
import { Aluno } from '../models/aluno.model';
import { Professor } from '../models/professor.model';
import { Faculdade } from '../models/faculdade.model';
import { Entidades } from '../models/entidades.enum';
import * as FaculdadeActions from '../states/faculdade/actions';
import { selectPerfil } from '../states/geral/selectors';

@Injectable({
  providedIn: 'root'
})
export class FaculdadeService {

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthenticationService,
    private store: Store<any>
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

  detalharAvaliacaoComentarios() {

  }

  responderComentario() {

  }

  adicionarComentarioGeral() {

  }
}
