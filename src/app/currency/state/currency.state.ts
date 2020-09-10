import { ExchangeRates, ExchangeRateHistory, TopRatesTypes } from "../models";
import * as AppState from "../../state/app.state";

export interface State extends AppState.State {
    currency: CurrencyState
}

export interface CurrencyState {
    baseCurrency: string;
    currencyList: string[];
    latestRates: ExchangeRates;
    latestRatesDate: Date;
    selectedCurrency:string;
    selectedCurrencyHistory: ExchangeRateHistory;
    topRatesType: TopRatesTypes;
    error: string;

}
export const initialCurrencyState: CurrencyState = {
    baseCurrency: 'EUR',
    currencyList: [],
    latestRates: {
        rates: [],
        date: new Date(Date.now()),
        baseCurrency: null
    },
    latestRatesDate: new Date(Date.now()),
    selectedCurrency:null,
    selectedCurrencyHistory: null,
    topRatesType: TopRatesTypes.INCREASE,
    error: null
}