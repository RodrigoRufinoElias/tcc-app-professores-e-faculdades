import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliarProfessorPage } from './avaliar-professor.page';

const routes: Routes = [
  {
    path: '',
    component: AvaliarProfessorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvaliarProfessorPageRoutingModule {}
