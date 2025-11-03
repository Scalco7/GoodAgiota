import { Component, inject } from '@angular/core';
import { UserTableComponent } from "../../shared/components/molecules/user-table/user-table";
import { Button } from "primeng/button";
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'ga-users',
  imports: [UserTableComponent, Button],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersPage {
  private messageService = inject(MessageService);

  public handleCreateNewUser() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
  }
}
