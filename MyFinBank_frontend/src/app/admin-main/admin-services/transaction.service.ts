import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = 'http://localhost:8000'; // API base URL

  constructor(private http: HttpClient, private userService: UserService) { }

  // POST request to create a new transaction
  createTransaction(transactionData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/transactions`, transactionData, { headers: this.getHeaders() });
  }

  // GET request to fetch all transactions
  getAllTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/transactions`, { headers: this.getHeaders() });
  }

  // GET request to fetch a transaction by ID
  getTransactionById(transactionId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/transactions/${transactionId}`, { headers: this.getHeaders() });
  }

  // GET request to fetch transactions by user ID
  getTransactionsByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/transactions/${userId}`, { headers: this.getHeaders() });
  }

  // PUT request to update a transaction by ID
  updateTransaction(transactionId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/transactions/${transactionId}`, updatedData, { headers: this.getHeaders() });
  }

  // DELETE request to delete a transaction by ID
  deleteTransaction(transactionId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/transactions/${transactionId}`, { headers: this.getHeaders() });
  }

  // Utility function to get headers with token
  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
