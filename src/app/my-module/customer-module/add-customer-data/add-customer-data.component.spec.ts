import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerDataComponent } from './add-customer-data.component';

describe('AddCustomerDataComponent', () => {
  let component: AddCustomerDataComponent;
  let fixture: ComponentFixture<AddCustomerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomerDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
