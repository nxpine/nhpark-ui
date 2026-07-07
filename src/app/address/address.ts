import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Address, AddressService } from '../address-service';
import { finalize, take } from 'rxjs';
import { Router } from '@angular/router';

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
  createAddressFormVisible = false;
  updateAddressFormVisible = false;
  loading = false;
  errorMessage = '';

  constructor(
    private readonly addressService: AddressService,
    private readonly cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.loading = true;
    this.errorMessage = '';
    this.createAddressFormVisible = false;
    this.updateAddressFormVisible = false;
    this.selectedAddress = null;

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

          this.addresses = Array.isArray(payload) ? payload : [];
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Unable to load addresses from /api/address.';
        }
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
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (address: Address) => {
          this.selectedAddress = address;
          this.updatedAddress = { ...address };

          // auto switch UI mode safely
          this.createAddressFormVisible = false;
          this.updateAddressFormVisible = false;
        },
        error: () => {
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
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (createdAddress: Address) => {

          this.addresses.push(createdAddress);

          this.newAddress = {} as Address;

          this.createAddressFormVisible = false;
        },
        error: () => {
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
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (data) => {
          this.addresses = this.addresses.map((address) =>
            address.id === id ? { ...address, ...data, id } : address,
          );

          this.selectedAddress = { ...(data ?? {}), id } as Address;
          this.updateAddressFormVisible = false;
          this.createAddressFormVisible = false;
        },
        error: () => {
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
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: () => {

          this.addresses = this.addresses.filter(a => a.id !== id);

          if (this.selectedAddress?.id === id) {
            this.selectedAddress = null;
          }
        },
        error: () => {
          this.errorMessage = 'Unable to delete address.';
        }
      });
  }

  showUpdateAddressForm(address: Address): void {
    this.updatedAddress = { ...address };
    this.updateAddressFormVisible = true;
    this.createAddressFormVisible = false;
    this.selectedAddress = null;
    this.errorMessage = '';
  }

  hideUpdateAddressForm(): void {
    this.updateAddressFormVisible = false;
    this.selectedAddress = null;
    this.loadAddresses();
  }

  showCreateAddressForm(): void {
    this.createAddressFormVisible = true;
    this.updateAddressFormVisible = false;
    this.selectedAddress = null;
    this.errorMessage = '';
  }

  hideCreateAddressForm(): void {
    this.createAddressFormVisible = false;
    this.newAddress = {} as Address;
    this.loadAddresses();
  }

  clearSelection(): void {
    this.selectedAddress = null;
  }
}
