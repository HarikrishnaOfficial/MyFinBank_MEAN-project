import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseUrl = 'http://localhost:8000'; // API base URL

  constructor(private http: HttpClient, private userService: UserService) { }

  // Send email when balance is 0 http://localhost:8000/send-email-balance-zero
  sendEmailBalanceZero(): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/send-email-balance-zero`,
      {},
      { headers: this.getHeaders() }
    ).pipe(
      catchError(error => {
        return throwError('Error sending email');
      })
    );
  }

  // Send zero balance emails list to admins
  sendZeroBalanceEmailsToAdmins(): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/send-zero-balance-emails-to-admins`,
      {},
      { headers: this.getHeaders() }
    ).pipe(
      catchError(error => {
        return throwError('Error sending zero balance emails list to admins');
      })
    );
  }

  // Utility function to get headers with token
  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}
