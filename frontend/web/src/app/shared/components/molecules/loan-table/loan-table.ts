import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Formatter } from '../../../helpers/formatter';

export interface ILoanTableRow {
  id: string
  userName: string
  loanDate: Date
  loanDurationInMonths: number
  loanValue: number
  toPayValue: number
  paid: boolean
  currency: string
  loanRate: number
}

@Component({
  standalone: true,
  selector: 'ga-loan-table',
  imports: [CommonModule, TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './loan-table.html',
  styleUrl: './loan-table.scss',
})
export class LoanTableComponent {
  public formatDate = Formatter.formatDate
  public formatCurrency = Formatter.formatCurrency
  public formatPercentage = Formatter.formatPercentage

  @Input() loans: ILoanTableRow[] = []

  @Output() payLoan: EventEmitter<ILoanTableRow> = new EventEmitter<ILoanTableRow>();

  public handleOnPayLoan(loan: ILoanTableRow) {
    this.payLoan.emit(loan);
  }
}
