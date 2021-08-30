import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerDataComponent } from './edit-customer-data.component';

describe('EditCustomerDataComponent', () => {
  let component: EditCustomerDataComponent;
  let fixture: ComponentFixture<EditCustomerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCustomerDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
