import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Faculdade } from 'src/app/models/faculdade.model';

@Component({
  selector: 'app-modal-listas',
  templateUrl: './modal-listas.component.html',
  styleUrls: ['./modal-listas.component.scss'],
})
export class ModalListasComponent implements OnInit {

  @Input() tipoLista: string;
  @Input() listaCompleta: Faculdade[];
  @Input() listaEscolhida: Faculdade[];

  listaCompletaAux: Faculdade[] = [];
  textoFiltro: string = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.estruturarLista();
  }

  estruturarLista() {
    this.listaCompletaAux = [];
    this.listaCompleta.forEach((lc) => {
      if(this.listaEscolhida.filter((i) => i.id === lc.id).length === 0)
        this.listaCompletaAux.push(lc);
    });
  }

  addItem(id: number) {
    let itemSelecionado: Faculdade;
    [itemSelecionado] = this.listaCompletaAux.filter((i) => i.id === id);
    this.listaEscolhida.push(itemSelecionado);
    this.estruturarLista();
  }

  remItem(id: number) {
    this.listaEscolhida = this.listaEscolhida.filter((i) => i.id != id);
    this.estruturarLista();
  }

  fecharModal() {
    this.modalController.dismiss({
      'listaEscolhida': this.listaEscolhida
    });
  }

}
