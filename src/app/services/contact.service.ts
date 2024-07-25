import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  postContact(data: any) {
    return this.http.post<any>('http://localhost:3000/contact/', data);
  }
  getContact() {
    return this.http.get<any>('http://localhost:3000/contact');
  }
  putContact(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/contact/${id}`, data);
  }
  deleteContact(id: number) {
    return this.http.delete<any>(`http://localhost:3000/contact/${id}`);
  }
}
