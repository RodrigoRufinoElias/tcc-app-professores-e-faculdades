import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { AuthenticationService } from '../seguranca/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then(() => {
        timer(10).subscribe(() => {
          if(this.authService.isEmailVerified) {
            this.router.navigate(['dashboard']);
          } else {
            window.alert('Email não verificado')
            return false;
          }
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}
