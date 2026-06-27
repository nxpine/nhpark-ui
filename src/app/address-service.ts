import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Address {
  id?: number;
  street?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  customerId?: number; // Added to fully align with your HTML form requirements
}

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly apiUrl = '/api/address';

  constructor(private readonly http: HttpClient) {}

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiUrl);
  }

  getAddressById(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/${id}`);
  }

  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, address);
  }

  updateAddress(id: number, updatedAddress: Address): Observable<Address> {
    return this.http.patch<Address>(`${this.apiUrl}/${id}`, updatedAddress);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
