import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComentarProfessorPage } from './comentar-professor.page';

const routes: Routes = [
  {
    path: '',
    component: ComentarProfessorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComentarProfessorPageRoutingModule {}
