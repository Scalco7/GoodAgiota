import { Observable } from "rxjs";
import { IExternalRequest } from "../../../shared/handlers/request/external-request.interface";
import { RequestsHandlerService } from "../../../shared/handlers/request/request-handler.service";
import { IListCoinResponse } from "./list-coins.interface";

export class ListCoinsRequest implements IExternalRequest<IListCoinResponse> {
    constructor() { }

    execute(
        requestsHandler: RequestsHandlerService
    ): Observable<IListCoinResponse> {
        const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$format=json&$select=simbolo,nomeFormatado`;

        return requestsHandler.http.get<IListCoinResponse>(url)
    }
}