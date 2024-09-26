import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getAllBook(page: number, limit: number = 10): Observable<any> {
    const apiUrl = `https://openlibrary.org/search.json?q=the+lord+of+the+rings&page=${page}&limit=${limit}`;
    return this.http.get<any[]>(apiUrl);
  }
}
