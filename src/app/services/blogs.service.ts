import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private http: HttpClient) { }
  postBlogs(data: any) {
    return this.http.post<any>('http://localhost:3000/blogs/', data);
  }
  getBlogs() {
    return this.http.get<any>('http://localhost:3000/blogs');
  }
  putBlogs(data: any, id: number) {
    return this.http.put<any>(`http://localhost:3000/blogs/${id}`, data);
  }
  deleteBlogs(id: number) {
    return this.http.delete<any>(`http://localhost:3000/blogs/${id}`);
  }
}
