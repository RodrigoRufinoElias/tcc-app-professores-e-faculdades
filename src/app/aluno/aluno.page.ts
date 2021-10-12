import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import * as AlunoActions from '../states/aluno/actions';
import { selectAluno } from '../states/aluno/selectors';
import { Aluno } from '../models/aluno.model';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.page.html',
  styleUrls: ['./aluno.page.scss'],
})
export class AlunoPage implements OnInit {

  aluno$: Observable<Aluno>;
  titulo = 'App Professores e Faculdades'

  constructor(
    private store: Store<any>,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(AlunoActions.getPerfilAluno());

    this.aluno$ = this.store.pipe(
      select(selectAluno),
    );

    this.aluno$.subscribe((aluno) => {
      if(aluno)
        this.titulo = `Olá, ${aluno.nome}`
    });
  }

  pesquisarFaculdades() {
    this.router.navigate(['aluno/pesquisarFaculdades']);
  }

  pesquisarProfessores() {
    this.router.navigate(['aluno/pesquisarProfessores']);
  }

  editarDados() {
    this.router.navigate(['config-perfil/aluno']);
  }
}
