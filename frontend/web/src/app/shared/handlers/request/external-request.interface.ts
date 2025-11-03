import { Observable } from 'rxjs';
import { RequestsHandlerService } from './request-handler.service';

export interface IExternalRequest<T> {
  execute(requestsHandler: RequestsHandlerService): Observable<T>;
}
