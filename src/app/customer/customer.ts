import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Customer, CustomerService } from '../customer.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  loading = false;
  errorMessage = '';

  constructor(private readonly customerService: CustomerService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.customerService
      .getCustomers()
      .pipe(
        take(1), // Forces the observable to complete immediately after the first emission
        finalize(() => {
          this.loading = false; // Always executes, no matter what happens
          console.log('CUSTOMER FINALIZE', this.loading);
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (data) => {
          const payload = Array.isArray(data)
            ? data
            : ((data as { items?: Customer[]; data?: Customer[] })?.items ??
              (data as { items?: Customer[]; data?: Customer[] })?.data ??
              []);

          console.log('CUSTOMER DATA', data, 'NORMALIZED', payload);
          this.customers = Array.isArray(payload) ? payload : [];
          this.loading = false;
          console.log('CUSTOMER STATE', this.loading, this.customers);
        },
        error: (err) => {
          console.error('CUSTOMER ERROR', err);
          this.errorMessage = 'Unable to load customers from /api/customer.';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          console.log('CUSTOMER COMPLETE', this.loading, this.customers);
        },
      });
  }
}
