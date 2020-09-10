import { ExchangeRate } from ".";

export interface ExchangeRates {
    rates: ExchangeRate[];
    date: Date;
    baseCurrency: string;
}