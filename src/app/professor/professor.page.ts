import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import * as ProfessorActions from '../states/professor/actions';
import * as ConfiguracaoGeralActions from '../states/geral/actions';
import { selectProfessor } from '../states/professor/selectors';
import { Professor } from '../models/professor.model';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.page.html',
  styleUrls: ['./professor.page.scss'],
})
export class ProfessorPage implements OnInit {

  professor$: Observable<Professor>;
  titulo = 'App Professores e Professors';
  idProfessor: number;

  constructor(
    private store: Store<any>,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(ProfessorActions.getPerfilProfessor());

    this.professor$ = this.store.pipe(
      select(selectProfessor),
    );

    this.professor$.subscribe((professor) => {
      if(professor) {
        this.titulo = `Olá, ${professor.nome}`
        this.idProfessor = professor.id
      }
    });
  }

  comentariosAvaliacoes() {
    // this.router.navigate(['professor/pesquisarProfessores']);
  }

  editarDados() {
    this.router.navigate([`config-perfil/professor/${this.idProfessor}`]);
  }

  logout() {
    this.store.dispatch(ConfiguracaoGeralActions.logout());
  }
}
