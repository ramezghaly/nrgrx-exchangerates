import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss']
})
export class CurrencySelectorComponent implements OnInit {

  constructor() { }

  @Input() label: string;
  @Input() selectedCurrency: string;
  @Input() currencyList: string[] = [];
  @Input() currencyToDisable: string = null;
  @Output() selectedCurrencyChange = new EventEmitter<string>();

  ngOnInit(): void {
  }

  selectedCurrencyChanged(event: MatSelectChange){
    this.selectedCurrencyChange.emit(event.value);
  }
}
