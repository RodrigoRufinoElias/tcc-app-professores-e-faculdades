import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import * as AlunoActions from '../../states/aluno/actions';
import {
  selectIdAluno,
  selectProfessores,
  selectAvaliacoesProfessor,
  selectComentariosProfessor,
} from '../../states/aluno/selectors';
import { ComentarioProfessor } from 'src/app/models/comentarioProfessor';
import { Professor } from 'src/app/models/professor.model';

@Component({
  selector: 'app-detalhar-professor',
  templateUrl: './detalhar-professor.page.html',
  styleUrls: ['./detalhar-professor.page.scss'],
})
export class DetalharProfessorPage {

  professor: Professor;
  idProfessor: number;
  idAluno: number;
  avaliacaoGeral: number = 0;
  comentarios: ComentarioProfessor[] = [];
  labelAvaliar: string = 'Avaliar Professor';
  avaliou = false;
  grauBomRuim: number = 0;

  unsubscribe$: Subject<any> = new Subject();

  constructor(
    private actRoute: ActivatedRoute,
    private store: Store<any>,
    private router: Router
  ) {
    this.idProfessor = Number(this.actRoute.snapshot.params.idProfessor);
  }

  ionViewWillEnter() {
    this.store.pipe(
      take(1),
      select(selectIdAluno)
    ).subscribe((idAluno) => {
      this.idAluno = idAluno
    });

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
          this.verificarAvaliacaoGeral(avaliacoes);
          this.verificarSeAlunoAvaliou(avaliacoes);
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

  // Verifica se o aluno já avaliou essa faculdade
  verificarSeAlunoAvaliou(avaliacoes) {
    let [avaliacao] = avaliacoes.filter(a => a.idAluno === this.idAluno);

    if (avaliacao) {
      this.labelAvaliar = 'Ver sua avaliação';
      this.avaliou = true;
    } else {
      this.labelAvaliar = 'Avaliar Professor';
      this.avaliou = false;
    }
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

  avaliar() {
    this.router.navigate([`aluno/avaliar-professor/${this.idProfessor}`]);
  }

  comentar() {
    this.router.navigate([`aluno/comentar-professor/${this.idProfessor}`]);
  }

  verComentario(idComentario) {
    this.router.navigate([`aluno/visualizar-comentario-professor/${idComentario}`]);
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
