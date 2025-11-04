import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Formatter } from '../../../helpers/formatter';
import { Button } from 'primeng/button';

export interface ILoanTableRow {
  id: string
  loanDate: Date
  paymentDate: Date
  value: number
  userName: string
  currency: string
}

@Component({
  standalone: true,
  selector: 'ga-loan-table',
  imports: [CommonModule, TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, FormsModule, ReactiveFormsModule, Button],
  templateUrl: './loan-table.html',
  styleUrl: './loan-table.scss',
})
export class LoanTableComponent {
  public formatDate = Formatter.formatDate
  public formatCurrency = Formatter.formatCurrency

  @Input() loans: ILoanTableRow[] = []

  public showLoanData(loan: ILoanTableRow){
    
  }
}
