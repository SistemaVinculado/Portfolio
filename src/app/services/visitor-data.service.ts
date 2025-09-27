import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Visitor } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VisitorDataService {
  private locations: Visitor[] = [
    { city: 'Tokyo', country: 'Japan', lat: 35.6895, lon: 139.6917 },
    { city: 'New York', country: 'USA', lat: 40.7128, lon: -74.0060 },
    { city: 'London', country: 'UK', lat: 51.5074, lon: -0.1278 },
    { city: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
    { city: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 },
    { city: 'São Paulo', country: 'Brazil', lat: -23.5505, lon: -46.6333 },
    { city: 'Cairo', country: 'Egypt', lat: 30.0444, lon: 31.2357 },
    { city: 'Moscow', country: 'Russia', lat: 55.7558, lon: 37.6173 },
    { city: 'Beijing', country: 'China', lat: 39.9042, lon: 116.4074 },
    { city: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198 },
    { city: 'Los Angeles', country: 'USA', lat: 34.0522, lon: -118.2437 },
    { city: 'Berlin', country: 'Germany', lat: 52.5200, lon: 13.4050 },
    { city: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lon: -58.3816 },
    { city: 'New Delhi', country: 'India', lat: 28.6139, lon: 77.2090 },
    { city: 'Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832 }
  ];

  getVisitorStream(): Observable<Visitor> {
    // Emit a new visitor every 2.5 seconds, starting immediately
    return timer(0, 2500).pipe(
      map(() => this.locations[Math.floor(Math.random() * this.locations.length)])
    );
  }
}
