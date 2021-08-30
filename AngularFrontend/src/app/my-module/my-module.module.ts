import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudtableComponent } from './crudtable/crudtable.component';
import { AddDataComponent } from './add-data/add-data.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerDataComponent } from './customer-module/customer-data/customer-data.component';
import { CustomerModuleModule } from './customer-module/customer-module.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { AuthGuard } from '../app-routing.module';


const myModuleRoutes:Routes=[

  { path: 'crudtable', component: CrudtableComponent,canActivate:[AuthGuard] },
  { path: 'edit-data/:id', component: EditDataComponent,canActivate:[AuthGuard] },
  {path:'add-data', component:AddDataComponent},
  {path:'customer-data', component:CustomerDataComponent,canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [
    CrudtableComponent,
    AddDataComponent,
    EditDataComponent,
    IndexComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(myModuleRoutes),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerModuleModule
  ],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class MyModuleModule { }
