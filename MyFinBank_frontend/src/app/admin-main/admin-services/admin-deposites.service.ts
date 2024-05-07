import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDepositService {

  private baseUrl = 'http://localhost:8000'; // Base URL for the API

  constructor(private http: HttpClient, private userService: UserService) { }

  // Fixed Deposit methods

  createFixedDeposit(fixedDepositData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/fixedDeposits`, fixedDepositData, { headers });
  }

  getAllFixedDeposits(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/fixedDeposits`, { headers });
  }

  getFixedDepositById(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/fixedDeposits/${id}`, { headers });
  }

  updateFixedDeposit(id: string, updatedData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.baseUrl}/fixedDeposits/${id}`, updatedData, { headers });
  }

  deleteFixedDeposit(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.baseUrl}/fixedDeposits/${id}`, { headers });
  }

  // Recurring Deposit methods

  createRecurringDeposit(recurringDepositData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/recurringDeposits`, recurringDepositData, { headers });
  }

  getAllRecurringDeposits(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/recurringDeposits`, { headers });
  }

  getRecurringDepositById(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/recurringDeposits/${id}`, { headers });
  }

  updateRecurringDeposit(id: string, updatedData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.baseUrl}/recurringDeposits/${id}`, updatedData, { headers });
  }

  deleteRecurringDeposit(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.baseUrl}/recurringDeposits/${id}`, { headers });
  }

  // Utility method to get headers with token

  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'authorization': `Bearer ${token}`
    });
  }
}
