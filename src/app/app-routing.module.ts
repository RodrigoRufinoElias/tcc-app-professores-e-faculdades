import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'email-verificacao',
    loadChildren: () => import('./email-verificacao/email-verificacao.module').then( m => m.EmailVerificacaoPageModule)
  },
  {
    path: 'selecao-perfil',
    loadChildren: () => import('./selecao-perfil/selecao-perfil.module').then( m => m.SelecaoPerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'config-perfil/:perfil',
    loadChildren: () => import('./config-perfil/config-perfil.module').then( m => m.ConfigPerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'config-perfil/:perfil/:id',
    loadChildren: () => import('./config-perfil/config-perfil.module').then( m => m.ConfigPerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'professor',
    loadChildren: () => import('./professor/professor.module').then( m => m.ProfessorPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'aluno',
    loadChildren: () => import('./aluno/aluno.module').then( m => m.AlunoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'faculdade',
    loadChildren: () => import('./faculdade/faculdade.module').then( m => m.FaculdadePageModule),
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
