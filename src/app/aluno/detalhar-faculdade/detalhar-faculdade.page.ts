import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Faculdade } from 'src/app/models/faculdade.model';
import * as AlunoActions from '../../states/aluno/actions';
import { ComentarioFaculdade } from 'src/app/models/comentarioFaculdade';
import {
  selectIdAluno,
  selectFaculdades,
  selectAvaliacoes,
  selectComentarios
} from '../../states/aluno/selectors';

@Component({
  selector: 'app-detalhar-faculdade',
  templateUrl: './detalhar-faculdade.page.html',
  styleUrls: ['./detalhar-faculdade.page.scss'],
})
export class DetalharFaculdadePage implements OnInit {

  faculdade: Faculdade;
  idFaculdade: number;
  idAluno: number;
  avaliacaoGeral: number = 0;
  comentarios: ComentarioFaculdade[] = [];
  labelAvaliar: string = 'Avaliar Faculdade';

  unsubscribe$: Subject<any> = new Subject();

  constructor(
    private actRoute: ActivatedRoute,
    private store: Store<any>,
    private router: Router
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
        select(selectAvaliacoes)
      ).subscribe((avaliacoes) => {
        if (avaliacoes.length > 0) {
          this.verificarAvaliacaoGeral(avaliacoes);
          this.verificarSeAlunoAvaliou(avaliacoes);
        }
      });

      this.store.pipe(
        takeUntil(this.unsubscribe$),
        select(selectComentarios)
      ).subscribe((comentarios) => {
        if (comentarios.length > 0) {
          this.comentarios = comentarios;
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
    this.labelAvaliar = avaliacao ? 'Editar Avaliação Faculdade' : 'Avaliar Faculdade';
  }

  avaliar() {
    this.router.navigate([`aluno/avaliar-faculdade/${this.idFaculdade}`]);
  }

  comentar() {
    this.router.navigate([`aluno/comentar-faculdade/${this.idFaculdade}`]);
  }

  verComentario(idComentario) {
    this.router.navigate([`aluno/visualizar-faculdade/${idComentario}`]);
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
