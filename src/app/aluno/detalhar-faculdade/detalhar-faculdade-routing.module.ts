import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalharFaculdadePage } from './detalhar-faculdade.page';

const routes: Routes = [
  {
    path: '',
    component: DetalharFaculdadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalharFaculdadePageRoutingModule {}
