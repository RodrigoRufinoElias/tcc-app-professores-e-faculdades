import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaculdadePage } from './faculdade.page';

const routes: Routes = [
  {
    path: '',
    component: FaculdadePage
  },
  {
    path: 'avaliacoes-comentarios',
    loadChildren: () => import('./avaliacoes-comentarios/avaliacoes-comentarios.module').then( m => m.AvaliacoesComentariosPageModule)
  },
  {
    path: 'responder-comentario/:idComentario',
    loadChildren: () => import('./responder-comentario/responder-comentario.module').then( m => m.ResponderComentarioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaculdadePageRoutingModule {}
