import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private http: HttpClient) {}
  postAbout(data: any) {
    return this.http.post<any>('http://localhost:3000/about/', data);
  }
  getAbout() {
    return this.http.get<any>('http://localhost:3000/about');
  }
  putAbout(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/about/${id}`, data);
  }
  deleteAbout(id: number) {
    return this.http.delete<any>(`http://localhost:3000/about/${id}`);
  }
}
