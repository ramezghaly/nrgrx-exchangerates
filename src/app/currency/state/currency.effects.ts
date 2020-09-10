import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ExchangeRatesService } from '../services/exchange-rates.service';
import * as CurrencyActions from './currency.actions';
import { ExchangeRate } from '../models';

@Injectable()
export class CurrencyEffects {

    constructor(private actions$: Actions, private exchangeRatesService: ExchangeRatesService) { }

    loadLatestRates$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(CurrencyActions.loadLatestRates),
                switchMap(
                    (action) => this.exchangeRatesService.getlatestRates(action.baseCurrency)
                        .pipe(
                            map(rates => CurrencyActions.loadLatestRatesSuccess({ rates })),
                            catchError(error => of(CurrencyActions.loadLatestRatesFailure({ error })))
                        )
                )
            );
    });

    loadCurrencies$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(CurrencyActions.loadLatestRatesSuccess),
                map(action => {
                    let currencyList = action.rates.rates.map((r: ExchangeRate) => r.currencyCode);
                    currencyList.push(action.rates.baseCurrency);
                    currencyList.sort();
                    return CurrencyActions.loadCurrencies({ currencyList: currencyList });
                }
                )
            );
    });

    loadCurrencyHistory$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(CurrencyActions.loadCurrencyHistory),
                switchMap(
                    (action) => this.exchangeRatesService.getHistory(
                        action.startDate, action.endDate, action.currency, action.baseCurrency)
                        .pipe(
                            map(history => CurrencyActions.loadCurrencyHistorySuccess({history:history })),
                            catchError(error => of(CurrencyActions.loadLatestRatesFailure({ error })))
                        )
                )
            );
    });

}
