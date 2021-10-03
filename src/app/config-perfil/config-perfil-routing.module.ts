import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigPerfilPage } from './config-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigPerfilPageRoutingModule {}
