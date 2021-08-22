import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  signupform!: FormGroup;
  constructor(private mainService:MainService,private router:Router) { }

  ngOnInit(): void {
    this.signupform=new FormGroup(
      {
        'uid':new FormControl(null),
        'FirstName':new FormControl(null,[Validators.required]),
        'MiddleName':new FormControl(null,[Validators.required]),
        'LastName':new FormControl(null,[Validators.required]),
        'Email':new FormControl(null,[Validators.required,Validators.email]),
        'PhoneNumber':new FormControl(null,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        'Address':new FormControl(null,[Validators.required]),
        'customerId':new FormControl(null,[Validators.required]),
        'roleId':new FormControl(null,[Validators.required])
      }
    );
  }

  reset(){
    this.ngOnInit();
  }


  cancel(){
    this.router.navigate(['/crudtable']);
  }

  onSubmit(user:any){
    
    
    this.mainService.addUser(user).subscribe((res:any)=>{
     alert("Data added successfully !!");
     this.router.navigate(['/crudtable']);
    },
    (err:any)=>{
      alert("Something went wrong. This data can't be added !!");
    });
  }
}
