import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../core/components/layout/layout.component';
import { HomeComponent } from '../core/components/home/home.component';
import { NotFoundComponent } from '../core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, pathMatch: 'full' },      
      {
        path: 'currency',
        loadChildren: () =>
          import('../currency/currency.module').then(m => m.CurrencyModule)
      },
      { path: '', redirectTo: 'currency', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
