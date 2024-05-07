import { Component, OnInit } from '@angular/core';
import { UserChatService } from '../../user-services/user-chat.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {
  chats: any[] = [];
  editedChat: any = {};
  isEditFormOpen = false;
  ispostFormOpen = false;
  newMessage: string = '';
  userId: string = '';

  constructor(private userChatService: UserChatService,
              private toast: NgToastService) { }

  ngOnInit(): void {
    this.retrieveUserId();
    this.getChatByUserId();
  }

  retrieveUserId(): void {
    const userDataString = sessionStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.userId = userData.userId;
    } else {
      console.error("User data not found in session storage");
    }
  }

  getChatByUserId(): void {
    if (!this.userId) {
      console.error("User ID is not available");
      return;
    }

    this.userChatService.getChatByUserId(this.userId).subscribe(
      (chats) => {
        this.chats = chats;
      },
      (error) => {
        this.handleError("Error getting chats by user ID", error);
      }
    );
  }

  openEditForm(chat: any): void {
    this.editedChat = { ...chat };
    this.isEditFormOpen = true;
  }

  closeEditForm(): void {
    this.getChatByUserId();
    this.editedChat = {};
    this.isEditFormOpen = false;
  }

  saveChat(): void {
    const { ...updatedData } = this.editedChat;
    this.userChatService.updateChat(this.editedChat._id, updatedData).subscribe(
      () => {
        this.closeEditForm();
        this.getChatByUserId();
        this.toast.success({ detail: "Success", summary: 'Chat updated Successfully', duration: 5000 });
      },
      (error) => {
        this.handleError("Error updating chat", error);
      }
    );
  }

  openpostForm() {
    this.ispostFormOpen = true;
  }

  postQuery(): void {
    if (!this.newMessage) {
      console.error("New message is empty");
      return;
    }

    const chatData = {
      user_id: this.userId,
      message: this.newMessage,
      reply: ''
    };

    this.userChatService.createChat(chatData).subscribe(
      () => {
        this.closepostForm();
        this.getChatByUserId();
        this.toast.success({ detail: "Success", summary: 'Chat posted Successfully', duration: 5000 });
      },
      (error) => {
        this.handleError("Error posting query", error);
      }
    );
  }

  closepostForm() {
    this.ispostFormOpen = false;
  }

  deleteQuery(chatId: string) {
    this.userChatService.deleteChat(chatId).subscribe(
      () => {
        this.toast.info({ detail: "Information", summary: 'Chat deleted Successfully', duration: 5000 });
        this.getChatByUserId();
      },
      (error) => {
        this.handleError("Error deleting chat", error);
      }
    );
  }

  handleError(message: string, error: any): void {
    console.error(message, error);
    this.toast.error({ detail: "Error", summary: 'An error occurred', duration: 5000 });
  }
}
