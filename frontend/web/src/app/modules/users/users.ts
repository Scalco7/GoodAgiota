import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UserTableComponent } from "../../shared/components/molecules/user-table/user-table";
import { Button } from "primeng/button";
import { MessageService } from 'primeng/api';
import { RequestsHandlerService } from '../../shared/handlers/request/request-handler.service';
import { ListUsersRequest } from '../../api/users/list-users/list-users.request';
import { IUserResponse } from '../../api/users/list-users/list-users.interface';
import { UserModalComponent } from "../../shared/components/molecules/user-modal/user-modal";

@Component({
  standalone: true,
  selector: 'ga-users',
  imports: [UserTableComponent, Button, UserModalComponent],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersPage implements OnInit {
  private messageService = inject(MessageService);
  private requestsService = inject(RequestsHandlerService);

  public users: IUserResponse[] = []
  public showUserModal: boolean = false;

  ngOnInit(): void {
      this.fetchUsers()
  }

  private fetchUsers() {
    this.requestsService.handle(new ListUsersRequest()).subscribe({
      next: (result) => {
        this.users = result.resultData;
      },
      error: (error) => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: error.title, detail: error.message, life: 3000 });
      },
    });
  }

  public handleCreateNewUser() {
    this.showUserModal = true;
  }
}
