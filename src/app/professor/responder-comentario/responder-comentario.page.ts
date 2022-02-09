import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
  selectAlunoDoComentario,
  selectComentariosProfessor
} from '../../states/professor/selectors';
import { ComentarioProfessor } from 'src/app/models/comentarioProfessor';
import * as ProfessorActions from '../../states/professor/actions';
import { Aluno } from 'src/app/models/aluno.model';

@Component({
  selector: 'app-responder-comentario',
  templateUrl: './responder-comentario.page.html',
  styleUrls: ['./responder-comentario.page.scss'],
})
export class ResponderComentarioPage implements OnInit {

  idComentario: number;
  comentario: ComentarioProfessor;
  aluno: Aluno;
  dataComentario: string = '';
  professorRespondeu = false;
  respostaProfessor: string = '';
  grauBomRuim: number = 0;

  unsubscribe$: Subject<any> = new Subject();

  constructor(
    private actRoute: ActivatedRoute,
    private store: Store<any>
  ) {
    this.idComentario = Number(this.actRoute.snapshot.params.idComentario);
  }

  ngOnInit() {
    this.store.pipe(
      take(1),
      select(selectComentariosProfessor)
    ).subscribe((comentarios) => {
      [this.comentario] = comentarios.filter((c) => c.id === this.idComentario);

      this.getDataComentario(this.comentario.data);

      this.store.dispatch(ProfessorActions.getAlunoDoComentario({ idAluno: this.comentario.idAluno }));

      this.store.pipe(
        takeUntil(this.unsubscribe$),
        select(selectAlunoDoComentario)
      ).subscribe((aluno) => {
        this.aluno = aluno;
      });

      this.professorRespondeu = this.comentario.respostaProfessor ? true : false;
      this.respostaProfessor = this.comentario.respostaProfessor;
      this.grauBomRuim = this.comentario.grauBomRuim;
    });
  }

  getDataComentario(dataInMillis: number) {
    let data = new Date(dataInMillis);
    let dia = ('0' + data.getDate()).slice(-2);
    let mes = ('0' + (data.getMonth() + 1)).slice(-2);
    let ano = data.getFullYear();
    let hora = data.getHours();
    let min = ('0' + data.getMinutes()).slice(-2);

    this.dataComentario = `${dia}/${mes}/${ano} ${hora}:${min}`;
  }

  getRangeColor() {
    if (this.grauBomRuim >= 0 && this.grauBomRuim < 3) {
      return 'danger';
    } else if (this.grauBomRuim >= 3 && this.grauBomRuim < 5) {
      return 'warning';
    } else if (this.grauBomRuim >= 5 && this.grauBomRuim < 8) {
      return 'success';
    } else {
      return 'primary';
    }
  }

  responderComentario() {
    let comentarioRespondido = {
      ...this.comentario,
      respostaProfessor: this.respostaProfessor
    }

    this.store.dispatch(ProfessorActions.responderComentario({ resposta: comentarioRespondido }));
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
