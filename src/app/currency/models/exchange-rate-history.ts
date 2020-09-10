import { ExchangeRate } from ".";

export interface ExchangeRateHistory {
    history: {date:Date,rate:number}[];
    startDate: Date;
    endDate: Date;
    currency:string;
    baseCurrency: string;
}