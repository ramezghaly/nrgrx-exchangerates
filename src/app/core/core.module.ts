import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StoreModule } from '@ngrx/store';
import { coreReducer } from './state/core.reducer'
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [LayoutComponent, HomeComponent, NotFoundComponent, LoaderComponent],
  imports: [
    CommonModule,
    RouterModule,    
    SharedModule,
    StoreModule.forFeature('core', coreReducer)    
  ]
})
export class CoreModule { }
