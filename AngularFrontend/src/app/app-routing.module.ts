import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IndexComponent } from './my-module/index/index.component';

@Injectable()
export class AuthGuard implements CanActivate{

  isLoggedIn:boolean = false;
  constructor(private router:Router){}
  canActivate() {
    if(this.isLoggedIn){
      return true
    }
    else{
      this.router.navigate(['/index'])
    }
    return this.isLoggedIn;
  }

}
//const routes: Routes = [];
const routes:Routes= [
  { path:'index', component: IndexComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

