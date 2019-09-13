import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { CommonService } from './common.service';
import { LoaderService } from './LoaderService';
import { Constants } from './constants';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private loaderService: LoaderService, private commonService: CommonService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = req.headers;
    // show loader
    if (!headers.get('ignoreLoader')) {
       this.showLoader();
    }
    if (!req.url.endsWith('/getTokensForClient')) {
      req = req.clone({ headers: req.headers.set('Accept', 'application/json, */*') });
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });

      let cookiesObj = JSON.parse(this.commonService.getStorage(Constants.httpAndCookies.COOKIES_OBJ, true));
      req = req.clone({ headers: req.headers.set(Constants.httpAndCookies.USNM, cookiesObj[Constants.httpAndCookies.USNM]) });
      req = req.clone({ headers: req.headers.set(Constants.httpAndCookies.ACTK, cookiesObj[Constants.httpAndCookies.ACTK]) });
      req = req.clone({ headers: req.headers.set(Constants.httpAndCookies.RFTK, cookiesObj[Constants.httpAndCookies.RFTK]) });
      req = req.clone({ headers: req.headers.set(Constants.httpAndCookies.LGTK, cookiesObj[Constants.httpAndCookies.LGTK]) });
      // for skip all value
      // req = req.clone({ headers: req.headers.set('req_auth', 'true') });
    }
    const startTime = Date.now();
    let status: string;

    return next.handle(req).pipe(
      tap(
        event => {
          status = '';
          // logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            status = 'succeeded';
            // console.log('api call success :', event);
          }
        },
        catchError(this.handleError)
      ),
      finalize(() => {
        const elapsedTime = Date.now() - startTime;
        const message = req.method + ' ' + req.urlWithParams + ' ' + status + ' in ' + elapsedTime + 'ms';
        this.hideLoader();
        this.logDetails(message);
      })
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  private logDetails(msg: string) {
    console.log(msg);
  }

  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }
}
