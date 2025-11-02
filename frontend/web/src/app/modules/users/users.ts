import { Component } from '@angular/core';
import { UserTableComponent } from "../../shared/components/molecules/user-table/user-table";
import { Button } from "primeng/button";

@Component({
  standalone: true,
  selector: 'ga-users',
  imports: [UserTableComponent, Button],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersPage {
}
