import { Observable } from 'rxjs';
import { RequestsHandlerService } from './request-handler.service';
import { IRequestResult } from './request-result.interface';

export interface IRequest<T> {
  execute(requestsHandler: RequestsHandlerService): Observable<IRequestResult<T>>;
}

