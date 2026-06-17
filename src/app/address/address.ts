
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Customer, CustomerService } from '../customer.service';
import { finalize, take } from 'rxjs';
import { Address, AddressService } from '../address-service';

@Component({
  selector: 'app-address',
  standalone: false,
  templateUrl: './address.html',
  styleUrl: './address.scss',
})


export class AddressComponent implements OnInit {
  addresses: Address[] = [];
  loading = false;
  errorMessage = '';

  constructor(private readonly addressService: AddressService,
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
        take(1), // Forces the observable to complete immediately after the first emission
        finalize(() => {
          this.loading = false; // Always executes, no matter what happens
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
          this.loading = false;
          console.log('ADDRESS STATE', this.loading, this.addresses);
        },
        error: (err) => {
          console.error('ADDRESS ERROR', err);
          this.errorMessage = 'Unable to load addresses from /api/address.';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          console.log('ADDRESS COMPLETE', this.loading, this.addresses);
        },
      });
  }
}
