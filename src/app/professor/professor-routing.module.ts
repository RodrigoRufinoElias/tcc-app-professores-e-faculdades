import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessorPage } from './professor.page';

const routes: Routes = [
  {
    path: '',
    component: ProfessorPage
  },
  {
    path: 'avaliacoes-comentarios',
    loadChildren: () => import('./avaliacoes-comentarios/avaliacoes-comentarios.module').then( m => m.AvaliacoesComentariosPageModule)
  },
  {
    path: 'responder-comentario',
    loadChildren: () => import('./responder-comentario/responder-comentario.module').then( m => m.ResponderComentarioPageModule)
  },
  {
    path: 'visualizar-comentario',
    loadChildren: () => import('./visualizar-comentario/visualizar-comentario.module').then( m => m.VisualizarComentarioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessorPageRoutingModule {}
