import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { Vehicle, VehicleService } from '../vehicle-service';

@Component({
  selector: 'app-vehicle',
  standalone: false,
  templateUrl: './vehicle.html',
  styleUrl: './vehicle.scss',
})
export class VehicleComponent implements OnInit {

  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle | null = null;
  newVehicle: Vehicle = {} as Vehicle;
  updatedVehicle: Vehicle = {} as Vehicle;
  createVehicleFormVisible = false;
  updateVehicleFormVisible = false;
  loading = false;
  errorMessage = '';

  constructor(
    private readonly vehicleService: VehicleService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  // ================= LOAD ALL =================
  loadVehicles(): void {
    this.loading = true;
    this.errorMessage = '';
    this.createVehicleFormVisible = false;
    this.updateVehicleFormVisible = false;
    this.selectedVehicle = null;

    this.vehicleService
      .getVehicles()
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          console.log('VEHICLE FINALIZE', this.loading);
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (data) => {
          const payload = Array.isArray(data)
            ? data
            : ((data as any)?.items ?? (data as any)?.data ?? []);

          this.vehicles = Array.isArray(payload) ? payload : [];
        },
        error: () => {
          this.errorMessage = 'Unable to load vehicles from API.';
        }
      });
  }

  // ================= LOAD BY ID =================
  loadVehicleById(id: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.selectedVehicle = null;

    this.vehicleService
      .getVehicleById(id)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (vehicle: Vehicle) => {
          this.selectedVehicle = vehicle;
          this.updatedVehicle = { ...vehicle };

          this.createVehicleFormVisible = false;
          this.updateVehicleFormVisible = false;
        },
        error: () => {
          this.errorMessage = `Unable to load vehicle with ID ${id}.`;
        }
      });
  }

  // ================= CREATE =================
  createVehicle(newVehicle: Vehicle): void {
    this.loading = true;
    this.errorMessage = '';

    this.vehicleService
      .createVehicle(newVehicle)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (created) => {
          this.vehicles.push(created);
          this.newVehicle = {} as Vehicle;
          this.createVehicleFormVisible = false;
        },
        error: () => {
          this.errorMessage = 'Unable to create vehicle.';
        }
      });
  }

  // ================= UPDATE =================
  updateVehicle(id: number, updated: Vehicle): void {
    this.loading = true;
    this.errorMessage = '';

    this.vehicleService
      .updateVehicle(id, updated)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (data) => {

          this.vehicles = this.vehicles.map(v =>
            v.id === id ? { ...v, ...data, id } : v
          );

          this.selectedVehicle = { ...(data ?? {}), id } as Vehicle;

          this.updateVehicleFormVisible = false;
          this.createVehicleFormVisible = false;
        },
        error: () => {
          this.errorMessage = 'Unable to update vehicle.';
        }
      });
  }

  getVehicleYear(vehicle?: Vehicle | null): string {
    return vehicle?.year != null ? `${vehicle.year}` : 'no year exists';
  }

  // === DELETE ===
  deleteVehicle(id: number): void {
    this.loading = true;
    this.errorMessage = '';

    this.vehicleService
      .deleteVehicle(id)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: () => {

          this.vehicles = this.vehicles.filter(v => v.id !== id);

          if (this.selectedVehicle?.id === id) {
            this.selectedVehicle = null;
          }
        },
        error: () => {
          this.errorMessage = 'Unable to delete vehicle.';
        }
      });
  }

  // ================= UI CONTROL =================
 showUpdateVehicleForm(vehicle: Vehicle): void {
     this.updatedVehicle = { ...vehicle };
     this.updateVehicleFormVisible = true;
   }
 
   hideUpdateVehicleForm() {
   this.updateVehicleFormVisible = false;
   this.selectedVehicle = /* restore the vehicle you were viewing, e.g.: */
     this.updatedVehicle;
 }
 
 hideCreateVehicleForm
() {
     this.createVehicleFormVisible = false;
   }
 
   showCreateVehicleForm():void{
     this.createVehicleFormVisible = true;
   }
 
   clearSelection(): void {
     this.selectedVehicle = null;
     this.cdr.markForCheck();
   }
 }
