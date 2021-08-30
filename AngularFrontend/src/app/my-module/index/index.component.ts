import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutingModule, AuthGuard } from 'src/app/app-routing.module';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  signinForm: any;
  errMessage:any;
  isError: boolean=false;
  


  constructor(private router: Router,private mainService: MainService,public authGuard:AuthGuard) { }

  ngOnInit(): void {
    this.signinForm=new FormGroup(
      {
        'email':new FormControl(null,[Validators.required,Validators.email]),
        'password':new FormControl(null,[Validators.required])
      });
  }

  login(authUser:any){
    this.mainService.verifyUser(authUser).subscribe((res:any) => {
      this.authGuard.isLoggedIn = true;
      this.isError=false;
      localStorage.setItem('loggedInUser', JSON.stringify(res.token));
      
      this.router.navigate(['/crudtable']);
    }, 
    (err:any)=>{
      this.isError=true;
      this.errMessage="Invalid Credentials! Please try again";
    }
    );
  
  }
  
}
