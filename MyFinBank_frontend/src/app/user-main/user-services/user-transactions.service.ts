import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserTransactionsService {

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient, private userService: UserService) { }

  // POST request to create a new transaction
  createTransaction(transactionData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/transactions`, transactionData, { headers: this.getHeaders() });
  }

  // GET request to fetch a transaction by its ID
  getTransactionByUserId(user_id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/transactions/${user_id}`, { headers: this.getHeaders() });
  }


  // Utility function to get headers with token
  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
