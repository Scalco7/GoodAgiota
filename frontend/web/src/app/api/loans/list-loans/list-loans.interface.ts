export interface ILoanResponse {
  id: string
  finalLoanAmount: number,
  loanValue: number
  loanDate: Date
  dueDate: Date
  paid: boolean
  paidDate: Date | null
  coinCode: string
  currencyConversionRate: number
  loanRate: number
  createdDate: Date
  updatedDate: Date
  user: {
    id: string
    name: string
    phone: string
    createdDate: Date
    updatedDate: Date
  }
}