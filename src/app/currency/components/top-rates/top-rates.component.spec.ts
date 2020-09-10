import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatesComponent } from './top-rates.component';

describe('TopRatesComponent', () => {
  let component: TopRatesComponent;
  let fixture: ComponentFixture<TopRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
