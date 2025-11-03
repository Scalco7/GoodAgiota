import { EErrorCode } from "../../enums/error-code.enum";

export interface IRequestResult<T> {
  resultData: T;
  errorCode?: EErrorCode;
  errorName?: string;
  errorMessage?: string;
  page?: number;
  totalPages?: number;
}
