import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliarFaculdadePage } from './avaliar-faculdade.page';

const routes: Routes = [
  {
    path: '',
    component: AvaliarFaculdadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvaliarFaculdadePageRoutingModule {}
