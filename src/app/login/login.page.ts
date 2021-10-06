import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';

import { AuthenticationService } from '../seguranca/autenticacao.service';
import { PerfilService } from '../services/perfil.service';
import * as Actions from '../states/geral/actions';

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
    this.store.dispatch(Actions.isLoading({isLoading: true}));

    this.authService.SignIn(email.value, password.value)
      .then(() => {
        timer(10).subscribe(() => {
          if(this.authService.isEmailVerified) {
            this.store.dispatch(Actions.verificarPerfilExistente({ email: email.value }));
          } else {
            window.alert('Email não verificado');
            this.store.dispatch(Actions.isLoading({isLoading: false}));
            return false;
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
        this.store.dispatch(Actions.isLoading({isLoading: false}));
      });
  }
}
