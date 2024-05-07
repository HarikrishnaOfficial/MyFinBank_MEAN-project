import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private baseUrl = 'http://localhost:8000'; // API base URL

  constructor(private http: HttpClient, private userService: UserService) { }

  // GET request to fetch user accounts by user ID
  getUserAccounts(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/accounts/${userId}`, { headers: this.getHeaders() });
  }

  // POST request to create a new user account
  createUserAccount(accountData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/accounts`, accountData, { headers: this.getHeaders() });
  }

  // PUT request to update a user account by ID
  updateUserAccount(accountId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/accounts/${accountId}`, updatedData, { headers: this.getHeaders() });
  }

  // DELETE request to delete a user account by ID
  deleteUserAccount(accountId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/accounts/${accountId}`, { headers: this.getHeaders() });
  }

  // GET request to fetch an account by its ID
  getAccountById(accountId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/accounts/account/${accountId}`, { headers: this.getHeaders() });
  }

  // Utility function to get headers with token
  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
