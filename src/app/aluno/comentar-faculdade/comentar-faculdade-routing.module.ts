import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComentarFaculdadePage } from './comentar-faculdade.page';

const routes: Routes = [
  {
    path: '',
    component: ComentarFaculdadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComentarFaculdadePageRoutingModule {}
