import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarComentarioFaculdadePageRoutingModule } from './visualizar-comentario-faculdade-routing.module';

import { VisualizarComentarioFaculdadePage } from './visualizar-comentario-faculdade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarComentarioFaculdadePageRoutingModule
  ],
  declarations: [VisualizarComentarioFaculdadePage]
})
export class VisualizarComentarioFaculdadePageModule {}
