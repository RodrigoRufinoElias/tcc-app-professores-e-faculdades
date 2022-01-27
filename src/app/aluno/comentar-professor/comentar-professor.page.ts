import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Professor } from 'src/app/models/professor.model';
import * as AlunoActions from '../../states/aluno/actions';
import {
  selectIdAluno,
  selectProfessores
} from '../../states/aluno/selectors';

@Component({
  selector: 'app-comentar-professor',
  templateUrl: './comentar-professor.page.html',
  styleUrls: ['./comentar-professor.page.scss'],
})
export class ComentarProfessorPage implements OnInit {

  professor: Professor;
  idProfessor: number;
  idAluno: number;
  comentario: string = '';
  grauBomRuim: number = 0;

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
    ).subscribe(professor => {
      [this.professor] = professor.filter(f => f.id == this.idProfessor);
    });
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

  comentar() {
    this.store.dispatch(AlunoActions.comentarProfessor({
      idProfessor: this.idProfessor,
      idAluno: this.idAluno,
      comentario: this.comentario,
      grauBomRuim: this.grauBomRuim
    }));
  }
}
