import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestinationTypeService {

  constructor(private http: HttpClient) { }

  postDestinationType(data: any) {
    return this.http.post<any>('http://localhost:3000/destinationType/', data);
  }
  getDestinationType() {
    return this.http.get<any>('http://localhost:3000/destinationType');
  }
  putDestinationType(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/destinationType/${id}`, data);
  }
  deleteDestinationType(id: number) {
    return this.http.delete<any>(`http://localhost:3000/destinationType/${id}`);
  }


}
