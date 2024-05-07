import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserChatService {

  private baseUrl = 'http://localhost:8000'; // API base URL

  constructor(private http: HttpClient, private userService: UserService) { }

  // Helper function to get HTTP headers with token
  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Create a new chat
  createChat(chatData: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/chats`,
      chatData,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(error => {
        return throwError('Error creating chat');
      })
    );
  }

  // Get all chats
  getAllChats(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/chats`,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(error => {
        return throwError('Error getting chats');
      })
    );
  }

  // Get a chat by ID
  getChatById(chatId: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/chats/${chatId}`,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(error => {
        return throwError('Error getting chat by ID');
      })
    );
  }

  // Delete a chat
  deleteChat(chatId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/chats/${chatId}`,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(error => {
        return throwError('Error deleting chat');
      })
    );
  }
  // PUT request to update a chat by ID
  updateChat(chatId: string, updatedData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/chats/${chatId}`, updatedData, { headers });
  }


  // Get a chat by user ID
  getChatByUserId(userId: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/user/chats/${userId}`,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(error => {
        return throwError('Error getting chat by user ID');
      })
    );
  }
}
