import { Component } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { LoanTableComponent } from "../../shared/components/molecules/loan-table/loan-table";

@Component({
  standalone: true,
  selector: 'ga-loans',
  imports: [ButtonModule, LoanTableComponent],
  templateUrl: './loans.html',
  styleUrl: './loans.scss',
})
export class LoansPage {

}
