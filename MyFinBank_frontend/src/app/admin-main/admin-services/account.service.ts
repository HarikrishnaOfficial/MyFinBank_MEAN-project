import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'http://localhost:8000'; // API base URL

  constructor(private http: HttpClient, private userService: UserService) { }

  // Create account request
  createAccount(accountData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/accounts`, accountData, { headers: this.getHeaders() });
  }

  // Get all accounts request
  getAllAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/accounts`, { headers: this.getHeaders() });
  }

  // Update account by ID request
  updateAccount(id: string, newData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/accounts/${id}`, newData, { headers: this.getHeaders() });
  }

  // Delete account by ID request
  deleteAccount(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/accounts/${id}`, { headers: this.getHeaders() });
  }

  // Utility function to get headers with token
  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'authorization': `Bearer ${token}`
    });
  }
}
