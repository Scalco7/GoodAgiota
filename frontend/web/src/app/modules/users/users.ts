import { Component } from '@angular/core';
import { UserTableComponent } from "../../shared/components/molecules/user-table/user-table";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'ga-users',
  imports: [UserTableComponent, FontAwesomeModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersPage {
  faUsers = faUsers
}
