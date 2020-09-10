import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-trend-indicator',
  templateUrl: './trend-indicator.component.html',
  styleUrls: ['./trend-indicator.component.scss']
})
export class TrendIndicatorComponent implements OnInit {

  @Input() currentRate: number;
  @Input() previousRate: number;
  trend: string = 'equal';
  private readonly effectiveZero: number = 0.0000000001;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.previousRate === 0){
      this.trend = 'loading';
      return;
    }
    let diff = this.currentRate - this.previousRate;

    if(Math.abs(diff) <= this.effectiveZero){
      this.trend = 'flat';
    }
    else if(diff > this.effectiveZero){
      this.trend = 'increase';
    }
    else{
      this.trend = 'decrease';
    }
  }
  
}
