import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address, AddressService } from '../address-service';
import { take } from 'rxjs';

@Component({
  selector: 'app-customer-address-create',
  standalone: false,
  templateUrl: './customer-address-create.html',
  styleUrl: './customer-address-create.scss',
})
export class CustomerAddressCreateComponent implements OnInit {
  customerId: number | null = null;

  address: Address = {} as Address;

  errorMessage = '';
  loading = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly addressService: AddressService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.customerId = Number(id);
        this.address.customerId = this.customerId;
      }
    });
  }

  createAddress(): void {
    if (!this.customerId) {
      this.errorMessage = 'Customer ID is missing.';
      return;
    }

    this.address.customerId = this.customerId;

    this.loading = true;
    this.errorMessage = '';

    this.addressService
      .createAddress(this.address)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate(['/customer-details', this.customerId]);
        },

        error: (err) => {
          console.error(err);

          this.loading = false;
          this.errorMessage = 'Unable to create address.';
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/customer-details', this.customerId]);
  }
}
