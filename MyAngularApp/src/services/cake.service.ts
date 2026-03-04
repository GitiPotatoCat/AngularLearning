import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError, retry, catchError, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CakeService {
  getCakes(): Observable<string[]> {
    const cakes = ['Chocolate Fudge', 'Red Velvet', 'Lemon Drizzle', 'Strawberry Shortcake'];
    
    return of(cakes).pipe(
      delay(2000),
      // Logic: If it fails, retry 2 times with a 1-second gap
      retry({ count: 2, delay: 1000 }),
      catchError(err => {
        console.error('Bakery Service Error:', err);
        return throwError(() => new Error('The bakery is currently overbooked.'));
      })
    );
  }
}