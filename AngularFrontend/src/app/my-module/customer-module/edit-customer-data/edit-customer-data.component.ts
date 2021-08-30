import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from '../customer-service.service';

@Component({
  selector: 'app-edit-customer-data',
  templateUrl: './edit-customer-data.component.html',
  styleUrls: ['./edit-customer-data.component.css']
})
export class EditCustomerDataComponent implements OnInit {

  id:any;
  signupform!: FormGroup;
  myData:any;
  constructor(private customerService: CustomerServiceService, private router: Router,private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {


 this.id=this._Activatedroute.snapshot.paramMap.get("id");
 console.log(this.id);

  this.customerService.getCustomerById(this.id).subscribe((res:any) => {
    
  this.myData = res;
    this.signupform=new FormGroup(
      {
        // 'cid':new FormControl(this.myData['cid']),
        'cname':new FormControl(this.myData['cname'],[Validators.required]),
        'website':new FormControl(this.myData['website'],[Validators.required]),
        'caddress':new FormControl(this.myData['caddress'],[Validators.required])
      }
    );
  });
}

  onSubmit(value:any){

    this.customerService.updateCustomer(value,this.id).subscribe((res:any)=>{
      alert("Customer updated successfully !!");
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
