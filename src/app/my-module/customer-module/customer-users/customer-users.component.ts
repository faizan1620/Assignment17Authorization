import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from '../customer-service.service';

@Component({
  selector: 'app-customer-users',
  templateUrl: './customer-users.component.html',
  styleUrls: ['./customer-users.component.css']
})
export class CustomerUsersComponent implements OnInit {

  id:any;
  myData:any;
  constructor(private router: Router,private activatedRoute: ActivatedRoute, private customerService:CustomerServiceService) { }

  ngOnInit(): void {

    this.id=this.activatedRoute.snapshot.paramMap.get("id");
   
    this.customerService.getCustomerUser(this.id).subscribe((res:any) => {
    
      this.myData = res;
      console.log(res);
    });
  }

  addData(){
    this.router.navigate([`/add-customer-user/${this.id}`]);
  }

  deleteData(id:any){
    this.customerService.deleteUser(id).subscribe((res:any) => {
      
    });
    alert(`Data with id: ${id} successfully deleted`);
      this.ngOnInit();
   

  }
  

}
