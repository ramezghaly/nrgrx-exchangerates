import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module'
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports:[
    AngularMaterialModule,
    ChartsModule
  ]
})
export class SharedModule { }
