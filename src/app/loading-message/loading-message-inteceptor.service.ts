import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingMessageService } from './loading-message.service';

/**
 * Intercepts Http requests in order to notify the
 * `LoadingMessageService` that there is a request
 * in progress and that the loading indicator should be shown.
 */
@Injectable()
export class LoadingMessageInterceptor implements HttpInterceptor {

  activeRequests = 0;

  constructor(private loadingMessageService: LoadingMessageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.activeRequests === 0) {
      this.loadingMessageService.startLoading();
    }

    this.activeRequests++;
    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.loadingMessageService.stopLoading();
        }
      })
    );

  }

}
