import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelecaoPerfilPageRoutingModule } from './selecao-perfil-routing.module';

import { SelecaoPerfilPage } from './selecao-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelecaoPerfilPageRoutingModule
  ],
  declarations: [SelecaoPerfilPage]
})
export class SelecaoPerfilPageModule {}
