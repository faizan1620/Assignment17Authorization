import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.css']
})
export class CustomerDataComponent implements OnInit {
  myData: any =[];
  constructor(private customerService: CustomerServiceService) { }

  ngOnInit(): void {
    this.customerService.getCustomer().subscribe((res:any) => {
    
      this.myData = res;
      
    });
  }

  deleteData(id:any){
    this.customerService.deleteCustomer(id).subscribe((res:any) => {
      alert(`Data with id: ${id} successfully deleted`);
    this.ngOnInit();


    },(err)=>{
      alert("This customer is associated with some user(s), Cannot be deleted directly !!")
    });
    
  }

}
