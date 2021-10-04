import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { forkJoin } from 'rxjs';

import { AuthenticationService } from '../seguranca/autenticacao.service';
import { Aluno } from '../models/aluno.model';
import { Professor } from '../models/professor.model';
import { Faculdade } from '../models/faculdade.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  perfilAlunoListRef: AngularFireList<any>;
  perfilProfessorListRef: AngularFireList<any>;
  perfilFaculdadeListRef: AngularFireList<any>;
  perfilRef: AngularFireObject<any>;

  constructor(
    private authService: AuthenticationService,
    private db: AngularFireDatabase
  ) {
    this.getAlunoList();
    this.getProfessorList();
    this.getFaculdadeList();
  }

  // TODO Apagar
  criarPerfilFakeAluno(aluno: Aluno) {
    return this.perfilAlunoListRef.push({
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email
    })
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

  verificarPerfilExistente(email: string) {
    this.procurarAluno(email).snapshotChanges().subscribe(res => {
      console.log('procurarAluno', res.length);

      if(res.length >= 1) {
        console.log('Achou Aluno');
      } else {
        this.procurarProfessor(email).snapshotChanges().subscribe(res => {
          console.log('procurarProfessor', res.length);
          if(res.length >= 1) {
            console.log('Achou Professor');
          } else {
            this.procurarFaculdade(email).snapshotChanges().subscribe(res => {
              console.log('procurarFaculdade', res.length);
              if(res.length >= 1) {
                console.log('Achou Faculdade');
              } else {
                console.log('Não achou nada');
              }
            });
          }
        });
      }
    });
  }

  procurarAluno(email: string) {
    this.perfilAlunoListRef = this.db.list('/aluno', ref => ref.orderByChild('email').equalTo(email));
    return this.perfilAlunoListRef;
  }

  procurarProfessor(email: string) {
    this.perfilAlunoListRef = this.db.list('/professor', ref => ref.orderByChild('email').equalTo(email));
    return this.perfilAlunoListRef;
  }

  procurarFaculdade(email: string) {
    this.perfilAlunoListRef = this.db.list('/faculdade', ref => ref.orderByChild('email').equalTo(email));
    return this.perfilAlunoListRef;
  }

  getAlunoList() {
    this.perfilAlunoListRef = this.db.list('/aluno');
    return this.perfilAlunoListRef;
  }

  getProfessorList() {
    this.perfilProfessorListRef = this.db.list('/professor');
    return this.perfilProfessorListRef;
  }

  getFaculdadeList() {
    this.perfilFaculdadeListRef = this.db.list('/faculdade');
    return this.perfilFaculdadeListRef;
  }

  obterPerfil() {
    console.log('email', this.authService.userEmail);

  }

  salvarPerfilAluno() {

  }

  salvarPerfilFaculdade() {

  }

  salvarPerfilProfessor() {

  }
}
