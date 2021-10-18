import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComentarioGeralPage } from './comentario-geral.page';

const routes: Routes = [
  {
    path: '',
    component: ComentarioGeralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComentarioGeralPageRoutingModule {}
