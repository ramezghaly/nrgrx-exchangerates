import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { State } from '../../state/currency.state';
import * as Selectors from '../../state/currency.selectors';
import * as CurrencyActions from '../../state/currency.actions';
import { ExchangeRateHistory } from '../../models';



@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.scss']
})
export class HistoricalDataComponent implements OnInit, OnDestroy {
  selectedCurrency: string;
  currencyList: string[] = [];
  subscriptions: Subscription[] = [];
  exhchangeRateHistory: ExchangeRateHistory;
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.subscriptions.push(this.store.select(Selectors.getCurrencyList).subscribe(
      (currencyList: string[]) => {
        this.currencyList = currencyList
      }
    ));

    this.subscriptions.push(
      combineLatest(
        this.store.select(Selectors.getSelectedCurrency),
        this.store.select(Selectors.getBaseCurrency),
        this.store.select(Selectors.getLatestRatesDate))
        .subscribe(([selectedCurrency, baseCurrency, latestDate]) => {
          this.selectedCurrency = selectedCurrency;
          if(selectedCurrency && baseCurrency && latestDate){
            this.store.dispatch(CurrencyActions.loadCurrencyHistory({
              currency: selectedCurrency,
              startDate: new Date(new Date().setDate(latestDate.getDate() - 30)),
              endDate: latestDate,
              baseCurrency: baseCurrency
            }))
          }
        }));

    this.subscriptions.push(this.store.select(Selectors.getSelectedCurrencyHistory).subscribe(
      (exhchangeRateHistory: ExchangeRateHistory) => {
        this.exhchangeRateHistory = exhchangeRateHistory;
      }
    ));


  }

  selectedCurrencyChanged(event: string) {
    this.store.dispatch(CurrencyActions.updateSelectedCurrency({ currencyCode: event }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
