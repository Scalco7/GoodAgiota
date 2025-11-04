import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { ILoanTableRow, LoanTableComponent } from "../../shared/components/molecules/loan-table/loan-table";
import { ConfirmationService, MessageService } from 'primeng/api';
import { IUserResponse } from '../../api/users/list-users/list-users.interface';
import { ListUsersRequest } from '../../api/users/list-users/list-users.request';
import { RequestsHandlerService } from '../../shared/handlers/request/request-handler.service';
import { ILoanResponse } from '../../api/loans/list-loans/list-loans.interface';
import { ListLoansRequest } from '../../api/loans/list-loans/list-loans.request';
import { LoanModalComponent } from "../../shared/components/molecules/loan-modal/loan-modal";
import { ListCoinsRequest } from '../../api/currency/list-coins/list-coins.request';
import { ICoin } from '../../api/currency/list-coins/list-coins.interface';
import { ICreateLoanRequest } from '../../api/loans/create-loan/create-loan.interface';
import { CreateLoanRequest } from '../../api/loans/create-loan/create-loan.request';
import { Formatter } from '../../shared/helpers/formatter';
import { differenceInMonths } from 'date-fns';
import { PayLoanRequest } from '../../api/loans/pay-loan/pay-loan.request';

@Component({
  standalone: true,
  selector: 'ga-loans',
  imports: [ButtonModule, LoanTableComponent, LoanModalComponent],
  templateUrl: './loans.html',
  styleUrl: './loans.scss',
})
export class LoansPage implements OnInit {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private requestsService = inject(RequestsHandlerService);

  @ViewChild(LoanModalComponent) loanModal!: LoanModalComponent;

  public loans: ILoanResponse[] = []
  public users: IUserResponse[] = []
  public coins: ICoin[] = [
    {
      simbolo: "BRL",
      nomeFormatado: "Real Brasileiro"
    }
  ]

  ngOnInit(): void {
    this.fetchLoans()
    this.fetchUsers()
    this.fetchCoins()
  }

  private createLoan(loan: ICreateLoanRequest) {
    this.requestsService.handle(new CreateLoanRequest(loan)).subscribe({
      next: (result) => {
        this.messageService.add({
          severity: 'success',
          summary: "Empréstimo cadastrado",
          detail: `Empréstimo de ${Formatter.formatCurrency(loan.loanValue, loan.coinCode)} cadastrado com sucesso.`,
          life: 3000
        });
        this.fetchLoans();
        this.loanModal.close();
      },
      error: (error) => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: error.title, detail: error.message, life: 3000 });
      },
    });
  }

  private payLoan(loanId: string) {
    this.requestsService.handle(new PayLoanRequest(loanId)).subscribe({
      next: (result) => {
        const oldLoan = this.loans.find(l => l.id === loanId)
        oldLoan!.paid = true

        this.messageService.add({
          severity: 'success',
          summary: "Empréstimo pago",
          detail: `Empréstimo do(a) ${oldLoan!.user.name} pago com sucesso.`,
          life: 3000
        });
      },
      error: (error) => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: error.title, detail: error.message, life: 3000 });
      },
    });
  }

  private fetchLoans() {
    this.requestsService.handle(new ListLoansRequest()).subscribe({
      next: (result) => {
        this.loans = result.resultData;
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

  private fetchCoins() {
    this.requestsService.handleExternal(new ListCoinsRequest()).subscribe({
      next: (result) => {
        this.coins.push(...result.value);
      },
      error: (error) => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: "Erro ao buscar moedas", detail: error.message, life: 3000 });
      },
    });
  }

  private confirmPaymentDialog(loan: ILoanTableRow) {
    this.confirmationService.confirm({
      message: `Você confirma que o(a) ${loan.userName} pagou o empréstimo de ${Formatter.formatCurrency(loan.toPayValue, loan.currency)}?`,
      header: 'Confirmar Pagamento',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirmar',
      },
      accept: () => {
        this.payLoan(loan.id)
      },
      reject: () => { },
    });
  }

  public getLoansDataForTable(): ILoanTableRow[] {
    return this.loans.map(loan => {
      return {
        id: loan.id,
        userName: loan.user.name,
        loanDate: loan.loanDate,
        loanDurationInMonths: differenceInMonths(loan.dueDate, loan.loanDate),
        loanValue: loan.loanValue,
        toPayValue: loan.finalLoanAmount,
        paid: loan.paid,
        currency: loan.coinCode,
        loanRate: loan.loanRate
      }
    })
  }

  public openLoanModalCreate() {
    this.loanModal.open();
  }

  public handleOnCreateLoan(loan: ICreateLoanRequest) {
    this.createLoan(loan);
  }

  public handleOnPayLoan(loan: ILoanTableRow) {
    this.confirmPaymentDialog(loan);
  }
}
