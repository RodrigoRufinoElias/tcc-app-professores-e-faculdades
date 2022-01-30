import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Faculdade } from 'src/app/models/faculdade.model';
import * as FaculdadeActions from '../../states/faculdade/actions';
import { ComentarioFaculdade } from 'src/app/models/comentarioFaculdade';
import {
  selectFaculdade,
  selectAvaliacoesFaculdade,
  selectComentariosFaculdade
} from '../../states/faculdade/selectors';

@Component({
  selector: 'app-avaliacoes-comentarios',
  templateUrl: './avaliacoes-comentarios.page.html',
  styleUrls: ['./avaliacoes-comentarios.page.scss'],
})
export class AvaliacoesComentariosPage {

  faculdade: Faculdade;
  avaliacaoGeral: number = 0;
  comentarios: ComentarioFaculdade[] = [];

  unsubscribe$: Subject<any> = new Subject();

  constructor(
    private store: Store<any>,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.store.pipe(
      take(1),
      select(selectFaculdade)
    ).subscribe((faculdade) => {
      this.faculdade = faculdade;
      this.store.dispatch(FaculdadeActions.getAvaliacoesEComentariosFaculdade({ idFaculdade: faculdade.id }));

      this.store.pipe(
        takeUntil(this.unsubscribe$),
        select(selectAvaliacoesFaculdade)
      ).subscribe((avaliacoes) => {
        if (avaliacoes.length > 0) {
          this.verificarAvaliacaoGeral(avaliacoes);
        }
      });

      this.store.pipe(
        takeUntil(this.unsubscribe$),
        select(selectComentariosFaculdade)
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

  verComentario(idComentario) {
    this.router.navigate([`faculdade/responder-comentario/${idComentario}`]);
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
