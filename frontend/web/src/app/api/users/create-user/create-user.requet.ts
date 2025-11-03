import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment";
import { EErrorCode } from "../../../shared/enums/error-code.enum";
import { RequestsHandlerService } from "../../../shared/handlers/request/request-handler.service";
import { IRequestResult } from "../../../shared/handlers/request/request-result.interface";
import { IRequest } from "../../../shared/handlers/request/request.interface";
import { ICreateUserRequest } from "./create-user.interface";

export class CrateUserRequest implements IRequest<any> {
    constructor(public request: ICreateUserRequest) { }

    execute(
        requestsHandler: RequestsHandlerService
    ): Observable<IRequestResult<any>> {
        const url = `${environment['apiUrl']}/users`;
        
        return requestsHandler.http.post<IRequestResult<any>>(url, this.request).pipe(
            map((result: IRequestResult<any>) => {
                if (!result || !result.resultData)
                    return { resultData: [], errorCode: EErrorCode.none } as IRequestResult<any>;
                return result;
            })
        );
    }
}