import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';

import { ExchangeRatesService } from '../services/exchange-rates.service';
import * as CurrencyActions from './currency.actions';
import * as CoreActions from '../../core/state/core.actions';
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

    loadData$ = createEffect(() => {
        return this.actions$
            .pipe(
                filter(action => 
                    action.type == CurrencyActions.loadLatestRates.type||
                    action.type == CurrencyActions.loadCurrencyHistory.type),
                switchMap(
                    (action) =>  of(CoreActions.showLoader())
                )
            );
    });

    finishLoadData$ = createEffect(() => {
        return this.actions$
            .pipe(
                filter(action => 
                    action.type == CurrencyActions.loadCurrencyHistorySuccess.type||
                    action.type == CurrencyActions.loadCurrencyHistoryFailure.type||
                    action.type == CurrencyActions.loadLatestRatesSuccess.type||
                    action.type == CurrencyActions.loadLatestRatesFailure.type),
                switchMap(
                    (action) =>  of(CoreActions.hideLoader())
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
