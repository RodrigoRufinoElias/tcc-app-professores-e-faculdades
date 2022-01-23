import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Faculdade } from 'src/app/models/faculdade.model';
import * as AlunoActions from '../../states/aluno/actions';
import {
  selectIdAluno,
  selectFaculdades
} from '../../states/aluno/selectors';

@Component({
  selector: 'app-comentar-faculdade',
  templateUrl: './comentar-faculdade.page.html',
  styleUrls: ['./comentar-faculdade.page.scss'],
})
export class ComentarFaculdadePage implements OnInit {

  faculdade: Faculdade;
  idFaculdade: number;
  idAluno: number;
  comentario: string = '';

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
    });
  }

  comentar() {
    this.store.dispatch(AlunoActions.comentarFaculdade({
      idFaculdade: this.idFaculdade,
      idAluno: this.idAluno,
      comentario: this.comentario
    }));
  }
}
