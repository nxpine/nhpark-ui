import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { finalize, take } from 'rxjs';
import { LocationService, Location } from '../location-service';

@Component({
  selector: 'app-location',
  standalone: false,
  templateUrl: './location.html',
  styleUrls: ['./location.scss']
})
export class LocationComponent implements OnInit {

  location: Location[] = [];
  loading = false;
  errorMessage = '';

  // 👇 for clicked location (details panel / popup / etc.)
  selectedLocation: Location | null = null;

  // optional (you currently have this unused)
  newLoc: any;

  constructor(
    private readonly locationService: LocationService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLocation();
  }

  loadLocation(): void {
    this.loading = true;
    this.errorMessage = '';

    this.locationService
      .getLocations()
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          console.log('LOCATION FINALIZE', this.loading);
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (data) => {

          const payload = Array.isArray(data)
            ? data
            : (data as any)?.items ??
              (data as any)?.data ??
              [];

          this.location = Array.isArray(payload) ? payload : [];

          console.log('LOCATION DATA', data);
          console.log('NORMALIZED', payload);
          console.log('LOCATION STATE', this.location);
        },

        error: (err) => {
          console.error('LOCATION ERROR', err);
          this.errorMessage = 'Unable to load locations from /api/location.';
        }
      });
  }

  // ⭐ CLICK HANDLER FOR HYPERLINK
  openLocation(loc: Location): void {
    console.log('Clicked location:', loc);
    this.selectedLocation = loc;
  }

  //  remove this later (it breaks runtime if accidentally called)
  saveLocation() {
    throw new Error('Method not implemented.');
  }
}