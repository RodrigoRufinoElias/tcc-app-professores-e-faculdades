import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Faculdade } from 'src/app/models/faculdade.model';
import * as AlunoActions from '../../states/aluno/actions';
import { selectFaculdades } from '../../states/aluno/selectors';

@Component({
  selector: 'app-pesquisar-faculdades',
  templateUrl: './pesquisar-faculdades.page.html',
  styleUrls: ['./pesquisar-faculdades.page.scss'],
})
export class PesquisarFaculdadesPage implements OnInit {

  listaFaculdade: Faculdade[] = [];
  textoFiltro: string = '';

  constructor(
    private store: Store<any>,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(AlunoActions.getFaculdadesAluno());

    this.store.pipe(
      select(selectFaculdades),
    ).subscribe(faculdades => this.listaFaculdade = faculdades);
  }

  detalharFaculdade(id: number) {
    this.router.navigate([`aluno/detalhar-faculdade/${id}`]);
  }
}
