import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ModalController } from '@ionic/angular';
import { map, take } from 'rxjs/operators';
import { AngularFireList } from '@angular/fire/compat/database';
import { combineLatest } from 'rxjs';

import { PerfilService } from '../services/perfil.service';
import { Faculdade } from '../models/faculdade.model';
import { Professor } from '../models/professor.model';
import { ModalListasComponent } from './modal-listas/modal-listas.component';
import * as ConfiguracaoGeralActions from '../states/geral/actions';
import { selectAluno } from '../states/aluno/selectors';
import { selectFaculdade } from '../states/faculdade/selectors';
import { selectProfessor } from '../states/professor/selectors';

@Component({
  selector: 'app-config-perfil',
  templateUrl: './config-perfil.page.html',
  styleUrls: ['./config-perfil.page.scss'],
})
export class ConfigPerfilPage {

  tipoPerfil: string;
  id: number;
  titulo: string = '';
  nome: string = '';
  siteOficial: string = '';

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
    this.id = Number(this.actRoute.snapshot.params.id);
    this.init();
  }

  get backRoute() {
    return this.id ? this.tipoPerfil : 'selecao-perfil';
  }

  get emailLogado() {
    return this.perfilService.emailLogado;
  }

  recupararNomeAluno() {
    this.store.pipe(
      take(1),
      select(selectAluno),
    ).subscribe(res => this.nome = res.nome);
  }

  recupararNomeFaculdadeESite() {
    this.store.pipe(
      take(1),
      select(selectFaculdade),
    ).subscribe(res => {
      this.nome = res.nome;
      this.siteOficial = res.siteOficial;
    });
  }

  recupararNomeProfessor() {
    this.store.pipe(
      take(1),
      select(selectProfessor),
    ).subscribe(res => this.nome = res.nome);
  }

  init() {
    if (this.tipoPerfil === 'aluno') {
      this.titulo = 'Dados do Aluno';
      let lista = this.perfilService.listarFaculdades();

      if (this.id) {
        let listaAlunoFaculdade = this.perfilService.listarRelacaoAlunoFaculdadePorIdAluno(this.id);
        this.recupararNomeAluno();
        this.initListasFaculdades(lista, listaAlunoFaculdade);
      } else {
        this.initListasFaculdades(lista);
      }

    } else if (this.tipoPerfil === 'faculdade') {
      this.titulo = 'Dados da Faculdade';
      let lista = this.perfilService.listarProfessores();

      if (this.id) {
        let listaProfessorFaculdade = this.perfilService.listarRelacaoProfessorFaculdadePorIdFaculdade(this.id);
        this.recupararNomeFaculdadeESite();
        this.initListasProfessores(lista, listaProfessorFaculdade);
      } else {
        this.initListasProfessores(lista);
      }

    } else {
      this.titulo = 'Dados do Professor';
      let lista = this.perfilService.listarFaculdades();

      if (this.id) {
        let listaProfessorFaculdade = this.perfilService.listarRelacaoProfessorFaculdadePorIdProfessor(this.id);
        this.recupararNomeProfessor();
        this.initListasFaculdades(lista, listaProfessorFaculdade);
      } else {
        this.initListasFaculdades(lista);
      }
    }
  }

  initListasFaculdades(lista: AngularFireList<any>, listaRelacional?: AngularFireList<any>) {
    if (listaRelacional) {
      combineLatest([
        lista.snapshotChanges().pipe(
          map(actions => this.perfilService.mapSnapshotChanges(actions))
        ),
        listaRelacional.snapshotChanges().pipe(
          map(actions => this.perfilService.mapSnapshotChanges(actions))
        )
      ]).pipe(
        take(1),
        map(([listaCompleta, listaRelacionalCompleta]) => {
          let listaEscolhidaAux = [];

          listaRelacionalCompleta.forEach(lr => {
            const [l] = listaCompleta.filter((lc) => lc.id === lr.idFaculdade);
            listaEscolhidaAux.push(l);
          });

          return {
            lc: listaCompleta,
            le: listaEscolhidaAux
          }
        })
      ).subscribe(res => {
        this.listaFaculdades = res.lc;
        this.listaFaculdadesEscolhidas = res.le;
      });

    } else {
      lista.snapshotChanges().pipe(
        map(actions => this.perfilService.mapSnapshotChanges(actions))
      ).subscribe(res => {
        this.listaFaculdades = [];
        this.listaFaculdades = res;
      });
    }
  }

  initListasProfessores(lista: AngularFireList<any>, listaRelacional?: AngularFireList<any>) {
    if (listaRelacional) {
      combineLatest([
        lista.snapshotChanges().pipe(
          map(actions => this.perfilService.mapSnapshotChanges(actions))
        ),
        listaRelacional.snapshotChanges().pipe(
          map(actions => this.perfilService.mapSnapshotChanges(actions))
        )
      ]).pipe(
        take(1),
        map(([listaCompleta, listaRelacionalCompleta]) => {
          let listaEscolhidaAux = [];

          listaRelacionalCompleta.forEach(lr => {
            const [l] = listaCompleta.filter((lc) => lc.id === lr.idProfessor);
            listaEscolhidaAux.push(l);
          });

          return {
            lc: listaCompleta,
            le: listaEscolhidaAux
          }
        })
      ).subscribe(res => {
        this.listaProfessores = res.lc;
        this.listaProfessoresEscolhidos = res.le;
      });

    } else {
      lista.snapshotChanges().pipe(
        map(actions => this.perfilService.mapSnapshotChanges(actions))
      ).subscribe(res => {
        this.listaProfessores = [];
        this.listaProfessoresEscolhidos = res;
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
            idAluno: this.id,
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
            idFaculdade: this.id,
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
            idProfessor: this.id,
            email: email.value,
            nome: nome.value,
            listaFaculdades: this.listaFaculdadesEscolhidas
          }
        )
      );
    }
  }
}
