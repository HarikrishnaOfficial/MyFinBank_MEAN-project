import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string | null = null;
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Store token in memory
  storeToken(token: string|null): void {
    this.token = token;
  }

  // Get token from memory
  getToken(): string | null {
    return this.token;
  }
  // cleare Token from memory
  cleareToken(){
    this.token = null;
  }
  
  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.token;
  }

}
