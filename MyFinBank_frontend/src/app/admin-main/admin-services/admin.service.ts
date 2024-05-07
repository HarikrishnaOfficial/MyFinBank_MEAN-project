import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8000'; //API base URL

  constructor(private http: HttpClient, private userService: UserService) { }

  // GET request to fetch customers
  getCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/customers`, { headers: this.getHeaders() });
  }

  // PUT request to edit a customer by ID
  editCustomerById(id: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/editCustomer/${id}`, updatedData, { headers: this.getHeaders() });
  }

  // Utility function to get headers with token
  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    console.log(token)
    return new HttpHeaders({
      'authorization': `Bearer ${token}`
    });
  }
}
