import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesListComponent } from './deliveries-list.component';

describe('DeliveriesListComponent', () => {
  let component: DeliveriesListComponent;
  let fixture: ComponentFixture<DeliveriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
