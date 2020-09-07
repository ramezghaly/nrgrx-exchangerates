import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [];

@NgModule({
  declarations: [LayoutComponent, HomeComponent, NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CoreModule { }
