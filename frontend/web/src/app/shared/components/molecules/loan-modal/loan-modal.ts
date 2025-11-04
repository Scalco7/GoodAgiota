import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';
import { getFormErrorMessage } from '../../../helpers/get-form-error-message';
import { SelectModule } from 'primeng/select';
import { IUserResponse } from '../../../../api/users/list-users/list-users.interface';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ICoin } from '../../../../api/currency/list-coins/list-coins.interface';
import { ICreateLoanRequest } from '../../../../api/loans/create-loan/create-loan.interface';

export interface LoanData {
  user: string
  loanValue: number
  dueDate: Date
  coinCode: string
  currencyConversionRate: number
  loanRate: number
}

@Component({
  standalone: true,
  selector: 'ga-loan-modal',
  imports: [Dialog, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule, InputMaskModule, SelectModule, InputGroupModule, InputGroupAddonModule, InputNumberModule],
  templateUrl: './loan-modal.html',
  styleUrl: './loan-modal.scss',
})
export class LoanModalComponent {
  public messageService = inject(MessageService);

  @Input() users: IUserResponse[] = []
  @Input() coins: ICoin[] = []

  @Output() createLoan: EventEmitter<ICreateLoanRequest> = new EventEmitter<ICreateLoanRequest>();

  public isLoading: boolean = false;
  public _isVisible: boolean = false;

  public loanForm = new FormGroup({
    selectedUser: new FormControl('', Validators.required),
    coinCode: new FormControl(this.coins[0], Validators.required),
    loanValue: new FormControl('', [Validators.required, Validators.min(1000)]),
    loanRate: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    loanDuration: new FormControl('', [Validators.required, Validators.min(1), Validators.max(240)]),
  });

  private resetForm() {
    this.loanForm.reset();
    this.isLoading = false;
  }

  private validateForm(): void {
    Object.values(this.loanForm.controls).forEach((control) => {
      control.markAsDirty();
      control.updateValueAndValidity();

      if (control.invalid) {
        const errorMessage = getFormErrorMessage(control);
        if (errorMessage) {
          this.showFormError(errorMessage);
        }
      }
    });
  }

  private showFormError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Erro de preenchimento', detail: message, life: 3000 })
  }

  public open() {
    this.resetForm();
    this._isVisible = true;
  }

  public close() {
    this._isVisible = false;
  }

  public handleSave() {
    this.isLoading = true;
    this.validateForm();
    if (!this.loanForm.valid) {
      this.isLoading = false;
      return
    }

    const loanData: ICreateLoanRequest = {
      userId: (this.loanForm.value.selectedUser! as any).id,
      loanValue: Number(this.loanForm.value.loanValue!),
      loanDurationInMonths: Number(this.loanForm.value.loanDuration!),
      coinCode: this.loanForm.value.coinCode!.simbolo,
      loanRate: Number(this.loanForm.value.loanRate!),
    }

    this.createLoan.emit(loanData)
  }

  public getActualCurrency(coinCode: ICoin | null): string {
    return coinCode && coinCode.simbolo && coinCode.simbolo.length > 0 ? coinCode.simbolo : 'BRL'
  }

  public handleCancel() {
    this._isVisible = false
  }
}
