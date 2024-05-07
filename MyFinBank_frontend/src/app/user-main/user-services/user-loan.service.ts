import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoanService {
  private baseUrl = 'http://localhost:8000'; // API base URL

  constructor(private http: HttpClient, private userService: UserService) { }

  // POST request to create a loan
  createLoan(loanData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/loans`, loanData, { headers });
  }

  // GET request to fetch loans by user ID
  getLoansByUserId(userId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/user/loans/${userId}`, { headers });
  }

  getAccountsByUserId(userId: string): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/accounts/${userId}`, { headers });
  }

   // PUT request to update a loan by ID
   updateLoan(id: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/loans/${id}`, updatedData, { headers: this.getHeaders() });
  }
  deleteLoan(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/loans/${id}`, { headers: this.getHeaders() });
  }

  // Utility function to get headers with token
  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'authorization': `Bearer ${token}`
    });
  }
}
