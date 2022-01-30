import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarComentarioPageRoutingModule } from './visualizar-comentario-routing.module';

import { VisualizarComentarioPage } from './visualizar-comentario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarComentarioPageRoutingModule
  ],
  declarations: [VisualizarComentarioPage]
})
export class VisualizarComentarioPageModule {}
