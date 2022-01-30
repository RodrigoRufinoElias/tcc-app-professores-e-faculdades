import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import * as FaculdadeActions from '../states/faculdade/actions';
import * as ConfiguracaoGeralActions from '../states/geral/actions';
import { selectFaculdade } from '../states/faculdade/selectors';
import { Faculdade } from '../models/faculdade.model';

@Component({
  selector: 'app-faculdade',
  templateUrl: './faculdade.page.html',
  styleUrls: ['./faculdade.page.scss'],
})
export class FaculdadePage implements OnInit {

  faculdade$: Observable<Faculdade>;
  titulo = 'App Professores e Faculdades';
  idFaculdade: number;

  constructor(
    private store: Store<any>,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(FaculdadeActions.getPerfilFaculdade());

    this.faculdade$ = this.store.pipe(
      select(selectFaculdade),
    );

    this.faculdade$.subscribe((faculdade) => {
      if(faculdade) {
        this.titulo = `Olá, ${faculdade.nome}`
        this.idFaculdade = faculdade.id
      }
    });
  }

  comentariosAvaliacoes() {
    this.router.navigate(['faculdade/avaliacoes-comentarios']);
  }

  editarDados() {
    this.router.navigate([`config-perfil/faculdade/${this.idFaculdade}`]);
  }

  logout() {
    this.store.dispatch(ConfiguracaoGeralActions.logout());
  }
}
