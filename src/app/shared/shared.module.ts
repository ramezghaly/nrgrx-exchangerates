import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module'
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ChartsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  exports:[
    AngularMaterialModule,
    ChartsModule,
    FlexLayoutModule,
    HttpClientModule
  ]
})
export class SharedModule { }
