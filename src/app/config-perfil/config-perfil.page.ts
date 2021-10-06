import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { selectPerfil } from '../states/geral/selectors';
import { PerfilService } from '../services/perfil.service';
import { Faculdade } from '../models/faculdade.model';

@Component({
  selector: 'app-config-perfil',
  templateUrl: './config-perfil.page.html',
  styleUrls: ['./config-perfil.page.scss'],
})
export class ConfigPerfilPage implements OnInit {

  tipoPerfil: string;
  titulo: string = '';
  emailUsuario: string = 'rodrigo.rufino.elias@gmail.com';
  listaFaculdades = [];

  constructor(
    private actRoute: ActivatedRoute,
    private store: Store,
    private perfilService: PerfilService
  ) {
    this.tipoPerfil = this.actRoute.snapshot.params.perfil;
    this.init();
  }

  ngOnInit() {
    // this.store.pipe(take(1), select(selectPerfil))
    //   .subscribe((p) => this.emailUsuario = p.emailLogado);
  }

  init() {
    if (this.tipoPerfil === 'aluno') {
      this.titulo = 'Dados do Aluno';

      let lista = this.perfilService.listarFaculdades();
      lista.snapshotChanges().subscribe(res => {
        this.listaFaculdades = [];
        res.forEach(item => {
          let f = item.payload.toJSON();
          f['$key'] = item.key;
          this.listaFaculdades.push(f as Faculdade);
        });
        console.log('listaFaculdades', this.listaFaculdades);
      })

    } else if (this.tipoPerfil === 'faculdade') {
      this.titulo = 'Dados da Faculdade';
    } else {
      this.titulo = 'Dados do Professor';
    }
  }

  salvarDadosAluno(email, nome) {
    console.log('email', email.value);
    console.log('nome', nome.value);
  }
}
