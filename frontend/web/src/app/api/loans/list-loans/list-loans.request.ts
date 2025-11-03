import { map, Observable } from "rxjs";
import { RequestsHandlerService } from "../../../shared/handlers/request/request-handler.service";
import { IRequest } from "../../../shared/handlers/request/request.interface";

import { environment } from "../../../../environments/environment";
import { IRequestResult } from "../../../shared/handlers/request/request-result.interface";
import { EErrorCode } from "../../../shared/enums/error-code.enum";
import { ILoanResponse } from "./list-loans.interface";

export class ListLoansRequest implements IRequest<ILoanResponse[]> {
    constructor() { }

    execute(
        requestsHandler: RequestsHandlerService
    ): Observable<IRequestResult<ILoanResponse[]>> {
        const url = `${environment['apiUrl']}/loans`;

        return requestsHandler.http.get<IRequestResult<ILoanResponse[]>>(url).pipe(
            map((result: IRequestResult<ILoanResponse[]>) => {
                if (!result || !result.resultData)
                    return { resultData: [], errorCode: EErrorCode.none } as IRequestResult<ILoanResponse[]>;

                result.resultData = result.resultData.map(loan => {

                    return{
                        ...loan,
                        loanDate: new Date(loan.loanDate),
                        dueDate: new Date(loan.dueDate),
                        paidDate: loan.paidDate ? new Date(loan.paidDate) : null,
                        createdDate: new Date(loan.createdDate),
                        updatedDate: new Date(loan.updatedDate),
                    }
                })
                return result;
            })
        );
    }
}