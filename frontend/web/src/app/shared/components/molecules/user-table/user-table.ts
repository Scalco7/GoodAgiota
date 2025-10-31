import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';

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
  imports: [TableModule, CommonModule, AvatarModule, TagModule],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
})
export class UserTableComponent {
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
}
