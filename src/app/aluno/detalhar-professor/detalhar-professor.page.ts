import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Faculdade } from 'src/app/models/faculdade.model';
import * as AlunoActions from '../../states/aluno/actions';
import { selectFaculdades } from '../../states/aluno/selectors';

@Component({
  selector: 'app-detalhar-professor',
  templateUrl: './detalhar-professor.page.html',
  styleUrls: ['./detalhar-professor.page.scss'],
})
export class DetalharProfessorPage implements OnInit {

  faculdade: Faculdade;
  idFaculdade: number;

  constructor(
    private actRoute: ActivatedRoute,
    private store: Store<any>,
    private router: Router
  ) {
    this.idFaculdade = Number(this.actRoute.snapshot.params.id);
  }

  ngOnInit() {
    this.store.pipe(
      take(1),
      select(selectFaculdades),
    ).subscribe(faculdades => {
      [this.faculdade] = faculdades.filter(f => f.id === this.idFaculdade);
    });
  }

}
