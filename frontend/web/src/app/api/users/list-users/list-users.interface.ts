export enum EUserStatus {
  NO_DEBT = "NO_DEBT",
  PAYING = "PAYING",
  OWING = "OWING"
}

export interface IUserResponse {
    id: string
    name: string
    phone: string
    status: EUserStatus
}