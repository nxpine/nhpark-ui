import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle, VehicleService } from '../vehicle-service';
import { take } from 'rxjs';

@Component({
  selector: 'app-customer-vehicle-create',
  standalone: false,
  templateUrl: './customer-vehicle-create.html',
  styleUrl: './customer-vehicle-create.scss',
})
export class CustomerVehicleCreateComponent implements OnInit {
  customerId: number | null = null;

  vehicle: Vehicle = {} as Vehicle;
  vehicleId: number | null= null;
  errorMessage = '';
  loading = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly vehicleService: VehicleService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.customerId = Number(id);
        this.vehicle.customerId = this.customerId;
      }
    });
  }

  createVehicle(): void {
    if (!this.customerId) {
      this.errorMessage = 'Customer ID is missing.';
      return;
    }

    this.vehicle.customerId = this.customerId;

    this.loading = true;
    this.errorMessage = '';

    this.vehicleService
      .createVehicle(this.vehicle)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate(['/customer-details', this.customerId]);
        },

        error: (err) => {
          console.error(err);

          this.loading = false;
          this.errorMessage = 'Unable to create vehicle.';
        },
      });
  }

  goBack(): void {
    if (this.customerId)
    this.router.navigate(['/customer-details', this.customerId]);
  }
}
