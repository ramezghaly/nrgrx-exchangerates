import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { CurrencyState } from './currency.state'
import * as CoreSelectors from '../../core/state/core.selectors';
import { Params } from '@angular/router';
import { CompileMetadataResolver } from '@angular/compiler';
import { ExchangeRate, ExchangeRateDiff, TopRatesTypes } from '../models';

const getCurrencyFeatureState = createFeatureSelector<CurrencyState>('currency');

export const getBaseCurrency = createSelector(
    getCurrencyFeatureState,
    state => state.baseCurrency
);

export const getSelectedCurrency = createSelector(
    getCurrencyFeatureState,
    state => state.selectedCurrency
);

export const getLatestRatesDate = createSelector(
    getCurrencyFeatureState,
    state => state.latestRatesDate
);


export const getCurrencyList = createSelector(
    getCurrencyFeatureState,
    state => state.currencyList
);

export const getLatestRates = createSelector(
    getCurrencyFeatureState,
    state => state.latestRates
);

export const getTopFiveRates = createSelector(
    getCurrencyFeatureState,
    state => state.topRatesType == TopRatesTypes.INCREASE?
        getHighestRates([...state.latestRates.rates]):
        getLeastRates([...state.latestRates.rates])
);



export const getSelectedCurrencyHistory = createSelector(
    getCurrencyFeatureState,
    state => state.selectedCurrencyHistory
);

export const getError = createSelector(
    getCurrencyFeatureState,
    state => state.error
);

export const getTopRatesType = createSelector(
    getCurrencyFeatureState,
    state => state.topRatesType
);

function getHighestRates(rates: ExchangeRate[]): ExchangeRateDiff[]{
    return rates.filter(rate => rate.rate - rate.previousRate > 0)
    .sort(
        (rate1, rate2) => {
            if ((rate1.rate - rate1.previousRate) > (rate2.rate - rate2.previousRate)) {
                return -1;
            }
            else if ((rate1.rate - rate1.previousRate) < (rate2.rate - rate2.previousRate)) {
                return 1;
            }
            return 0;
        })
        .slice(0,5)
        .map(rate => 
            ({
                currencyCode: rate.currencyCode,
                difference: rate.rate - rate.previousRate,
                percentage: ((rate.rate - rate.previousRate)/rate.previousRate)*100
            }));
}

function getLeastRates(rates: ExchangeRate[]): ExchangeRateDiff[]{
    return rates.filter(rate => rate.rate - rate.previousRate < 0)
    .sort(
        (rate1, rate2) => {
            if ((rate1.rate - rate1.previousRate) < (rate2.rate - rate2.previousRate)) {
                return -1;
            }
            else if ((rate1.rate - rate1.previousRate) > (rate2.rate - rate2.previousRate)) {
                return 1;
            }
            return 0;
        })
        .slice(0,5)
        .map(rate => 
            ({
                currencyCode: rate.currencyCode,
                difference: rate.rate - rate.previousRate,
                percentage: ((rate.rate - rate.previousRate)/rate.previousRate)*100
            }))
}