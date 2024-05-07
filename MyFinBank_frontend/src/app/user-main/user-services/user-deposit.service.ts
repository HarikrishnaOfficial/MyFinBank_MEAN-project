import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserDepositService {
  private baseUrl = 'http://localhost:8000'; // API base URL

  constructor(private http: HttpClient, private userService: UserService) { }

  getFixedDepositsByAccountId(accountId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/user/fixedDeposits/${accountId}`, { headers });
  }

  getRecurringDepositsByAccountId(accountId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/user/recurringDeposits/${accountId}`, { headers });
  }

  deleteFixedDeposit(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/fixedDeposits/${id}`, { headers });
  }

  updateRecurringDeposit(id: string, updatedData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/recurringDeposits/${id}`, updatedData, { headers });
  }

  deleteRecurringDeposit(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/recurringDeposits/${id}`, { headers });
  }

  // Utility function to get headers with token
  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken(); // Assuming you have a method in UserService to retrieve the token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
