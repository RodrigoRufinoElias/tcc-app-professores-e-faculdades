import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalharProfessorPage } from './detalhar-professor.page';

const routes: Routes = [
  {
    path: '',
    component: DetalharProfessorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalharProfessorPageRoutingModule {}
