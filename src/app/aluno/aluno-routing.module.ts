import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunoPage } from './aluno.page';
import { PesquisarFaculdadesComponent } from './pesquisar-faculdades/pesquisar-faculdades.component';
import { PesquisarProfessoresComponent } from './pesquisar-professores/pesquisar-professores.component';

const routes: Routes = [
  {
    path: '',
    component: AlunoPage
  },
  {
    path: 'pesquisarFaculdades',
    component: PesquisarFaculdadesComponent
  },
  {
    path: 'pesquisarProfessores',
    component: PesquisarProfessoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlunoPageRoutingModule {}
