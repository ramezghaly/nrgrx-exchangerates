import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from '../../state/currency.state';
import * as Selectors from '../../state/currency.selectors';
import * as CurrencyActions from '../../state/currency.actions';
import { ExchangeRates, ExchangeRate, ExchangeRateDiff, TopRatesTypes } from '../../models';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-top-rates',
  templateUrl: './top-rates.component.html',
  styleUrls: ['./top-rates.component.scss']
})
export class TopRatesComponent implements OnInit, OnDestroy {
  topRateType: TopRatesTypes = TopRatesTypes.INCREASE;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['currency', 'difference', 'percentage'];
  dataSource: MatTableDataSource<ExchangeRateDiff>;

  constructor(private store: Store<State>) {
    this.dataSource = new MatTableDataSource<ExchangeRateDiff>([]);
  }

  ngOnInit(): void {

    this.subscriptions.push(this.store.select(Selectors.getTopRatesType).subscribe(
      (topRateType: TopRatesTypes) => {
        this.topRateType = topRateType;
      }
    ));

    this.subscriptions.push(this.store.select(Selectors.getTopFiveRates).subscribe(
      (topFiveRates: ExchangeRateDiff[]) => {

        this.dataSource.data = topFiveRates;
      }
    ));
  }

  differencyTypeChanged(event: MatButtonToggleChange) {
    this.store.dispatch(CurrencyActions.updateTopRateType({ rateType: event.value}));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
