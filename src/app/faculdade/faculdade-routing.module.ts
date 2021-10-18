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
    path: 'comentario-geral',
    loadChildren: () => import('./comentario-geral/comentario-geral.module').then( m => m.ComentarioGeralPageModule)
  },
  {
    path: 'responder-comentario',
    loadChildren: () => import('./responder-comentario/responder-comentario.module').then( m => m.ResponderComentarioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaculdadePageRoutingModule {}
