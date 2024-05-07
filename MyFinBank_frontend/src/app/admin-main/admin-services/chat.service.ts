import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:8000'; // API base URL

  constructor(private http: HttpClient, private userService: UserService) { }

  // GET request to fetch all chats
  getAllChats(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/chats`, { headers });
  }

  // PUT request to update a chat by ID
  updateChat(chatId: string, updatedData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/chats/${chatId}`, updatedData, { headers });
  }

  // Utility function to get headers with token
  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'authorization': `Bearer ${token}`
    });
  }
}
