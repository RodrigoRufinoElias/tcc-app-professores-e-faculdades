import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaculdadePage } from './faculdade.page';

const routes: Routes = [
  {
    path: '',
    component: FaculdadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaculdadePageRoutingModule {}
