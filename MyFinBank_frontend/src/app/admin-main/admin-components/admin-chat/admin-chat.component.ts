import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../admin-services/chat.service';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit {
  chats: any[] = [];
  editedChat: any = {}; // Object to store edited chat details
  isEditFormOpen: boolean = false; // Flag to toggle edit form visibility

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.getChats(); // Initial fetch of chats
  }

  getChats(): void {
    this.chatService.getAllChats()
      .subscribe(chats => {
        this.chats = chats;
        console.log(this.chats)
      });
  }

  openEditForm(chat: any): void {
    // Assign the chat to editedChat for editing
    this.editedChat = { ...chat }; // Create a copy to avoid mutating the original chat
    this.isEditFormOpen = true;
  }

  closeEditForm(): void {
    // Reset editedChat and close the edit form
    this.editedChat = {};
    this.isEditFormOpen = false;
  }

  saveChat(): void {
    // Update the chat using the ChatService
    this.chatService.updateChat(this.editedChat._id, this.editedChat)
      .subscribe(updatedChat => {
        // Update the chat in the chats array
        const index = this.chats.findIndex(chat => chat._id === updatedChat._id);
        if (index !== -1) {
          this.chats[index] = updatedChat;
        }
        // Close the edit form
        this.closeEditForm();
        this.getChats();
      }, error => {
        // Handle error if any
        console.error('Error updating chat:', error);
      });
  }
}
