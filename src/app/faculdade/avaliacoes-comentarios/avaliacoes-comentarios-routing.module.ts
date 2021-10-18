import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliacoesComentariosPage } from './avaliacoes-comentarios.page';

const routes: Routes = [
  {
    path: '',
    component: AvaliacoesComentariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvaliacoesComentariosPageRoutingModule {}
