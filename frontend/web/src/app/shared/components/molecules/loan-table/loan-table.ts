import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
  loanDate: Date
  paymentDate: Date
  value: number
  userName: string
  currency: string
}

@Component({
  standalone: true,
  selector: 'ga-loan-table',
  imports: [CommonModule, TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './loan-table.html',
  styleUrl: './loan-table.scss',
})
export class LoanTableComponent implements OnInit {
  public formatDate = Formatter.formatDate
  public formatCurrency = Formatter.formatCurrency
  public loans!: ILoanTableRow[]

  ngOnInit(): void {
    this.loans = [
      {
        id: "1",
        loanDate: new Date('2024-01-15'),
        paymentDate: new Date('2024-07-15'),
        value: 2500.75,
        userName: 'Felipe Maciel',
        currency: 'BRL',
      },
      {
        id: "2",
        loanDate: new Date('2024-03-10'),
        paymentDate: new Date('2024-09-10'),
        value: 4800.0,
        userName: 'Ana Souza',
        currency: 'USD',
      },
      {
        id: "3",
        loanDate: new Date('2023-12-05'),
        paymentDate: new Date('2024-06-05'),
        value: 1500.5,
        userName: 'Carlos Lima',
        currency: 'EUR',
      },
      {
        id: "4",
        loanDate: new Date('2024-02-20'),
        paymentDate: new Date('2024-08-20'),
        value: 3200.9,
        userName: 'Julia Pereira',
        currency: 'BRL',
      },
      {
        id: "5",
        loanDate: new Date('2024-05-01'),
        paymentDate: new Date('2024-11-01'),
        value: 7200.0,
        userName: 'Marcos Silva',
        currency: 'USD',
      },
      {
        id: "6",
        loanDate: new Date('2024-04-25'),
        paymentDate: new Date('2024-10-25'),
        value: 980.35,
        userName: 'Beatriz Santos',
        currency: 'EUR',
      },
      {
        id: "7",
        loanDate: new Date('2024-06-18'),
        paymentDate: new Date('2024-12-18'),
        value: 2300.0,
        userName: 'Rafael Costa',
        currency: 'BRL',
      },
      {
        id: "8",
        loanDate: new Date('2024-07-05'),
        paymentDate: new Date('2025-01-05'),
        value: 5400.2,
        userName: 'Lucas Oliveira',
        currency: 'USD',
      },
      {
        id: "9",
        loanDate: new Date('2024-08-12'),
        paymentDate: new Date('2025-02-12'),
        value: 1900.0,
        userName: 'Fernanda Rocha',
        currency: 'BRL',
      },
      {
        id: "10",
        loanDate: new Date('2024-09-01'),
        paymentDate: new Date('2025-03-01'),
        value: 3600.45,
        userName: 'Tiago Almeida"',
        currency: 'EUR',
      },
      {
        id: "11",
        loanDate: new Date('2024-02-11'),
        paymentDate: new Date('2024-08-11'),
        value: 4200.99,
        userName: 'Gabriela Lima',
        currency: 'USD',
      },
      {
        id: "12",
        loanDate: new Date('2024-03-03'),
        paymentDate: new Date('2024-09-03'),
        value: 2750.0,
        userName: 'Pedro Martins',
        currency: 'BRL',
      },
      {
        id: "13",
        loanDate: new Date('2024-05-30'),
        paymentDate: new Date('2024-11-30'),
        value: 6800.0,
        userName: 'Larissa Carvalho',
        currency: 'USD',
      },
      {
        id: "14",
        loanDate: new Date('2024-01-22'),
        paymentDate: new Date('2024-07-22'),
        value: 1350.6,
        userName: 'Ricardo Pereira',
        currency: 'EUR',
      },
      {
        id: "15",
        loanDate: new Date('2024-06-10'),
        paymentDate: new Date('2024-12-10'),
        value: 2450.75,
        userName: 'Amanda Ribeiro',
        currency: 'BRL',
      },
      {
        id: "16",
        loanDate: new Date('2024-07-21'),
        paymentDate: new Date('2025-01-21'),
        value: 5050.9,
        userName: 'Gustavo Fernandes',
        currency: 'USD',
      },
      {
        id: "17",
        loanDate: new Date('2024-08-30'),
        paymentDate: new Date('2025-02-28'),
        value: 3100.0,
        userName: 'Patrícia Gomes',
        currency: 'BRL',
      },
      {
        id: "18",
        loanDate: new Date('2024-09-15'),
        paymentDate: new Date('2025-03-15'),
        value: 8900.25,
        userName: 'Diego Barbosa',
        currency: 'EUR',
      },
      {
        id: "19",
        loanDate: new Date('2024-10-01'),
        paymentDate: new Date('2025-04-01'),
        value: 1750.4,
        userName: 'Camila Ferreira',
        currency: 'USD',
      },
      {
        id: "20",
        loanDate: new Date('2024-11-10'),
        paymentDate: new Date('2025-05-10'),
        value: 4500.0,
        userName: 'Eduardo Ramos',
        currency: 'BRL',
      },
    ]
  }

}
