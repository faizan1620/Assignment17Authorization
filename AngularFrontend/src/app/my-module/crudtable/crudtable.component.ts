import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/main.service';


@Component({
  selector: 'app-crudtable',
  templateUrl: './crudtable.component.html',
  styleUrls: ['./crudtable.component.css']
})
export class CrudtableComponent implements OnInit {

  myData=[];

 
  constructor(private mainService:MainService,public router: Router) { }

  ngOnInit(): void {
   this.mainService.getUser().subscribe((res:any) => {
    
       this.myData = res;
       console.log(res);
     });
   
     
  }

  originalOrder(a: KeyValue<String,String>, b: KeyValue<String,String>): number {
    return 0;
  }

  deleteData(id:any){
    
    this.mainService.deleteUser(id).subscribe((res:any) => {
      alert(`Data with id: ${id} successfully deleted`);
    this.ngOnInit();
  },(err)=>{
    alert(err.message);
  });
    

  }

  
}
