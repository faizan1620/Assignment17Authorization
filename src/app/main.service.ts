import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})


export class MainService {
  private baseurl: string ='http://localhost:3000';
  
 

  constructor(private _httpClient: HttpClient) { }

  
  

   updateUser(user:any,id:any):Observable<any> {
   
     return this._httpClient.patch(`${this.baseurl}`+`/users/${id}`,user,{responseType:'text'});

   }

   addUser(user:any):Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json'});
   
    return this._httpClient.post(`${this.baseurl}`+`/users`,user,{'headers':headers});
  

  }

   getUser():Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json'
  });
    
     return this._httpClient.get(`${this.baseurl}`+'/users',{'headers':headers
   });
     
   }
  




   getUserById(id:any):Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json'});
    
     return this._httpClient.get(`${this.baseurl}`+`/users/${id}`,{'headers':headers});
     
   }

   deleteUser(id:any):Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json'});
     
     return this._httpClient.delete(`${this.baseurl}`+`/users/${id}`,{responseType:'text'});
   }

 

}
