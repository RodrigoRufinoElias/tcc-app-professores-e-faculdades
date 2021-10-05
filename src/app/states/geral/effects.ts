import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, take } from 'rxjs/operators';

import * as ConfiguracaoGeralActions from './actions';

@Injectable({ providedIn: 'root' })
export class ConfiguracaoGeralEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
  ) {}

  // buscarDadosPorCodigoSucursalSpg$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(ConfiguracaoGeralActions.setPerfil),
  //       tap(({ codSucursal }) =>
  //         this.cotacaoSpgService
  //           .getDadosPorCodigoSucursalSpg(codSucursal)
  //           .pipe(take(1))
  //           .subscribe(
  //             (sucursal) => {
  //               this.store.dispatch(
  //                 SelecaoSucursalActions.buscarDadosPorCodigoSucursalSpgSuccess({ sucursal }),
  //               );
  //             },
  //             (error) => {
  //               this.store.dispatch(
  //                 SelecaoSucursalActions.buscarDadosPorCodigoSucursalSpgError({
  //                   mensagemDeErro: error.getMessage(),
  //                 }),
  //               );
  //             },
  //           ),
  //       ),
  //     ),
  //   { dispatch: false },
  // );
}
