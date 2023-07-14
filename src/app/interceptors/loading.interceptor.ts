import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.loadingService.showLoading();

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.loadingService.hideLoading();
          }
        },
        () => {
          this.loadingService.hideLoading();
        }
      )
    );
  }
}
