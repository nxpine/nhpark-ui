import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address, AddressService } from '../address-service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-customer-address',
  standalone: false,
  templateUrl: './customer-address.html',
  styleUrl: './customer-address.scss',
})
export class CustomerAddressComponent implements OnInit {
  loading = false;
  errorMessage = '';

  addressId: number | null = null;
  newAddress: Address = {} as Address;
  address: Address = {} as Address;

  constructor(
    private route: ActivatedRoute,
    private readonly addressService: AddressService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');

      if (idParam !== null) {
        this.addressId = +idParam;

        this.loadAddressById(this.addressId);
      }
    });
  }

  loadAddressById(id: number | null): void {
    if (!id) {
      console.error('Invalid address ID');
      return;
    }

    this.loading = true;
    this.errorMessage = '';

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
          this.address = address;
        },

        error: (err) => {
          console.error(err);
          this.errorMessage = `Unable to load address with ID ${id}.`;
        },
      });
  }

  updateAddress(): void {
    if (!this.addressId) {
      console.error('Invalid address ID');
      return;
    }

    this.addressService
      .updateAddress(this.addressId, this.address)
      .pipe(take(1))
      .subscribe({
        next: (address: Address) => {
          this.address = address;
          this.errorMessage = 'Address saved successfully.';
          this.cdr.markForCheck();
        },

        error: () => {
          this.errorMessage = 'Unable to update address.';
        },
      });
  }
  createAddress(): void {
    this.loading = true;
    this.errorMessage = '';

    if (this.addressId) {
      this.newAddress.customerId = this.addressId;
    }

    this.addressService
      .createAddress(this.newAddress)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (address: Address) => {
          this.newAddress = {} as Address;

          this.errorMessage = 'Address created successfully.';
        },

        error: (err) => {
          console.error(err);

          this.errorMessage = 'Unable to create address.';
        },
      });
  }
}
