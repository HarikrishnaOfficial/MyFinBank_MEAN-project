import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private baseUrl = 'http://localhost:8000'; // API base URL

  constructor(private http: HttpClient, private userService: UserService) { }

  // GET request to fetch all loans
  getAllLoans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/loans`, { headers: this.getHeaders() });
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
      'Authorization': `Bearer ${token}`
    });
  }
}
