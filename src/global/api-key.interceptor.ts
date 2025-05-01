import { HttpHandlerFn } from '@angular/common/http';
import { HttpRequest } from '@angular/common/module.d-CnjH8Dlt';
import { environment } from 'src/environments/environment';

export function apiKeyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const apiKey = environment.API_KEY;
  const apiKeySelector = environment.API_KEY_SELECTOR;

  const newReq = req.clone({
    headers: req.headers.append(apiKeySelector, apiKey)
  });

  return next(newReq);
}
