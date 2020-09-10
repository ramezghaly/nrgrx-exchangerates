
export interface ExchangeRate{
    currencyCode:string;
    rate: number;  
    previousRate: number|null;
}