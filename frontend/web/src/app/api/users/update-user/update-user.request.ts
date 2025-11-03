import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment";
import { EErrorCode } from "../../../shared/enums/error-code.enum";
import { RequestsHandlerService } from "../../../shared/handlers/request/request-handler.service";
import { IRequestResult } from "../../../shared/handlers/request/request-result.interface";
import { IRequest } from "../../../shared/handlers/request/request.interface";
import { IUpdateUserRequest } from "./update-user.interface";

export class UpdateUserRequest implements IRequest<any> {
    constructor(public userId: string, public request: IUpdateUserRequest) { }

    execute(
        requestsHandler: RequestsHandlerService
    ): Observable<IRequestResult<any>> {
        const url = `${environment['apiUrl']}/users/${this.userId}`;
        
        return requestsHandler.http.put<IRequestResult<any>>(url, this.request).pipe(
            map((result: IRequestResult<any>) => {
                if (!result || !result.resultData)
                    return { resultData: [], errorCode: EErrorCode.none } as IRequestResult<any>;
                return result;
            })
        );
    }
}