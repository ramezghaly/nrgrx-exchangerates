import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'
import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencySelectorComponent } from './components/shared/currency-selector/currency-selector.component';
import { TrendIndicatorComponent } from './components/shared/trend-indicator/trend-indicator.component';
import { RatesComponent } from './components/rates/rates.component';
import { HistoricalDataComponent } from './components/historical-data/historical-data.component';
import { StoreModule } from '@ngrx/store';
import { currencyReducer} from './state/currency.reducers';
import { ShellComponent } from './components/shell/shell.component'
import { EffectsModule } from '@ngrx/effects';
import { CurrencyEffects } from './state/currency.effects';
import { BarChartComponent } from './components/shared/bar-chart/bar-chart.component';
import { TopRatesComponent } from './components/top-rates/top-rates.component' ;
@NgModule({
  declarations: [
    CurrencySelectorComponent,
    TrendIndicatorComponent,
    RatesComponent, 
    HistoricalDataComponent, 
    ShellComponent, 
    BarChartComponent, 
    TopRatesComponent
  ],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    SharedModule,
    StoreModule.forFeature('currency', currencyReducer),
    EffectsModule.forFeature([CurrencyEffects])
  ]
})
export class CurrencyModule { }
