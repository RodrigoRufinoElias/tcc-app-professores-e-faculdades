import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    path: 'professor',
    loadChildren: () => import('./professor/professor.module').then( m => m.ProfessorPageModule)
  },
  {
    path: 'aluno',
    loadChildren: () => import('./aluno/aluno.module').then( m => m.AlunoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'faculdade',
    loadChildren: () => import('./faculdade/faculdade.module').then( m => m.FaculdadePageModule)
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
    loadChildren: () => import('./selecao-perfil/selecao-perfil.module').then( m => m.SelecaoPerfilPageModule)
  },
  {
    path: 'config-perfil',
    loadChildren: () => import('./config-perfil/config-perfil.module').then( m => m.ConfigPerfilPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
