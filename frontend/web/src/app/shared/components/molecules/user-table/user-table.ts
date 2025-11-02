import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

enum EUserStatus {
  NO_DEBT = "no_debt",
  PAYING = "paying",
  OWING = "owing"
}

export interface IUserTableRow {
  name: string
  phone: string
  status: EUserStatus
}

@Component({
  standalone: true,
  selector: 'ga-user-table',
  imports: [CommonModule, TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
})
export class UserTableComponent {
  statusSelectValue = null

  public users: IUserTableRow[] = [
    {
      name: 'Janderson',
      phone: '44995868988',
      status: EUserStatus.NO_DEBT
    },
    {
      name: 'Jefferson',
      phone: '44995868988',
      status: EUserStatus.OWING
    },
    {
      name: 'Raphael',
      phone: '44995868988',
      status: EUserStatus.PAYING
    },
  ]

  public statuses = [
    { label: 'Sem Débito', value: EUserStatus.NO_DEBT },
    { label: 'Pagando', value: EUserStatus.OWING },
    { label: 'Devendo', value: EUserStatus.PAYING }
  ]

  public getTagSeverity(status: EUserStatus) {
    switch (status) {
      case EUserStatus.NO_DEBT:
        return 'success'
      case EUserStatus.OWING:
        return 'warn'
      case EUserStatus.PAYING:
        return 'danger'
    }
  }
}
