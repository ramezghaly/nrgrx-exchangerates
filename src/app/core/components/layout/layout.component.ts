import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, timer } from 'rxjs';
import { CoreState } from '../../state/core.state';
import * as Selectors from '../../state/core.selectors';
import {MatSnackBar} from '@angular/material/snack-bar';
import { showError } from '../../state/core.actions';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  showLoader: boolean = false;
  subscriptions: Subscription[] = [];
  
  constructor(private store: Store<CoreState>,
              private _snackBar: MatSnackBar) { 
                
              }


  ngOnInit(): void {

    this.subscriptions.push(this.store.select(Selectors.getError).subscribe(
      (error:string) => {
        if(error){
          this.openSnackBar(error);
        }
      }
    ));

    this.subscriptions.push(this.store.select(Selectors.getLoader)
    .subscribe(
      (showLoader:boolean) => {
        timer(1000).subscribe(()=>{
          this.showLoader = showLoader;
        });
      }
    ));
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
