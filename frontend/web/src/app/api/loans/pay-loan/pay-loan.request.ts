import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment";
import { EErrorCode } from "../../../shared/enums/error-code.enum";
import { RequestsHandlerService } from "../../../shared/handlers/request/request-handler.service";
import { IRequestResult } from "../../../shared/handlers/request/request-result.interface";
import { IRequest } from "../../../shared/handlers/request/request.interface";

export class PayLoanRequest implements IRequest<any> {
    constructor(public loanId: string) { }

    execute(
        requestsHandler: RequestsHandlerService
    ): Observable<IRequestResult<any>> {
        const url = `${environment['apiUrl']}/loans/pay/${this.loanId}`;
        
        return requestsHandler.http.post<IRequestResult<any>>(url, this).pipe(
            map((result: IRequestResult<any>) => {
                if (!result || !result.resultData)
                    return { resultData: [], errorCode: EErrorCode.none } as IRequestResult<any>;
                return result;
            })
        );
    }
}