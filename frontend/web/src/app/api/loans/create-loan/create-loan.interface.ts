export interface ICreateLoanRequest {
    userId: string
    loanValue: number
    loanDurationInMonths: number
    coinCode: string
    loanRate: number
}