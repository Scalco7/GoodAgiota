import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UserTableComponent } from "../../shared/components/molecules/user-table/user-table";
import { Button } from "primeng/button";
import { MessageService } from 'primeng/api';
import { RequestsHandlerService } from '../../shared/handlers/request/request-handler.service';
import { ListUsersRequest } from '../../api/users/list-users/list-users.request';
import { IUserResponse } from '../../api/users/list-users/list-users.interface';
import { UserData, UserModalComponent } from "../../shared/components/molecules/user-modal/user-modal";
import { ICreateUserRequest } from '../../api/users/create-user/create-user.interface';
import { CrateUserRequest } from '../../api/users/create-user/create-user.requet';
import { IUpdateUserRequest } from '../../api/users/update-user/update-user.interface';
import { UpdateUserRequest } from '../../api/users/update-user/update-user.requet';

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

  @ViewChild(UserModalComponent) userModal!: UserModalComponent;

  public users: IUserResponse[] = []

  ngOnInit(): void {
    this.fetchUsers()
  }

  private createUser(user: ICreateUserRequest) {
    this.requestsService.handle(new CrateUserRequest(user)).subscribe({
      next: (result) => {
        this.messageService.add({ severity: 'success', summary: "Usuário adicionado", detail: `${user.name} foi adicionado a lista de usuários.`, life: 3000 });
        this.fetchUsers();
        this.userModal.close();
      },
      error: (error) => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: error.title, detail: error.message, life: 3000 });
      },
    });
  }

  private updateUser(user: IUpdateUserRequest, userId: string) {
    this.requestsService.handle(new UpdateUserRequest(userId, user)).subscribe({
      next: (result) => {
        const newName = result.resultData.name
        const newPhone = result.resultData.phone
        const oldUser = this.users.find(u => u.id === userId)
        oldUser!.name = newName
        oldUser!.phone = newPhone

        this.messageService.add({ severity: 'success', summary: "Usuário atualizado", detail: `Os dados de ${newName} foram atualizados.`, life: 3000 });
        this.userModal.close();
      },
      error: (error) => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: error.title, detail: error.message, life: 3000 });
      },
    });
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

  public openUserModalCreate() {
    this.userModal.open();
  }

  public openUserModalEdit(user: IUserResponse) {
    this.userModal.open(user);
  }

  public handleOnCreateUser(user: ICreateUserRequest) {
    this.createUser(user);
  }

  public handleOnEditUser(user: UserData) {
    this.updateUser(user, user.id);
  }
}
