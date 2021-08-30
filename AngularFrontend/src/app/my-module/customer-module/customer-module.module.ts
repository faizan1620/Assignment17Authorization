import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { EditCustomerDataComponent } from './edit-customer-data/edit-customer-data.component';
import { AddCustomerDataComponent } from './add-customer-data/add-customer-data.component';
import { CustomerUsersComponent } from './customer-users/customer-users.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCustomerUserComponent } from './edit-customer-user/edit-customer-user.component';
import { AddCustomerUserComponent } from './add-customer-user/add-customer-user.component';

const customerModuleRoutes:Routes=[

  { path: 'add-customer-data', component: AddCustomerDataComponent },
  { path: 'edit-customer-data/:id', component: EditCustomerDataComponent },
  {path:'customer-users/:id', component:CustomerUsersComponent},
  {path:'customer-data', component:CustomerDataComponent},
  {path:'edit-customer-user/:id', component:EditCustomerUserComponent},
  {path:'add-customer-user/:id', component:AddCustomerUserComponent}
];

@NgModule({
  declarations: [
    CustomerDataComponent,
    EditCustomerDataComponent,
    AddCustomerDataComponent,
    CustomerUsersComponent,
    EditCustomerUserComponent,
    AddCustomerUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(customerModuleRoutes),
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerModuleModule { }
