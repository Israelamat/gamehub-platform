import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  console.log('🔑 TOKEN FROM STORAGE:', token);

  if (!token) {
    console.log('❌ NO TOKEN FOUND');
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('✅ AUTH HEADER ADDED');

  return next(cloned);
};