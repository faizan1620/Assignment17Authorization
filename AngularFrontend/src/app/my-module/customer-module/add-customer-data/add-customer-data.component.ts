import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerServiceService } from '../customer-service.service';

@Component({
  selector: 'app-add-customer-data',
  templateUrl: './add-customer-data.component.html',
  styleUrls: ['./add-customer-data.component.css']
})
export class AddCustomerDataComponent implements OnInit {

  signupform!: FormGroup;
  constructor(private customerService: CustomerServiceService, private router: Router) { }

  ngOnInit(): void {
    this.signupform=new FormGroup(
      {
        'cid':new FormControl(null),
        'cname':new FormControl(null,[Validators.required]),
        'website':new FormControl(null,[Validators.required]),
        'caddress':new FormControl(null,[Validators.required]),
      }
    );
  }

  onSubmit(value:any){

    this.customerService.addCustomer(value).subscribe((res:any)=>{
      alert("Data added successfully !!");
      this.router.navigate(['/customer-data']);
     },
     (err:any)=>{
       alert("Something went wrong. This data can't be added !!");
     });

  }

  reset(){
    this.ngOnInit();
  }

  cancel(){
    this.router.navigate(['/customer-data']);
  }

}
