import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {

  constructor(private http: HttpClient) { }

  postDestinations(data: any) {
    return this.http.post<any>('http://localhost:3000/destinations/', data);
  }
  getDestinations() {
    return this.http.get<any>('http://localhost:3000/destinations');
  }
  putDestinations(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/destinations/${id}`, data);
  }
  deleteDestinations(id: number) {
    return this.http.delete<any>(`http://localhost:3000/destinations/${id}`);
  }
  
}
