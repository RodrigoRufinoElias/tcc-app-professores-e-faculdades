import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { combineLatest, timer } from 'rxjs';

import { AuthenticationService } from '../seguranca/autenticacao.service';
import { Aluno } from '../models/aluno.model';
import { Entidades } from '../models/entidades.enum';
import * as AlunoActions from '../states/aluno/actions';
import { selectAluno } from '../states/aluno/selectors';
import { PerfilService } from './perfil.service';
import { AvaliacaoFaculdade } from '../models/avaliacaoFaculdade';
import { ComentarioFaculdade } from '../models/comentarioFaculdade';
import { AvaliacaoProfessor } from '../models/avaliacaoProfessor';
import { ComentarioProfessor } from '../models/comentarioProfessor';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  avaliacoesAlunoFaculdadeListRef: AngularFireList<any>;
  comentariosAlunoFaculdadeListRef: AngularFireList<any>;
  avaliacoesAlunoProfessorListRef: AngularFireList<any>;
  comentariosAlunoProfessorListRef: AngularFireList<any>;

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
      this.store.dispatch(AlunoActions.getAvaliacoesEComentariosFaculdadeSuccess({
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

  avaliarFaculdade(idFaculdade: number, idAluno: number, avaliacao: number, comentario: string) {
    // Recupera a última avaliação da faculdade criado
    this.db.list(Entidades.AVALIACAO_FACULDADE, ref => ref.orderByChild('id').limitToLast(1)).snapshotChanges().pipe(take(1)).subscribe(res => {
      let a = res[0].payload.toJSON();
      a['$key'] = res[0].key;
      const proxId = (a as AvaliacaoFaculdade).id + 1;

      // Cria a avaliação da faculdade
      this.avaliacoesAlunoFaculdadeListRef.push({
        id: proxId,
        idAluno,
        idFaculdade,
        avaliacao,
        data: (new Date()).getTime()
      });
    },
    (error) => console.log('error', error),
    () => {
      this.comentarFaculdade(idFaculdade, idAluno, comentario);
    });
  }

  comentarFaculdade(idFaculdade: number, idAluno: number, comentario: string) {
    // Recupera o último comentário sobre a faculdade criado
    this.db.list(Entidades.COMENTARIO_FACULDADE, ref => ref.orderByChild('id').limitToLast(1)).snapshotChanges().pipe(take(1)).subscribe(res => {
      let a = res[0].payload.toJSON();
      a['$key'] = res[0].key;
      const proxId = (a as ComentarioFaculdade).id + 1;

      // Cria o comentário sobre a faculdade
      this.comentariosAlunoFaculdadeListRef.push({
        id: proxId,
        idAluno,
        idFaculdade,
        comentario,
        respostaFaculdade: '',
        data: (new Date()).getTime()
      });
    },
    (error) => console.log('error', error),
    () => {
      this.store.dispatch(AlunoActions.getAvaliacoesEComentariosFaculdade({ idFaculdade }));
      timer(300).subscribe(() => history.back());
    });
  }

  obterPerfilAlunoDoComentario(idAluno: number) {
    this.db.list(Entidades.ALUNO, ref => ref.orderByChild('id').equalTo(idAluno))
    .snapshotChanges().pipe(take(1)).subscribe(res => {
      let a = res[0].payload.toJSON();
      a['$key'] = res[0].key;
      const aluno = a as Aluno;

      this.store.dispatch(AlunoActions.getAlunoDoComentarioSuccess({ aluno }))
    });
  }

  listarProfessores() {
    let listaProfessores = this.perfilService.listarProfessores();
    let listarRelacaoProfessorFaculdade = this.perfilService.listarRelacaoProfessorFaculdade();
    let listaAlunoFaculdade: AngularFireList<any> = this.perfilService.listarRelacaoAlunoFaculdadePorIdAluno(this.aluno.id);

    combineLatest([
      listarRelacaoProfessorFaculdade.snapshotChanges().pipe(
        map(actions => this.perfilService.mapSnapshotChanges(actions))
      ),
      listaAlunoFaculdade.snapshotChanges().pipe(
        map(actions => this.perfilService.mapSnapshotChanges(actions))
      ),
      listaProfessores.snapshotChanges().pipe(
        map(actions => this.perfilService.mapSnapshotChanges(actions))
      )
    ]).pipe(
      take(1),
      map(([listarRelacaoProfessorFaculdade, listaAlunoFaculdade, listaProfessores]) => {
        let listaEscolhidaAux = [];
        listaAlunoFaculdade.forEach(lr => {
          const listarRelacaoProfessorFaculdadeAluno = listarRelacaoProfessorFaculdade.filter((lc) => lc.idFaculdade === lr.idFaculdade);
          listarRelacaoProfessorFaculdadeAluno.forEach(l => {
            const [i] = listaProfessores.filter((lp) => lp.id === l.idProfessor);
            if(!listaEscolhidaAux.includes(i)) {
              listaEscolhidaAux.push(i);
            }
          });
        });

        return listaEscolhidaAux;
      })
    ).subscribe(res => {
      this.store.dispatch(AlunoActions.getProfessoresAlunoSuccess({ professores: res }));
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
      this.store.dispatch(AlunoActions.getAvaliacoesEComentariosProfessorSuccess({
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

  avaliarProfessor(idProfessor: number, idAluno: number, avaliacao: number, comentario: string, grauBomRuim: number) {
    // Recupera a última avaliação do professor criado
    this.db.list(Entidades.AVALIACAO_PROFESSOR, ref => ref.orderByChild('id').limitToLast(1)).snapshotChanges().pipe(take(1)).subscribe(res => {
      let a = res[0].payload.toJSON();
      a['$key'] = res[0].key;
      const proxId = (a as AvaliacaoProfessor).id + 1;

      // Cria a avaliação do professor
      this.avaliacoesAlunoProfessorListRef.push({
        id: proxId,
        idAluno,
        idProfessor,
        avaliacao,
        data: (new Date()).getTime()
      });
    },
    (error) => console.log('error', error),
    () => {
      this.comentarProfessor(idProfessor, idAluno, comentario, grauBomRuim);
    });
  }

  comentarProfessor(idProfessor: number, idAluno: number, comentario: string, grauBomRuim: number) {
    // Recupera o último comentário sobre a faculdade criado
    this.db.list(Entidades.COMENTARIO_PROFESSOR, ref => ref.orderByChild('id').limitToLast(1)).snapshotChanges().pipe(take(1)).subscribe(res => {
      let a = res[0].payload.toJSON();
      a['$key'] = res[0].key;
      const proxId = (a as ComentarioProfessor).id + 1;

      // Cria o comentário sobre a faculdade
      this.comentariosAlunoProfessorListRef.push({
        id: proxId,
        idAluno,
        idProfessor,
        comentario,
        respostaProfessor: '',
        grauBomRuim,
        data: (new Date()).getTime()
      });
    },
    (error) => console.log('error', error),
    () => {
      // this.store.dispatch(AlunoActions.getAvaliacoesEComentariosProfessor({ idProfessor }));
      // timer(300).subscribe(() => history.back());
    });
  }

  visualizarComentarioProfessor() {

  }
}
