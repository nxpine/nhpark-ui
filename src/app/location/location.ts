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
  selectedLocation: Location | null = null; // Stores the single fetched location
  newLocation: Location = {} as Location; // Optional, currently unused
  updatedLocation: Location = {} as Location; // Optional, currently unused
  loading = false;
  errorMessage = '';
 
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
            : ((data as { items?: Location[]; data?: Location[] })?.items ??
              (data as { items?: Location[]; data?: Location[] })?.data ??
              []);


          console.log('LOCATION DATA', data, 'NORMALIZED', payload);
          this.location = Array.isArray(payload) ? payload : [];
          console.log('LOCATION STATE', this.location);
        },
        error: (err) => {
          console.error('LOCATION ERROR', err);
          this.errorMessage = 'Unable to load locations from /api/location.';
        },
        complete: () => {
          console.log('LOCATION COMPLETE', this.loading, this.location);
        }
      });
  }

  // New feature method
loadLocationById(id: number): void {
  this.loading = true;
  this.errorMessage = '';
  this.selectedLocation = null; // Clear previous selection

  this.locationService
    .getLocationById(id)
    .pipe(
      take(1),
      finalize(() => {
        this.loading = false;
        console.log('LOCATION BY ID FINALIZE', this.loading);
        this.cdr.markForCheck();
      }),
    )
    .subscribe({
      next: (location: Location) => {
        console.log('LOCATION BY ID DATA', location);
        this.selectedLocation = location;
        this.updatedLocation = { ...location }; // copy for editing
      },
      error: (err) => {
        console.error('LOCATION BY ID ERROR', err);
        this.errorMessage = `Unable to load location with ID ${id}.`;
      },
    });
}

  // create new location
  createLocation(newLocation: any): void {
    this.loading = true;
    this.errorMessage = '';

    this.locationService.createLocation(newLocation).pipe(
      take(1),
      finalize(() => {
        this.loading = false;
        console.log('CREATE LOCATION FINALIZE', this.loading);
        this.cdr.markForCheck();
      })
    )
    .subscribe({
      next: (createdLocation: Location) => {
        console.log('CREATED LOCATION DATA', createdLocation);
        this.loadLocation(); // Refresh the list after creation
      },
      error: (err) => {
        console.error('CREATE LOCATION ERROR', err);
        this.errorMessage = 'Unable to create location.';
      }
    });
  }

    // update location
  updateLocation(id: number, updatedLocation: Location): void {
    this.loading = true;
    this.errorMessage = '';

    this.locationService
      .updateLocation(id, updatedLocation)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          console.log('UPDATE LOCATION FINALIZE', this.loading);
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (updatedLocation: Location) => {
          console.log('UPDATED LOCATION DATA', updatedLocation);
        },
        error: (err) => {
          console.error('UPDATE LOCATION ERROR', err);
          this.errorMessage = 'Unable to update location.';
        },
      });
  }
  deleteLocation(id: number): void {
    this.loading = true;
    this.errorMessage = '';

    this.locationService
      .deleteLocation(id)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          console.log('DELETE LOCATION FINALIZE', this.loading);
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: () => {
          console.log('Location deleted successfully');
          this.loadLocation(); 
        },
        error: (err) => {
          console.error('Error deleting location', err);
          this.errorMessage = 'Unable to delete location.';
        }
      });
  }
  //  CLICK HANDLER FOR HYPERLINK
  clearSelection(): void {
    this.selectedLocation = null;
    this.cdr.markForCheck();
  }

}