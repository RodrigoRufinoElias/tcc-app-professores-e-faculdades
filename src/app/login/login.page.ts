import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';

import { AuthenticationService } from '../seguranca/autenticacao.service';
import * as ConfiguracaoGeralActions from '../states/geral/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private store: Store<any>,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {}

  logIn(email, password) {
    this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: true}));

    this.authService.SignIn(email.value, password.value)
      .then(() => {
        timer(10).subscribe(() => {
          if(this.authService.isEmailVerified) {
            this.store.dispatch(ConfiguracaoGeralActions.verificarPerfilExistente({ email: email.value }));
          } else {
            this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
              {
                mensagemDeErro: 'Email não verificado'
              }
            ));
            this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}));
            return false;
          }
        });
      })
      .catch((error) => {
        this.store.dispatch(ConfiguracaoGeralActions.setMsgDeErro(
          {
            mensagemDeErro: error.message
          }
        ));
        this.store.dispatch(ConfiguracaoGeralActions.isLoading({isLoading: false}));
      });
  }
}
