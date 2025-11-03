import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Formatter } from '../../../helpers/formatter';
import { EUserStatus, IUserResponse } from '../../../../api/users/list-users/list-users.interface';
import { Button } from "primeng/button";

@Component({
  standalone: true,
  selector: 'ga-user-table',
  imports: [CommonModule, TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, FormsModule, ReactiveFormsModule, Button],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
})
export class UserTableComponent {
  public formatPhone = Formatter.formatPhone

  @Input() users: IUserResponse[] = []
  @Output() editUser: EventEmitter<IUserResponse> = new EventEmitter<IUserResponse>()
  @Output() deleteUser: EventEmitter<IUserResponse> = new EventEmitter<IUserResponse>()

  statusSelectValue = null

  public statuses = [
    { label: 'Sem Débito', value: EUserStatus.NO_DEBT },
    { label: 'Pagando', value: EUserStatus.PAYING },
    { label: 'Devendo', value: EUserStatus.OWING }
  ]

  public getTagSeverity(status: EUserStatus) {
    switch (status) {
      case EUserStatus.NO_DEBT:
        return 'success'
      case EUserStatus.OWING:
        return 'danger'
      case EUserStatus.PAYING:
        return 'warn'
    }
  }

  public handleEditUser(user: IUserResponse){
    this.editUser.emit(user)
  }

  public handleDeleteUser(user: IUserResponse){
    this.deleteUser.emit(user)
  }
}
