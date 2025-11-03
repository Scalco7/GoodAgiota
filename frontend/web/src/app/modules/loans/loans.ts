import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { ILoanTableRow, LoanTableComponent } from "../../shared/components/molecules/loan-table/loan-table";
import { MessageService } from 'primeng/api';
import { IUserResponse } from '../../api/users/list-users/list-users.interface';
import { ListUsersRequest } from '../../api/users/list-users/list-users.request';
import { RequestsHandlerService } from '../../shared/handlers/request/request-handler.service';
import { ILoanResponse } from '../../api/loans/list-loans/list-loans.interface';
import { ListLoansRequest } from '../../api/loans/list-loans/list-loans.request';

@Component({
  standalone: true,
  selector: 'ga-loans',
  imports: [ButtonModule, LoanTableComponent],
  templateUrl: './loans.html',
  styleUrl: './loans.scss',
})
export class LoansPage implements OnInit {
  private messageService = inject(MessageService);
  private requestsService = inject(RequestsHandlerService);

  public loans: ILoanResponse[] = []

  ngOnInit(): void {
    this.fetchLoans()
  }

  private fetchLoans() {
    this.requestsService.handle(new ListLoansRequest()).subscribe({
      next: (result) => {
        this.loans = result.resultData;
        console.log(this.loans)
      },
      error: (error) => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: error.title, detail: error.message, life: 3000 });
      },
    });
  }

  public getLoansDataForTable(): ILoanTableRow[] {
    return this.loans.map(loan => {
      return {
        id: loan.id,
        loanDate: loan.loanDate,
        paymentDate: loan.dueDate,
        value: loan.loanValue,
        userName: loan.user.name,
        currency: loan.coinCode
      }
    })
  }
}
