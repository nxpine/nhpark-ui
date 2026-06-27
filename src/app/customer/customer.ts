import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Customer, CustomerService } from '../customer-service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null; // Stores the single fetched customer
  newCustomer: Customer = {} as Customer; // Optional, currently unused
  updatedCustomer: Customer = {} as Customer; // Optional, currently unused
  loading = false;
  errorMessage = '';

  constructor(
    private readonly customerService: CustomerService,
    private readonly cdr: ChangeDetectorRef,
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

  // New feature method
  loadCustomerById(id: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.selectedCustomer = null; // Clear previous selection

    this.customerService
      .getCustomerById(id) // Assumes this method exists in CustomerService
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          console.log('CUSTOMER BY ID FINALIZE', this.loading);
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (customer: Customer) => {
          console.log('CUSTOMER BY ID DATA', customer);
          this.selectedCustomer = customer;
          this.updatedCustomer = { ...customer }; // Create a copy for editing
        },
        error: (err) => {
          console.error('CUSTOMER BY ID ERROR', err);
          this.errorMessage = `Unable to load customer with ID ${id}.`;
        },
      });
  }

  // create new customer
  createCustomer(newCustomer: Customer): void {
    this.loading = true;
    this.errorMessage = '';

    this.customerService
      .createCustomer(newCustomer).pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          console.log('CREATE CUSTOMER FINALIZE', this.loading);          
          this.cdr.markForCheck();          
        }),
      ).subscribe({
        next: (createdCustomer: Customer) => {
          console.log('CREATED CUSTOMER DATA', createdCustomer);                    
        },
        error: (err) => {
          console.error('CREATE CUSTOMER ERROR', err);
          this.errorMessage = 'Unable to create customer.';
        },
      });
  }

    //update customer
  updateCustomer(id: number, updatedCustomer: Customer): void {
    this.loading = true;
    this.errorMessage = '';
    this.customerService
      .updateCustomer(id, updatedCustomer)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          console.log('UPDATE CUSTOMER FINALIZE', this.loading);
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (updatedCustomer: Customer) => {
          console.log('UPDATED CUSTOMER DATA', updatedCustomer);
        },
        error: (err) => {
          console.error('UPDATE_CUSTOMER_ERROR', err);
          this.errorMessage = 'Unable to update customer.';
        },
      });
  }

  deleteCustomer(id: number): void {
    this.loading = true;
    this.errorMessage = '';

    this.customerService
      .deleteCustomer(id)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          console.log('DELETE CUSTOMER FINALIZE', this.loading);
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: () => {
          console.log('DELETED CUSTOMER MESSAGE');
          this.loadCustomers(); // Reload the customer list
        },
        error: (err) => {
          console.error('DELETE_CUSTOMER_ERROR', err);
          this.errorMessage = 'Unable to delete customer.';
        },
      });
  }
    
  clearSelection(): void {
    this.selectedCustomer = null;
    this.cdr.markForCheck();
  }
}