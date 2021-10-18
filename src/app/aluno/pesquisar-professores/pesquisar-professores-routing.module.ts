import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisarProfessoresPage } from './pesquisar-professores.page';

const routes: Routes = [
  {
    path: '',
    component: PesquisarProfessoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesquisarProfessoresPageRoutingModule {}
