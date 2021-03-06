import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunoPage } from './aluno.page';

const routes: Routes = [
  {
    path: '',
    component: AlunoPage
  },
  {
    path: 'avaliar-faculdade/:idFaculdade',
    loadChildren: () => import('./avaliar-faculdade/avaliar-faculdade.module').then( m => m.AvaliarFaculdadePageModule)
  },
  {
    path: 'avaliar-professor/:idProfessor',
    loadChildren: () => import('./avaliar-professor/avaliar-professor.module').then( m => m.AvaliarProfessorPageModule)
  },
  {
    path: 'comentar-faculdade/:idFaculdade',
    loadChildren: () => import('./comentar-faculdade/comentar-faculdade.module').then( m => m.ComentarFaculdadePageModule)
  },
  {
    path: 'comentar-professor/:idProfessor',
    loadChildren: () => import('./comentar-professor/comentar-professor.module').then( m => m.ComentarProfessorPageModule)
  },
  {
    path: 'detalhar-faculdade/:idFaculdade',
    loadChildren: () => import('./detalhar-faculdade/detalhar-faculdade.module').then( m => m.DetalharFaculdadePageModule)
  },
  {
    path: 'detalhar-professor/:idProfessor',
    loadChildren: () => import('./detalhar-professor/detalhar-professor.module').then( m => m.DetalharProfessorPageModule)
  },
  {
    path: 'pesquisar-faculdades',
    loadChildren: () => import('./pesquisar-faculdades/pesquisar-faculdades.module').then( m => m.PesquisarFaculdadesPageModule)
  },
  {
    path: 'pesquisar-professores',
    loadChildren: () => import('./pesquisar-professores/pesquisar-professores.module').then( m => m.PesquisarProfessoresPageModule)
  },
  {
    path: 'visualizar-comentario-faculdade/:idComentario',
    loadChildren: () => import('./visualizar-comentario-faculdade/visualizar-comentario-faculdade.module').then( m => m.VisualizarComentarioFaculdadePageModule)
  },
  {
    path: 'visualizar-comentario-professor/:idComentario',
    loadChildren: () => import('./visualizar-comentario-professor/visualizar-comentario-professor.module').then( m => m.VisualizarComentarioProfessorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlunoPageRoutingModule {}
