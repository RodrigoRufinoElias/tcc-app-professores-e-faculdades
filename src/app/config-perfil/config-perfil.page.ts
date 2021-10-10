import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';

import { selectPerfil } from '../states/geral/selectors';
import { PerfilService } from '../services/perfil.service';
import { Faculdade } from '../models/faculdade.model';
import { Professor } from '../models/professor.model';
import { ModalListasComponent } from './modal-listas/modal-listas.component';
import * as ConfiguracaoGeralActions from '../states/geral/actions';

@Component({
  selector: 'app-config-perfil',
  templateUrl: './config-perfil.page.html',
  styleUrls: ['./config-perfil.page.scss'],
})
export class ConfigPerfilPage implements OnInit {

  tipoPerfil: string;
  titulo: string = '';
  emailUsuario: string = '';
  listaFaculdades: Faculdade[] = [];
  listaFaculdadesEscolhidas: Faculdade[] = [];
  listaProfessores: Professor[] = [];
  listaProfessoresEscolhidos: Professor[] = [];

  constructor(
    private actRoute: ActivatedRoute,
    private store: Store,
    private perfilService: PerfilService,
    private modalController: ModalController
  ) {
    this.tipoPerfil = this.actRoute.snapshot.params.perfil;
    this.init();
  }

  ngOnInit() {
    this.store.pipe(take(1), select(selectPerfil))
      .subscribe((p) => this.emailUsuario = p.emailLogado);
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
      });

    } else if (this.tipoPerfil === 'faculdade') {
      this.titulo = 'Dados da Faculdade';

      let lista = this.perfilService.listarProfessores();
      lista.snapshotChanges().subscribe(res => {
        this.listaProfessores = [];
        res.forEach(item => {
          let f = item.payload.toJSON();
          f['$key'] = item.key;
          this.listaProfessores.push(f as Professor);
        });
      });

    } else {
      this.titulo = 'Dados do Professor';

      let lista = this.perfilService.listarFaculdades();
      lista.snapshotChanges().subscribe(res => {
        this.listaFaculdades = [];
        res.forEach(item => {
          let f = item.payload.toJSON();
          f['$key'] = item.key;
          this.listaFaculdades.push(f as Faculdade);
        });
      });
    }
  }

  async exibirModalFaculdades() {
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
        this.listaFaculdadesEscolhidas = dataReturned.data.listaEscolhida;
      }
    });

    return await modal.present();
  }

  async exibirModalProfessores() {
    const modal = await this.modalController.create({
      component: ModalListasComponent,
      cssClass: 'modal-listas-class',
      componentProps: {
        'tipoLista': 'Professores',
        'listaCompleta': this.listaProfessores,
        'listaEscolhida': this.listaProfessoresEscolhidos,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.listaProfessoresEscolhidos = dataReturned.data.listaEscolhida;
      }
    });

    return await modal.present();
  }

  salvarDadosAluno(email, nome) {
    if(nome.value === '' || this.listaFaculdadesEscolhidas.length === 0) {
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

  salvarDadosFaculdade(email, nome, site) {
    if(nome.value === '' || site.value === '' || this.listaProfessoresEscolhidos.length === 0) {
      this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
        {
          mensagemDeErro: "Favor preencher o campo NOME DA FACULDADE, SITE OFICIAL e selecionar ao menos um PROFESSOR."
        }
      ));
    } else {
      this.store.dispatch(
        ConfiguracaoGeralActions.salvarPerfilFaculdade(
          {
            email: email.value,
            nome: nome.value,
            siteOficial: site.value,
            listaProfessores: this.listaProfessoresEscolhidos
          }
        )
      );
    }
  }

  salvarDadosProfessor(email, nome) {
    if(nome.value === '' || this.listaFaculdadesEscolhidas.length === 0) {
      this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
        {
          mensagemDeErro: "Favor preencher o campo NOME COMPLETO e selecionar ao menos uma FACULDADE."
        }
      ));
    } else {
      this.store.dispatch(
        ConfiguracaoGeralActions.salvarPerfilProfessor(
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
