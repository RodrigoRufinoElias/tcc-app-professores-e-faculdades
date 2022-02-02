import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Professor } from 'src/app/models/professor.model';
import * as ProfessorActions from '../../states/professor/actions';
import { ComentarioProfessor } from 'src/app/models/comentarioProfessor';
import {
  selectProfessor,
  selectAvaliacoesProfessor,
  selectComentariosProfessor
} from '../../states/professor/selectors';

@Component({
  selector: 'app-avaliacoes-comentarios',
  templateUrl: './avaliacoes-comentarios.page.html',
  styleUrls: ['./avaliacoes-comentarios.page.scss'],
})
export class AvaliacoesComentariosPage {

  professor: Professor;
  avaliacaoGeral: number = 0;
  comentarios: ComentarioProfessor[] = [];
  grauBomRuim: number = 0;

  unsubscribe$: Subject<any> = new Subject();

  constructor(
    private store: Store<any>,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.store.pipe(
      take(1),
      select(selectProfessor)
    ).subscribe((professor) => {
      this.professor = professor;
      this.store.dispatch(ProfessorActions.getAvaliacoesEComentariosProfessor({ idProfessor: professor.id }));

      this.store.pipe(
        takeUntil(this.unsubscribe$),
        select(selectAvaliacoesProfessor)
      ).subscribe((avaliacoes) => {
        if (avaliacoes.length > 0) {
          this.verificarAvaliacaoGeral(avaliacoes);
        }
      });

      this.store.pipe(
        takeUntil(this.unsubscribe$),
        select(selectComentariosProfessor)
      ).subscribe((comentarios) => {
        if (comentarios.length > 0) {
          this.comentarios = comentarios;
          this.verificarGrauBomRuimGeral(comentarios);
        }
      });
    });
  }

  // Conta a avaliação geral a partir das avaliações
  verificarAvaliacaoGeral(avaliacoes) {
    let soma = 0;

    for (let index = 0; index < avaliacoes.length; index++) {
      soma += avaliacoes[index].avaliacao;
    }

    this.avaliacaoGeral = soma/avaliacoes.length;
  }

  // Conta o grau de bom ou ruim geral dos comentários
  verificarGrauBomRuimGeral(comentarios) {
    let soma = 0;

    for (let index = 0; index < comentarios.length; index++) {
      soma += comentarios[index].grauBomRuim;
    }

    this.grauBomRuim = soma/comentarios.length;
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

  verComentario(idComentario) {
    this.router.navigate([`professor/responder-comentario/${idComentario}`]);
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
