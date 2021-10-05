import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

import {
  selectIsLoading,
  selectIsLoggedIn,
  selectMensagemDeErro,
} from './states/geral/selectors';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isLoading$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  mensagemDeErroDoSistema$: Observable<string>;

  loading: HTMLIonLoadingElement;

  constructor(
    private store: Store<any>,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      cssClass: 'loadingSpinner',
      spinner: 'bubbles',
      message: 'Aguarde...'
    });

    this.isLoading$ = this.store.pipe(
      select(selectIsLoading),
    );

    this.isLoggedIn$ = this.store.pipe(
      select(selectIsLoggedIn),
    );

    this.mensagemDeErroDoSistema$ = this.store.pipe(
      select(selectMensagemDeErro),
    );

    this.isLoading$.subscribe((isLoading) => {
      if(isLoading) {
        this.presentLoading();
      } else {
        this.dismissLoading();
      }
    });
  }

  async presentLoading() {
    await this.loading.present();
  }

  async dismissLoading() {
    await this.loading.dismiss();
  }
}
