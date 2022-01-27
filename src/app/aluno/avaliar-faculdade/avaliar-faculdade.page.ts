import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Faculdade } from 'src/app/models/faculdade.model';
import * as AlunoActions from '../../states/aluno/actions';
import {
  selectIdAluno,
  selectFaculdades,
  selectAvaliacoesFaculdade,
  selectComentariosFaculdade
} from '../../states/aluno/selectors';

@Component({
  selector: 'app-avaliar-faculdade',
  templateUrl: './avaliar-faculdade.page.html',
  styleUrls: ['./avaliar-faculdade.page.scss'],
})
export class AvaliarFaculdadePage implements OnInit {

  faculdade: Faculdade;
  idFaculdade: number;
  idAluno: number;
  avaliacao: number = 1;
  comentario: string = '';
  avaliou = false;

  unsubscribe$: Subject<any> = new Subject();

  constructor(
    private actRoute: ActivatedRoute,
    private store: Store<any>
  ) {
    this.idFaculdade = Number(this.actRoute.snapshot.params.idFaculdade);

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
      select(selectFaculdades),
    ).subscribe(faculdades => {
      [this.faculdade] = faculdades.filter(f => f.id == this.idFaculdade);
      this.store.dispatch(AlunoActions.getAvaliacoesEComentariosFaculdade({ idFaculdade: this.idFaculdade }));

      this.store.pipe(
        takeUntil(this.unsubscribe$),
        select(selectAvaliacoesFaculdade)
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
        select(selectComentariosFaculdade)
      ).subscribe((comentarios) => {
        if (comentarios.length > 0) {
          // Busca o 1º comentário do aluno logado (comentário de avaliação)
          let [comentarioDoAlunoOrdenado] = [...comentarios.filter(c => c.idAluno === this.idAluno)].sort((a, b) => a.id - b.id);
          this.comentario = comentarioDoAlunoOrdenado.comentario;
        }
      });
    });
  }

  onRatingChange(rating) {
    this.avaliacao = rating;
  }

  avaliar() {
    this.store.dispatch(AlunoActions.avaliarFaculdade({
      idFaculdade: this.idFaculdade,
      idAluno: this.idAluno,
      avaliacao: this.avaliacao,
      comentario: this.comentario
    }));

    this.avaliou = true;
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
