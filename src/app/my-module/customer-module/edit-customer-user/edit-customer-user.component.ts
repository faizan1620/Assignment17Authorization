import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-edit-customer-user',
  templateUrl: './edit-customer-user.component.html',
  styleUrls: ['./edit-customer-user.component.css']
})
export class EditCustomerUserComponent implements OnInit {

  myData:any=[];
  id!:any;
  signupform!: FormGroup;
  constructor(private mainService: MainService, private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {

    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    this.mainService.getUserById(this.id).subscribe((res:any) => {
    this.myData = res;
   
    
      
   this.signupform=new FormGroup(
  {
    'FirstName':new FormControl(this.myData['FirstName'],[Validators.required]),
    'MiddleName':new FormControl(this.myData['MiddleName'],[Validators.required]),
    'LastName':new FormControl(this.myData['LastName'],[Validators.required]),
    'Email':new FormControl(this.myData['Email'],[Validators.required,Validators.email]),
    'PhoneNumber':new FormControl(this.myData['PhoneNumber'],[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    'Address':new FormControl(this.myData['Address'],[Validators.required]),
    'customerId':new FormControl(this.myData['customerId'],[Validators.required]),
    'roleId':new FormControl(this.myData['roleId'],[Validators.required]),
  });

});
    
}

reset() {
this.ngOnInit();
}

cancel(){
  this.router.navigate([`/customer-users/${this.myData['customerId']}`]);
}

onSubmit(value:any) {
  this.mainService.updateUser(value,this.id).subscribe((res:any)=>{
    alert("Customer User updated successfully !!");
    this.router.navigate([`/customer-users/${this.myData['customerId']}`]);
   },
   (err:any)=>{
     alert("Something went wrong. This data can't be updated !!");
   });
}

}
