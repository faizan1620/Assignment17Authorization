import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerUserComponent } from './edit-customer-user.component';

describe('EditCustomerUserComponent', () => {
  let component: EditCustomerUserComponent;
  let fixture: ComponentFixture<EditCustomerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCustomerUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
