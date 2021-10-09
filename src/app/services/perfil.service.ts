import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '../seguranca/autenticacao.service';
import { Aluno } from '../models/aluno.model';
import { Professor } from '../models/professor.model';
import { Faculdade } from '../models/faculdade.model';
import { Entidades } from '../models/entidades.enum';
import * as ConfiguracaoGeralActions from '../states/geral/actions';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  perfilAlunoListRef: AngularFireList<any>;
  perfilProfessorListRef: AngularFireList<any>;
  perfilFaculdadeListRef: AngularFireList<any>;
  relacaoAlunoFaculdadeListRef: AngularFireList<any>;
  perfilRef: AngularFireObject<any>;

  constructor(
    private authService: AuthenticationService,
    private db: AngularFireDatabase,
    private store: Store<any>,
  ) {
    this.listarAlunos();
    this.listarProfessores();
    this.listarFaculdades();
    this.listarRelacaoAlunoFaculdade();
  }

  // TODO Apagar
  criarPerfilFakeProfessor(prof: Professor) {
    return this.perfilProfessorListRef.push({
      id: prof.id,
      nome: prof.nome,
      email: prof.email
    })
  }

  // TODO Apagar
  criarPerfilFakeFaculdade(fac: Faculdade) {
    return this.perfilFaculdadeListRef.push({
      id: fac.id,
      nome: fac.nome,
      email: fac.email,
      siteOficial: fac.siteOficial
    })
  }

  procurarAluno(email: string) {
    this.perfilAlunoListRef = this.db.list(Entidades.ALUNO, ref => ref.orderByChild('email').equalTo(email));
    return this.perfilAlunoListRef;
  }

  procurarProfessor(email: string) {
    this.perfilAlunoListRef = this.db.list(Entidades.PROFESSOR, ref => ref.orderByChild('email').equalTo(email));
    return this.perfilAlunoListRef;
  }

  procurarFaculdade(email: string) {
    this.perfilAlunoListRef = this.db.list(Entidades.FACULDADE, ref => ref.orderByChild('email').equalTo(email));
    return this.perfilAlunoListRef;
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

  salvarPerfilAluno(email: string, nome: string, listaFaculdades: Faculdade[]) {
    // Recupera o último Perfil Aluno criado
    this.db.list(Entidades.ALUNO, ref => ref.orderByChild('id').limitToLast(1)).snapshotChanges().pipe(take(1)).subscribe(res => {
      let a = res[0].payload.toJSON();
      a['$key'] = res[0].key;
      const proxId = (a as Aluno).id + 1;

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

  salvarPerfilFaculdade() {

  }

  salvarPerfilProfessor() {

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

  salvarAlunoFaculdade(idAluno: number, idFaculdade: number) {
    let data = new Date();
    this.relacaoAlunoFaculdadeListRef.push({
      idAluno,
      idFaculdade,
      dataInclusao: data.getTime()
    });
  }

  obterPerfil() {
    console.log('email', this.authService.userEmail);

  }
}
