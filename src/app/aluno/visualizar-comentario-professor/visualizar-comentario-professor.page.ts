import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
  selectAlunoDoComentario,
  selectComentariosProfessor
} from '../../states/aluno/selectors';
import * as AlunoActions from '../../states/aluno/actions';
import { Aluno } from 'src/app/models/aluno.model';
import { ComentarioProfessor } from 'src/app/models/comentarioProfessor';

@Component({
  selector: 'app-visualizar-comentario-professor',
  templateUrl: './visualizar-comentario-professor.page.html',
  styleUrls: ['./visualizar-comentario-professor.page.scss'],
})
export class VisualizarComentarioProfessorPage implements OnInit {

  idComentario: number;
  comentario: ComentarioProfessor;
  aluno: Aluno;
  dataComentario: string = '';
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
      this.grauBomRuim = this.comentario.grauBomRuim;

      this.getDataComentario(this.comentario.data);

      this.store.dispatch(AlunoActions.getAlunoDoComentario({ idAluno: this.comentario.idAluno }));

      this.store.pipe(
        takeUntil(this.unsubscribe$),
        select(selectAlunoDoComentario)
      ).subscribe((aluno) => {
        this.aluno = aluno;
      });
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

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
