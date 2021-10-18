import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarComentarioPage } from './visualizar-comentario.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarComentarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarComentarioPageRoutingModule {}
