import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs';

import { Customer, CustomerService } from '../customer-service';

@Component({
  selector: 'app-customer-details',
  standalone: false,
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.scss'
})
export class CustomerDetailsComponent implements OnInit {

  customer: Customer | null = null;

  loading = false;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly customerService: CustomerService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMessage = 'Invalid customer ID.';
      return;
    }

    this.loadCustomer(id);
  }

  loadCustomer(id: number): void {

    this.loading = true;
    this.errorMessage = '';

    this.customerService
      .getCustomerById(id)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (customer) => {
          this.customer = customer;
        },
        error: () => {
          this.errorMessage = 'Unable to load customer.';
        }
      });
  }

  showUpdateCustomerForm(): void {

    if (!this.customer?.id) {
      return;
    }

    this.router.navigate(['/customer'], {
      queryParams: {
        edit: this.customer.id
      }
    });

  }

  deleteCustomer(): void {

    if (!this.customer?.id) {
      return;
    }

    this.loading = true;

    this.customerService
      .deleteCustomer(this.customer.id)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/customer']);
        },
        error: () => {
          this.errorMessage = 'Unable to delete customer.';
        }
      });

  }

}