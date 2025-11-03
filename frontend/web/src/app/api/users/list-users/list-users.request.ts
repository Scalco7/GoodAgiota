import { map, Observable } from "rxjs";
import { RequestsHandlerService } from "../../../shared/handlers/request/request-handler.service";
import { IRequest } from "../../../shared/handlers/request/request.interface";
import { IUserResponse } from "./list-users.interface";
import { environment } from "../../../../environments/environment";
import { IRequestResult } from "../../../shared/handlers/request/request-result.interface";
import { EErrorCode } from "../../../shared/enums/error-code.enum";

export class ListUsersQuery implements IRequest<IUserResponse[]> {
    constructor() { }

    execute(
        requestsHandler: RequestsHandlerService
    ): Observable<IRequestResult<IUserResponse[]>> {
        const url = `${environment['apiUrl']}/users`;
        
        return requestsHandler.http.get<IRequestResult<IUserResponse[]>>(url).pipe(
            map((result: IRequestResult<IUserResponse[]>) => {
                if (!result || !result.resultData)
                    return { resultData: [], errorCode: EErrorCode.none } as IRequestResult<IUserResponse[]>;
                return result;
            })
        );
    }
}