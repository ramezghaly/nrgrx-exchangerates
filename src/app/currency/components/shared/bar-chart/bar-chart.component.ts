import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { DateService } from 'src/app/shared/services/date.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() rates: {date:Date, rate:number}[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];

  public barChartLabels: Label[] = [] ;
  public barChartData: ChartDataSets[] = [{data:[]}];
    
  constructor(private dateService:DateService) { }
  
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateData();
  }

  updateData(){
    console.log(this.rates);
    if(!this.rates){
      this.barChartLabels = [];
      this.barChartData[0].data = [];
      return;
    }

    this.barChartLabels = this.rates.map(r => this.dateService.formatDate(r.date));
    this.barChartData[0].data = this.rates.map(r => r.rate);
  }
}
