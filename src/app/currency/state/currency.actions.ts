import { createAction, props } from '@ngrx/store';
import { ExchangeRate, ExchangeRates, ExchangeRateHistory, TopRatesTypes } from '../models';

export const loadCurrencies = createAction(
    '[Currency] Load Currencies',
    props<{currencyList:string[]}>()
);

export const loadLatestRates = createAction(
    '[Currency] Load Latest Rates',
    props<{baseCurrency:string|null}>()
);

export const loadLatestRatesSuccess = createAction(    
    '[Currency API] Load Latest Rates Success',
    props<{ rates: ExchangeRates }>()
);

export const loadLatestRatesFailure = createAction(
    '[Currency API] Load Latest Rates Failure',
    props<{ error: string}>()
);

export const updateBaseCurrency = createAction(
    '[Currency] Update Base Currency',
    props<{ currencyCode: string }>()
);

export const loadCurrencyHistory = createAction(
    '[Currency] Load Currency History',
    props<{ startDate:Date, endDate:Date, currency:string, baseCurrency: string }>()
);

export const loadCurrencyHistorySuccess = createAction(    
    '[Currency API] Load Currency History Success',
    props<{ history: ExchangeRateHistory }>()
);

export const loadCurrencyHistoryFailure = createAction(
    '[Currency API] Load Currency History Failure',
    props<{ error: string}>()

);

export const updateSelectedCurrency = createAction(
    '[Curency] Update Selected Currency',
    props<{ currencyCode: string }>()
);

export const updateTopRateType = createAction(
    '[Currency] Update Top Rates Type',
    props<{ rateType: TopRatesTypes }>()
);