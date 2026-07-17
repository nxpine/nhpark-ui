import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vehicle {
  id?: number;
  customerId?: number;
  make?: string;
  model?: string;
  year?: number;
  licensePlate?: string;
  color?: string;
}

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly apiUrl = '/api/vehicle';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }

  getVehiclesByCustomerId(customerId: number) {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle);
  }

  updateVehicle(id: number, updatedVehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/${id}`, updatedVehicle);
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
