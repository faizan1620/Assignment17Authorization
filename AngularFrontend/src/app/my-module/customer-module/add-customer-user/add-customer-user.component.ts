import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/main.service';


@Component({
  selector: 'app-add-customer-user',
  templateUrl: './add-customer-user.component.html',
  styleUrls: ['./add-customer-user.component.css']
})
export class AddCustomerUserComponent implements OnInit {

  id!:number;
  signupform!: FormGroup;
  constructor(private mainService:MainService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.signupform=new FormGroup(
      {
        'uid':new FormControl(null),
        'FirstName':new FormControl(null,[Validators.required]),
        'MiddleName':new FormControl(null,[Validators.required]),
        'LastName':new FormControl(null,[Validators.required]),
        'Email':new FormControl(null,[Validators.required,Validators.email]),
        'PhoneNumber':new FormControl(null,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        'Address':new FormControl(null,[Validators.required]),
        'customerId':new FormControl(this.id,[Validators.required]),
        'roleId':new FormControl(null,[Validators.required])
      }
    );
  }

  onSubmit(value: any) {
    this.mainService.addUser(value).subscribe((res:any)=>{
      alert("Data added successfully !!");
      this.router.navigate([`/customer-users/${this.id}`]);
     },
     (err:any)=>{
       alert("Something went wrong. This data can't be added !!");
     });
  }

  reset(){
    this.ngOnInit();
  }
  cancel(){
    this.router.navigate([`/customer-users/${this.id}`]);
  }

}
