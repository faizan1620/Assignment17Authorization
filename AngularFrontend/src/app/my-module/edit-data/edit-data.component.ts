import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {
  signupform!: FormGroup;

 
  id:any;
  private myData:any;


  constructor(private _Activatedroute:ActivatedRoute,private mainService:MainService,private router:Router) { }

   ngOnInit() {
  

 this.id=this._Activatedroute.snapshot.paramMap.get("id");
 console.log(this.id);

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
     
    }
    
    ); 
  });
 }

 

  onSubmit(user:any){
    console.log(user);
  
     this.mainService.updateUser(user,this.id).subscribe((res:any) => {
      alert(`Data with id ${this.id} updated successfully !!`);
      this.router.navigate(['/crudtable']);
     },
     (err:any)=>{
       alert("Something went wrong.Cannot update data !!");
     });
     
         
  }

  cancel(){
    this.router.navigate(['/crudtable']);
  }
  

  reset(){
    this.ngOnInit();
     
  }
}
