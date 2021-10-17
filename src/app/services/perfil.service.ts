import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { Aluno } from '../models/aluno.model';
import { Professor } from '../models/professor.model';
import { Faculdade } from '../models/faculdade.model';
import { Entidades } from '../models/entidades.enum';
import * as ConfiguracaoGeralActions from '../states/geral/actions';
import * as AlunoActions from '../states/aluno/actions';
import { AuthenticationService } from '../seguranca/autenticacao.service';
import { selectIdFirebaseAluno } from '../states/aluno/selectors';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  perfilAlunoListRef: AngularFireList<any>;
  perfilProfessorListRef: AngularFireList<any>;
  perfilFaculdadeListRef: AngularFireList<any>;
  relacaoAlunoFaculdadeListRef: AngularFireList<any>;
  relacaoProfessorFaculdadeListRef: AngularFireList<any>;

  constructor(
    private db: AngularFireDatabase,
    private af: AngularFirestore,
    private authService: AuthenticationService,
    private store: Store<any>
  ) {
    this.listarAlunos();
    this.listarProfessores();
    this.listarFaculdades();
    this.listarRelacaoAlunoFaculdade();
    this.listarRelacaoProfessorFaculdade();
  }

  mapSnapshotChanges(actions) {
    return actions.map(a => {
      const data = a.payload.toJSON();
      const key = a.key;
      return { key, ...data };
    })
  }

  get emailLogado(){
    return this.authService.isLoggedIn ? this.authService.userEmail : null;
  }

  procurarAluno(email: string) {
    this.perfilAlunoListRef = this.db.list(Entidades.ALUNO, ref => ref.orderByChild('email').equalTo(email));
    return this.perfilAlunoListRef;
  }

  procurarProfessor(email: string) {
    this.perfilProfessorListRef = this.db.list(Entidades.PROFESSOR, ref => ref.orderByChild('email').equalTo(email));
    return this.perfilProfessorListRef;
  }

  procurarFaculdade(email: string) {
    this.perfilFaculdadeListRef = this.db.list(Entidades.FACULDADE, ref => ref.orderByChild('email').equalTo(email));
    return this.perfilFaculdadeListRef;
  }

  listarAlunos() {
    this.perfilAlunoListRef = this.db.list(Entidades.ALUNO, ref => ref.orderByChild('nome'));
    return this.perfilAlunoListRef;
  }

  listarProfessores() {
    this.perfilProfessorListRef = this.db.list(Entidades.PROFESSOR, ref => ref.orderByChild('nome'));
    return this.perfilProfessorListRef;
  }

  listarFaculdades() {
    this.perfilFaculdadeListRef = this.db.list(Entidades.FACULDADE, ref => ref.orderByChild('nome'));
    return this.perfilFaculdadeListRef;
  }

  listarRelacaoAlunoFaculdade() {
    this.relacaoAlunoFaculdadeListRef = this.db.list(Entidades.ALUNO_FACULDADE);
    return this.relacaoAlunoFaculdadeListRef;
  }

  listarRelacaoAlunoFaculdadePorIdAluno(idAluno: number) {
    this.relacaoAlunoFaculdadeListRef = this.db.list(Entidades.ALUNO_FACULDADE, ref => ref.orderByChild('idAluno').equalTo(idAluno));
    return this.relacaoAlunoFaculdadeListRef;
  }

  listarRelacaoProfessorFaculdade() {
    this.relacaoProfessorFaculdadeListRef = this.db.list(Entidades.PROFESSOR_FACULDADE);
    return this.relacaoProfessorFaculdadeListRef;
  }

  salvarPerfilAluno(email: string, nome: string, listaFaculdades: Faculdade[]) {
    // Recupera o último Perfil Aluno criado
    this.db.list(Entidades.ALUNO, ref => ref.orderByChild('id').limitToLast(1)).snapshotChanges().pipe(take(1)).subscribe(res => {
      let a = res[0].payload.toJSON();
      a['$key'] = res[0].key;
      const proxId = (a as Aluno).id + 1;

      // Cria o perfil do aluno
      this.perfilAlunoListRef.push({
        id: proxId,
        nome: nome,
        email: email
      });

      this.limparRelacoesAlunoFaculdadeESalvar(proxId, listaFaculdades)
    },
    (error) => console.log('error', error),
    () => {
      this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}))
    });
  }

  editarPerfilAluno(idAluno: number, email: string, nome: string, listaFaculdades: Faculdade[]) {
    let alunoRef;

    this.store.pipe(
      select(selectIdFirebaseAluno),
      take(1)
    ).subscribe((idFirebaseAluno) => {
      alunoRef = this.db.object(`${Entidades.ALUNO}/${idFirebaseAluno}`);

      alunoRef.update({
        nome
      });

      this.store.dispatch(AlunoActions.getPerfilAluno());

      this.limparRelacoesAlunoFaculdadeESalvar(idAluno, listaFaculdades)
    });
  }

  salvarPerfilFaculdade(email: string, nome: string, siteOficial: string, listaProfessores: Professor[]) {
    // Recupera o último Perfil Faculdade criado
    this.db.list(Entidades.FACULDADE, ref => ref.orderByChild('id').limitToLast(1)).snapshotChanges().pipe(take(1)).subscribe(res => {
      let a = res[0].payload.toJSON();
      a['$key'] = res[0].key;
      const proxId = (a as Faculdade).id + 1;

      // Cria o perfil do Faculdade
      this.perfilFaculdadeListRef.push({
        id: proxId,
        nome,
        email,
        siteOficial
      });

      this.limparRelacoesDaFaculdadeESalvar(proxId, listaProfessores);
    },
    (error) => console.log('error', error),
    () => {
      this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}))
    });
  }

  salvarPerfilProfessor(email: string, nome: string, listaFaculdades: Faculdade[]) {
    // Recupera o último Perfil Professor criado
    this.db.list(Entidades.PROFESSOR, ref => ref.orderByChild('id').limitToLast(1)).snapshotChanges().pipe(take(1)).subscribe(res => {
      let a = res[0].payload.toJSON();
      a['$key'] = res[0].key;
      const proxId = (a as Professor).id + 1;

      // Cria o perfil do Professor
      this.perfilProfessorListRef.push({
        id: proxId,
        nome: nome,
        email: email
      });

      this.limparRelacoesDoProfessorESalvar(proxId, listaFaculdades);
      this.limparRelacoesDoProfessorESalvar(1, listaFaculdades);
    },
    (error) => console.log('error', error),
    () => {
      this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}))
    });
  }

  // Remove as relações Aluno x Faculdade e cria as novas
  limparRelacoesAlunoFaculdadeESalvar(idAluno: number, listaFaculdades: Faculdade[]) {
    this.db.list(Entidades.ALUNO_FACULDADE, ref => ref.orderByChild('idAluno').equalTo(idAluno))
      .snapshotChanges().pipe(take(1)).subscribe(res =>
        res.forEach(item => this.db.object(`/${Entidades.ALUNO_FACULDADE}/${item.key}`).remove())
    ).add(() =>
      listaFaculdades.forEach((f) => this.salvarAlunoFaculdade(idAluno, f.id))
    );
  }

  // Remove as relações Professor x Faculdade e cria as novas para Faculdade
  limparRelacoesDaFaculdadeESalvar(idFaculdade: number, listaProfessores: Professor[]) {
    this.db.list(Entidades.PROFESSOR_FACULDADE, ref => ref.orderByChild('idFaculdade').equalTo(idFaculdade))
      .snapshotChanges().pipe(take(1)).subscribe(res =>
        res.forEach(item => this.db.object(`/${Entidades.PROFESSOR_FACULDADE}/${item.key}`).remove())
    ).add(() =>
      listaProfessores.forEach((f) => this.salvarProfessorFaculdade(f.id, idFaculdade))
    );
  }

  // Remove as relações Professor x Faculdade e cria as novas para Professor
  limparRelacoesDoProfessorESalvar(idProfessor: number, listaFaculdades: Faculdade[]) {
    this.db.list(Entidades.PROFESSOR_FACULDADE, ref => ref.orderByChild('idProfessor').equalTo(idProfessor))
      .snapshotChanges().pipe(take(1)).subscribe(res =>
        res.forEach(item => this.db.object(`/${Entidades.PROFESSOR_FACULDADE}/${item.key}`).remove())
    ).add(() =>
      listaFaculdades.forEach((f) => this.salvarProfessorFaculdade(idProfessor, f.id))
    );
  }

  salvarAlunoFaculdade(idAluno: number, idFaculdade: number) {
    let data = new Date();
    this.relacaoAlunoFaculdadeListRef.push({
      idAluno,
      idFaculdade,
      dataInclusao: data.getTime()
    });
  }

  salvarProfessorFaculdade(idProfessor: number, idFaculdade: number) {
    this.relacaoProfessorFaculdadeListRef.push({
      idProfessor,
      idFaculdade
    });
  }
}
