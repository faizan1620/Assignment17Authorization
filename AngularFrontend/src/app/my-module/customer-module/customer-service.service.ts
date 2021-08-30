import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  getCustomerById(id: any) {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json'});
    
     return this._httpClient.get(`${this.baseurl}`+`/customers/${id}`,{'headers':headers});
  }
  baseurl: any='http://localhost:3000';

  constructor(private _httpClient:HttpClient) { }

  deleteCustomer(id:any):Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json'});
     
     return this._httpClient.delete(`${this.baseurl}`+`/customers/${id}`,{responseType:'text'});
   }

   getCustomer():Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json'
  });
    
     return this._httpClient.get(`${this.baseurl}`+'/customers',{'headers':headers
   });
     
   }

   addCustomer(user:any):Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json'});
   
    return this._httpClient.post(`${this.baseurl}`+`/customers`,user,{'headers':headers});

  }




  updateCustomer(user:any,id:any):Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json'});
   
    return this._httpClient.patch(`${this.baseurl}`+`/customers/${id}`,user,{'headers':headers});

  }

  getCustomerUser(id:any):Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json'
  });
    
     return this._httpClient.get(`${this.baseurl}`+`/customers/${id}/users`,{'headers':headers
   });
     
   }

   deleteUser(id:any):Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json'});
     
     return this._httpClient.delete(`${this.baseurl}`+`/users/${id}`,{responseType:'text'});
   }
}
