import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = 'http://localhost:8000/api';

  if (req.url.startsWith('http')) {
    return next(req);
  }

  if (!req.url.startsWith('/')) {
    return next(req);
  }

  const apiReq = req.clone({
    url: apiUrl + req.url,
  });

  return next(apiReq);
};
