import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { AvatarModule } from 'primeng/avatar';

enum EUserStatus {
  NO_DEBT = "Sem Débitos",
  PAYING = "Pagando",
  OWING = "Devendo"
}

export interface IUserTableRow {
  name: string
  phone: string
  status: EUserStatus
}

@Component({
  selector: 'ga-user-table',
  imports: [TableModule, CommonModule, FaIconComponent, AvatarModule],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
})
export class UserTable {
  faUser = faUser

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
