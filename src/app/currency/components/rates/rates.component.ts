import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from '../../state/currency.state';
import * as Selectors from '../../state/currency.selectors';
import * as CurrencyActions from '../../state/currency.actions';
import { ExchangeRates, ExchangeRate } from '../../models';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['currency', 'rate', 'trend', 'functions'];
  dataSource: MatTableDataSource<ExchangeRate>;

  constructor(private store: Store<State>,
              private router: Router) {
    this.dataSource = new MatTableDataSource<ExchangeRate>([]);
  }

  ngOnInit(): void {
    this.subscriptions.push(this.store.select(Selectors.getLatestRates).subscribe(
      (latestRates: ExchangeRates) => {
        this.dataSource.data = latestRates.rates;
      }
    ));
  }

  navigateToHistory(currencyCode:string){
    this.store.dispatch(CurrencyActions.updateSelectedCurrency({currencyCode: currencyCode}));
    this.router.navigate(['/currency/history']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
