import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postProduct(data: any) {
    return this.http.post<any>('http://localhost:3000/products/', data);
  }
  getProduct() {
    return this.http.get<any>('http://localhost:3000/products');
  }
  deleteProduct(id:number) {
    return this.http.delete<any>(`http://localhost:3000/products/${id}`);
  } 
}
