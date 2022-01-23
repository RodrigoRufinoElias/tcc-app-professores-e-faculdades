import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
  selectAlunoDoComentario,
  selectComentariosFaculdade
} from '../../states/aluno/selectors';
import { ComentarioFaculdade } from 'src/app/models/comentarioFaculdade';
import * as AlunoActions from '../../states/aluno/actions';
import { Aluno } from 'src/app/models/aluno.model';

@Component({
  selector: 'app-visualizar-comentario',
  templateUrl: './visualizar-comentario.page.html',
  styleUrls: ['./visualizar-comentario.page.scss'],
})
export class VisualizarComentarioPage implements OnInit {

  idComentario: number;
  comentario: ComentarioFaculdade;
  aluno: Aluno;
  dataComentario: string = '';

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
      select(selectComentariosFaculdade)
    ).subscribe((comentarios) => {
      [this.comentario] = comentarios.filter((c) => c.id === this.idComentario);

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
    let dia = data.getDate();
    let mes = ('0' + (data.getMonth() + 1)).slice(-2);
    let ano = data.getFullYear();
    let hora = data.getHours();
    let min = ('0' + data.getMinutes()).slice(-2);

    this.dataComentario = `${dia}/${mes}/${ano} ${hora}:${min}`;
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
