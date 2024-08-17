import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getCurrentLocation(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }
}
