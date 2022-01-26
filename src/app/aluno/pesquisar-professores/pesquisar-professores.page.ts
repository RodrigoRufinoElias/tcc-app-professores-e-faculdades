import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Professor } from 'src/app/models/professor.model';
import * as AlunoActions from '../../states/aluno/actions';
import { selectProfessores } from '../../states/aluno/selectors';

@Component({
  selector: 'app-pesquisar-professores',
  templateUrl: './pesquisar-professores.page.html',
  styleUrls: ['./pesquisar-professores.page.scss'],
})
export class PesquisarProfessoresPage implements OnInit {

  listaProfessores: Professor[] = [];
  textoFiltro: string = '';

  constructor(
    private store: Store<any>,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(AlunoActions.getProfessoresAluno());

    this.store.pipe(
      select(selectProfessores),
    ).subscribe(professores => this.listaProfessores = professores);
  }

  detalharProfessor(id: number) {
    this.router.navigate([`aluno/detalhar-professor/${id}`]);
  }
}
