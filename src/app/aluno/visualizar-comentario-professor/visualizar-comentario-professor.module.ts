import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarComentarioProfessorPageRoutingModule } from './visualizar-comentario-professor-routing.module';

import { VisualizarComentarioProfessorPage } from './visualizar-comentario-professor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarComentarioProfessorPageRoutingModule
  ],
  declarations: [VisualizarComentarioProfessorPage]
})
export class VisualizarComentarioProfessorPageModule {}
