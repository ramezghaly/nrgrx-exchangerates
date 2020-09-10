import { ExchangeRate } from '../models';
import { createReducer, on } from '@ngrx/store';
import * as CurrencyActions from './currency.actions';
import * as CurrencyStates from './currency.state';

export const currencyReducer = createReducer<CurrencyStates.CurrencyState>(
    CurrencyStates.initialCurrencyState,

    on(CurrencyActions.loadLatestRatesSuccess,
        (state, action): CurrencyStates.CurrencyState => {
            return {
                ...state,
                latestRates: action.rates,
                latestRatesDate: action.rates.date,
                error: null
            };
        }),
    on(CurrencyActions.loadLatestRatesFailure,
        (state, action): CurrencyStates.CurrencyState => {
            return {
                ...state,
                error: action.error
            };
        }),
    on(CurrencyActions.loadCurrencies,
        (state, action): CurrencyStates.CurrencyState => {
            if (state.currencyList && state.currencyList.length > 0) {
                return state;
            }
            return {
                ...state,
                currencyList: action.currencyList
            };
        }),

    on(CurrencyActions.loadCurrencyHistorySuccess,
        (state, action): CurrencyStates.CurrencyState => {
            return {
                ...state,
                selectedCurrencyHistory: action.history,
                error: null
            };
        }),
    on(CurrencyActions.loadCurrencyHistoryFailure,
        (state, action): CurrencyStates.CurrencyState => {
            return {
                ...state,
                error: action.error
            };
        }),
    on(CurrencyActions.updateBaseCurrency,
        (state, action): CurrencyStates.CurrencyState => {
            return {
                ...state,
                baseCurrency: action.currencyCode
            };
        }),
    on(CurrencyActions.updateSelectedCurrency,
        (state, action): CurrencyStates.CurrencyState => {
            return {
                ...state,
                selectedCurrency: action.currencyCode
            };
        }),
    on(CurrencyActions.updateTopRateType,
        (state, action): CurrencyStates.CurrencyState => {
            return {
                ...state,
                topRatesType: action.rateType
            };
        })


);