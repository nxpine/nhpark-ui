import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Address, AddressService } from '../address-service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-address',
  standalone: false,
  templateUrl: './address.html',
  styleUrl: './address.scss',
})
export class AddressComponent implements OnInit {
  addresses: Address[] = [];
  selectedAddress: Address | null = null;
  newAddress: Address = {} as Address;
  updatedAddress: Address = {} as Address;
  country: string = '';
  loading = false;
  errorMessage = '';

  constructor(
    private readonly addressService: AddressService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.loading = true;
    this.errorMessage = '';

    this.addressService
      .getAddresses()
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          console.log('ADDRESS FINALIZE', this.loading);
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (data) => {
          const payload = Array.isArray(data)
            ? data
            : ((data as { items?: Address[]; data?: Address[] })?.items ??
              (data as { items?: Address[]; data?: Address[] })?.data ??
              []);

          console.log('ADDRESS DATA', data, 'NORMALIZED', payload);
          this.addresses = Array.isArray(payload) ? payload : [];
          console.log('ADDRESS STATE', this.loading, this.addresses);
        },
        error: (err) => {
          console.error('ADDRESS ERROR', err);
          this.errorMessage = 'Unable to load addresses from /api/address.';
        },
        complete: () => {
          console.log('ADDRESS COMPLETE', this.loading, this.addresses);
        },
      });
  }

  loadAddressById(id: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.selectedAddress = null;

    this.addressService
      .getAddressById(id)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          console.log('ADDRESS BY ID FINALIZE', this.loading);
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (address: Address) => {
          console.log('ADDRESS BY ID DATA', address);
          this.selectedAddress = address;
          this.updatedAddress = { ...address };
        },
        error: (err) => {
          console.error('ADDRESS BY ID ERROR', err);
          this.errorMessage = `Unable to load address with ID ${id}.`;
        },
      });
  }

  createAddress(newAddress: Address): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.addressService
      .createAddress(newAddress)
      .pipe(
        take(1), 
        finalize(() => {
          this.loading = false;
          console.log('CREATE ADDRESS FINALIZE', this.loading);
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (createdAddress: Address) => {
          console.log('CREATED ADDRESS DATA', createdAddress);
          this.loadAddresses(); // Optional: Refresh list after creation
        },
        error: (err: any) => {
          console.error('CREATE ADDRESS ERROR', err);
          this.errorMessage = 'Unable to create address.';
        }
      });
  }  

  updateAddress(id: number, updatedAddress: Address): void {
    this.loading = true;
    this.errorMessage = '';

    this.addressService
      .updateAddress(id, updatedAddress)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          console.log('UPDATE ADDRESS FINALIZE', this.loading);
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (data) => {
          console.log('UPDATED ADDRESS DATA', updatedAddress);
        },
        error: (err) => {
          console.error('Error updating address', err);
          this.errorMessage = 'Unable to update address.';
        }
      });
  }

  deleteAddress(id: number): void {
    this.loading = true;
    this.errorMessage = '';

    this.addressService
      .deleteAddress(id)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          console.log('DELETE ADDRESS FINALIZE', this.loading);
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: () => {
          console.log('Address deleted successfully');
          this.loadAddresses(); 
        },
        error: (err) => {
          console.error('Error deleting address', err);
          this.errorMessage = 'Unable to delete address.';
        }
      });
  } // <-- Fixed missing closing brace

  clearSelection(): void {
    this.selectedAddress = null;
    this.cdr.markForCheck();
  }
}
