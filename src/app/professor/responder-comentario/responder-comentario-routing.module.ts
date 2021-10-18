import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponderComentarioPage } from './responder-comentario.page';

const routes: Routes = [
  {
    path: '',
    component: ResponderComentarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponderComentarioPageRoutingModule {}
