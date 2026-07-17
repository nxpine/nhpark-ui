import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle, VehicleService } from '../vehicle-service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-customer-vehicle',
  standalone: false,
  templateUrl: './customer-vehicle.html',
  styleUrl: './customer-vehicle.scss',
})
export class CustomerVehicleComponent implements OnInit {
  loading = false;
  errorMessage = '';
  vehicleId: number | null = null;
  newVehicle: Vehicle = {} as Vehicle;
  vehicle: Vehicle = {} as Vehicle;

  constructor(
    private route: ActivatedRoute,
    private readonly vehicleService: VehicleService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');

      if (idParam !== null) {
        this.vehicleId = +idParam;

        this.loadVehicleById(this.vehicleId);
      }
    });
  }

  loadVehicleById(id: number | null): void {
    if (!id) {
      console.error('Invalid vehicle ID');
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.vehicleService
      .getVehicleById(id)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (vehicle: Vehicle) => {
          this.vehicle = vehicle;
        },

        error: (err) => {
          console.error(err);
          this.errorMessage = `Unable to load vehicle with ID ${id}.`;
        },
      });
  }

  updateVehicle(): void {
    if (!this.vehicleId) {
      console.error('Invalid vehicle ID');
      return;
    }

    this.vehicleService
      .updateVehicle(this.vehicleId, this.vehicle)
      .pipe(take(1))
      .subscribe({
        next: (vehicle: Vehicle) => {
          this.vehicle = vehicle;
          this.errorMessage = 'Vehicle saved successfully.';
          this.cdr.markForCheck();
        },

        error: () => {
          this.errorMessage = 'Unable to update vehicle.';
        },
      });
  }

  createVehicle(): void {
    this.loading = true;
    this.errorMessage = '';

    if (this.vehicleId) {
      this.newVehicle.customerId = this.vehicleId;
    }

    this.vehicleService
      .createVehicle(this.newVehicle)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (vehicle: Vehicle) => {
          this.newVehicle = {} as Vehicle;

          this.errorMessage = 'Vehicle created successfully.';
        },

        error: (err) => {
          console.error(err);

          this.errorMessage = 'Unable to create vehicle.';
        },
      });
  }
}
