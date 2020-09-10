import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from '../../state/currency.state';
import * as Selectors from '../../state/currency.selectors';
import * as CurrencyActions from '../../state/currency.actions';
import * as AppActions from '../../../core/state/core.actions';
import { ExchangeRates } from '../../models';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {

  baseCurrency: string;
  currencyList: string[] = [];
  subscriptions: Subscription[] = [];

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    
    this.subscriptions.push(this.store.select(Selectors.getError).subscribe(
      (error:string) => {
        this.store.dispatch(AppActions.showError({ error: error }));
      }
    ));
    
    this.subscriptions.push(this.store.select(Selectors.getCurrencyList).subscribe(
      (currencyList: string[]) =>{
        this.currencyList = currencyList
      }
    ));

    this.subscriptions.push(this.store.select(Selectors.getBaseCurrency).subscribe(
      (baseCurrency:string) => {
        this.baseCurrency = baseCurrency;
        this.store.dispatch(CurrencyActions.loadLatestRates({
          baseCurrency: baseCurrency
        }));
      }
    ));

  }

  baseCurrencyChanged(event:string){    
    this.store.dispatch(CurrencyActions.updateBaseCurrency({ currencyCode: event}));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
