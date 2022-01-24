import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarComentarioFaculdadePage } from './visualizar-comentario-faculdade.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarComentarioFaculdadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarComentarioFaculdadePageRoutingModule {}
