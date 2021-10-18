import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisarFaculdadesPage } from './pesquisar-faculdades.page';

const routes: Routes = [
  {
    path: '',
    component: PesquisarFaculdadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesquisarFaculdadesPageRoutingModule {}
