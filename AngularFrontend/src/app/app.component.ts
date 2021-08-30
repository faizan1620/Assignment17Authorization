import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment10angular';
  loggedout: boolean=false;
  token:any

  constructor(private router:Router,public authGuard:AuthGuard){}
  
  ngOnInit() {
    this.token = localStorage.getItem("loggedInUser")
    console.log("token: " + this.token);
    this.router.navigate(['/index']);
   
  }

  logout(){
    //
    localStorage.removeItem('loggedInUser');
    this.authGuard.isLoggedIn=false;
    this.router.navigate(['/index'])
  }
}
