import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ModalController, ToastController } from '@ionic/angular';
import { take } from 'rxjs/operators';

import { selectPerfil } from '../states/geral/selectors';
import { PerfilService } from '../services/perfil.service';
import { Faculdade } from '../models/faculdade.model';
import { ModalListasComponent } from './modal-listas/modal-listas.component';

import * as ConfiguracaoGeralActions from '../states/geral/actions';

interface User {
  id: number;
  first: string;
  last: string;
}

@Component({
  selector: 'app-config-perfil',
  templateUrl: './config-perfil.page.html',
  styleUrls: ['./config-perfil.page.scss'],
})
export class ConfigPerfilPage implements OnInit {

  tipoPerfil: string;
  titulo: string = '';
  // emailUsuario: string = '';
  emailUsuario: string = 'mariahcap@gmail.com';
  listaFaculdades: Faculdade[] = [];
  listaFaculdadesEscolhidas: Faculdade[] = [];

  constructor(
    private actRoute: ActivatedRoute,
    private store: Store,
    private perfilService: PerfilService,
    private modalController: ModalController,
    private toastController: ToastController
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
      })

    } else if (this.tipoPerfil === 'faculdade') {
      this.titulo = 'Dados da Faculdade';
    } else {
      this.titulo = 'Dados do Professor';
    }
  }

  async exibirModal() {
    const modal = await this.modalController.create({
      component: ModalListasComponent,
      cssClass: 'modal-listas-class',
      componentProps: {
        'tipoLista': 'Faculdades',
        'listaCompleta': this.listaFaculdades,
        'listaEscolhida': this.listaFaculdadesEscolhidas,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log('dataReturned', dataReturned);
        this.listaFaculdadesEscolhidas = dataReturned.data.listaEscolhida;
      }
    });

    return await modal.present();
  }

  salvarDadosAluno(email, nome) {
    if(nome.value === '' ||  this.listaFaculdadesEscolhidas.length === 0) {
      this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
        {
          mensagemDeErro: "Favor preencher o campo NOME COMPLETO e selecionar ao menos uma FACULDADE."
        }
      ));
    } else {
      this.store.dispatch(
        ConfiguracaoGeralActions.salvarPerfilAluno(
          {
            email: email.value,
            nome: nome.value,
            listaFaculdades: this.listaFaculdadesEscolhidas
          }
        )
      );
    }
  }
}
