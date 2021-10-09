import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigPerfilPageRoutingModule } from './config-perfil-routing.module';

import { ConfigPerfilPage } from './config-perfil.page';
import { ModalListasComponent } from './modal-listas/modal-listas.component';
import { FiltroPipe } from './modal-listas/filtro.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigPerfilPageRoutingModule
  ],
  declarations: [ConfigPerfilPage, ModalListasComponent, FiltroPipe]
})
export class ConfigPerfilPageModule {}
