import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatesComponent } from './components/rates/rates.component';
import { HistoricalDataComponent } from './components/historical-data/historical-data.component';
import { ShellComponent } from './components/shell/shell.component';
import { TopRatesComponent } from './components/top-rates/top-rates.component';

const routes: Routes = [
  {
    path: '', 
    component: ShellComponent,
    children: [
      { path: 'rates', component: RatesComponent, pathMatch: 'full' },
      { path: 'history', component: HistoricalDataComponent, pathMatch: 'full' },
      { path: 'top-rates', component: TopRatesComponent, pathMatch: 'full' },
      { path: '', redirectTo: '/currency/rates', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }
