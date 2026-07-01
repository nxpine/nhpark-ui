import { Component } from '@angular/core';

@Component({
  selector: 'app-vehicle',
  standalone: false,
  templateUrl: './vehicle.html',
  styleUrl: './vehicle.scss',
})
export class Vehicle {
  vehicleTypes = ['Compact', 'Sedan', 'SUV', 'Truck'];
  newVehicleType = '';
  feedback = '';

  addVehicleType(): void {
    const trimmedType = this.newVehicleType.trim();

    if (!trimmedType) {
      this.feedback = 'Please enter a vehicle type.';
      return;
    }

    if (!this.vehicleTypes.includes(trimmedType)) {
      this.vehicleTypes = [...this.vehicleTypes, trimmedType];
    }

    this.feedback = `Added ${trimmedType}.`;
    this.newVehicleType = '';
  }

  removeVehicleType(type: string): void {
    this.vehicleTypes = this.vehicleTypes.filter((item) => item !== type);
  }
}
