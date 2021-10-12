import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthenticationService } from "./autenticacao.service";
import * as ConfiguracaoGeralActions from '../states/geral/actions';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private store: Store
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn !== true) {
      this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
        {
          mensagemDeErro: 'Acesso negado, o Login é necessário para acessar essa página!'
        }
      ));
      this.router.navigate(['home']);
    }
    return true;
  }

}
