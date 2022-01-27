import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Faculdade } from 'src/app/models/faculdade.model';
import * as AlunoActions from '../../states/aluno/actions';
import {
  selectIdAluno,
  selectAvaliacoesFaculdade,
  selectComentariosFaculdade,
  selectProfessores,
  selectAvaliacoesProfessor,
  selectComentariosProfessor
} from '../../states/aluno/selectors';
import { Professor } from 'src/app/models/professor.model';

@Component({
  selector: 'app-avaliar-professor',
  templateUrl: './avaliar-professor.page.html',
  styleUrls: ['./avaliar-professor.page.scss'],
})
export class AvaliarProfessorPage implements OnInit {

  professor: Professor;
  idProfessor: number;
  idAluno: number;
  avaliacao: number = 1;
  comentario: string = '';
  avaliou = false;
  grauBomRuim: number = 0;

  unsubscribe$: Subject<any> = new Subject();

  constructor(
    private actRoute: ActivatedRoute,
    private store: Store<any>
  ) {
    this.idProfessor = Number(this.actRoute.snapshot.params.idProfessor);

    this.store.pipe(
      take(1),
      select(selectIdAluno)
    ).subscribe((idAluno) => {
      this.idAluno = idAluno
    });
  }

  ngOnInit() {
    this.store.pipe(
      take(1),
      select(selectProfessores),
    ).subscribe(professores => {
      [this.professor] = professores.filter(f => f.id == this.idProfessor);
      this.store.dispatch(AlunoActions.getAvaliacoesEComentariosProfessor({ idProfessor: this.idProfessor }));

      this.store.pipe(
        takeUntil(this.unsubscribe$),
        select(selectAvaliacoesProfessor)
      ).subscribe((avaliacoes) => {
        if (avaliacoes.length > 0) {
          let [avaliacao] = avaliacoes.filter(a => a.idAluno === this.idAluno);

          if (avaliacao) {
            this.avaliacao = avaliacao.avaliacao;
            this.avaliou = true;
          }
        }
      });

      this.store.pipe(
        takeUntil(this.unsubscribe$),
        select(selectComentariosProfessor)
      ).subscribe((comentarios) => {
        if (comentarios.length > 0) {
          // Busca o 1º comentário do aluno logado (comentário de avaliação)
          let [comentarioDoAlunoOrdenado] = [...comentarios.filter(c => c.idAluno === this.idAluno)].sort((a, b) => a.id - b.id);
          this.comentario = comentarioDoAlunoOrdenado.comentario;
          this.grauBomRuim = comentarioDoAlunoOrdenado.grauBomRuim;
        }
      });
    });
  }

  onRatingChange(rating) {
    this.avaliacao = rating;
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

  avaliar() {
    this.store.dispatch(AlunoActions.avaliarProfessor({
      idProfessor: this.idProfessor,
      idAluno: this.idAluno,
      avaliacao: this.avaliacao,
      comentario: this.comentario,
      grauBomRuim: this.grauBomRuim
    }));

    this.avaliou = true;
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
