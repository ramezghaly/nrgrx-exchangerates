import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
import { ExchangeRates, ExchangeRate, ExchangeRateHistory } from '../models'
import { DateService } from '../../shared/services/date.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {
  private apiBaseUrl = 'https://api.exchangeratesapi.io';
  constructor(private http: HttpClient,
    private dateService: DateService) { }

  getlatestRates(baseCurrency: string | null): Observable<ExchangeRates> {
    return this.http.get<any>(`${this.apiBaseUrl}/latest`,
      {
        params: {
          "base": baseCurrency ? baseCurrency : ''
        }
      })
      .pipe(
        tap(data => {
          console.log(data);
        }),
        switchMap((data: any) => {
          let exchangeRates: ExchangeRate[] = [];
          let date = new Date(Date.parse(data.date));
          let previousDate = new Date(new Date().setDate(date.getDate() - 1))
          return this.getRatesByDate(previousDate, data.base)
            .pipe(
              map(previousData => {
                if (previousData && previousData.rates) {
                  Object.keys(data.rates)
                    .filter(currencyCode => currencyCode != baseCurrency)
                    .forEach(currencyCode => {
                      exchangeRates.push({ 
                        currencyCode: currencyCode, 
                        rate: data.rates[currencyCode],
                        previousRate: previousData.rates[currencyCode] });
                    });
                }
                return {
                  date: new Date(Date.parse(data.date)),
                  rates: exchangeRates,
                  baseCurrency: data.base
                }
              })
            )
          }
        )
        ,
        catchError(this.handleError)
      );
  }

  getRatesByDate(date: Date, baseCurrency: string | null): Observable<any> {
    if (!date) {
      return of({
        rates: [],
        date: null,
        base: null
      });
    }

    return this.http.get<any>(`${this.apiBaseUrl}/${this.dateService.formatDate(date)}`,
      {
        params: {
          "base": baseCurrency ? baseCurrency : ''
        }
      })
      .pipe(
        tap(data => {
          console.log(data);
        }),
        catchError(this.handleError)
      );
  }

  getHistory(startDate: Date, endDate: Date, currency: string, baseCurrency: string): Observable<ExchangeRateHistory> {

    return this.http.get<any>(`${this.apiBaseUrl}/history`,
      {
        params: {
          "base": baseCurrency,
          "symbol": currency,
          "start_at": this.dateService.formatDate(startDate),
          "end_at": this.dateService.formatDate(endDate)
        }
      })
      .pipe(
        tap(data => {
          console.log(data);
        }),
        map(data => {
          let history: { date: Date, rate: number }[] = [];
          if (data && data.rates) {
            Object.keys(data.rates).sort().forEach(date => {
              history.push({ date: new Date(Date.parse(date)), rate: data.rates[date][currency] });
            });
          }
          return {
            startDate: new Date(Date.parse(data.start_at)),
            endDate: new Date(Date.parse(data.end_at)),
            currency: currency,
            baseCurrency: data.base,
            history: history
          }
        }),
        catchError(this.handleError)
      );
  }



  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.      
      errorMessage = `Server Error ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
