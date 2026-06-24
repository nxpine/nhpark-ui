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
        },
        error: (err) => {
          console.error('ADDRESS ERROR', err);
          this.errorMessage = 'Unable to load addresses from /api/address.';
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
        },
        error: (err) => {
          console.error('ADDRESS BY ID ERROR', err);
          this.errorMessage = `Unable to load address with ID ${id}.`;
        },
      });
  }
// create new address
  createAddress(newAddress: Address): void {
      this.loading = true;
      this.errorMessage = '';
      
      this.addressService['createAddress'](newAddress).pipe(
        take(1), 
        finalize(() => {
          this.loading = false;
          console.log('CREATE ADDRESS FINALIZE', this.loading);
          this.cdr.markForCheck();
        })).subscribe({
          next: (createdAddress: Address) => {
            console.log('CREATED ADDRESS DATA', createdAddress);
          },
          error: (err: any) => {
            console.error('CREATE ADDRESS ERROR', err);
            this.errorMessage = 'Unable to create address.';
          }
        });
  
    }  
  
    // Optional helper to clear the detailed view
    clearSelection(): void {
      this.selectedAddress = null;
      this.cdr.markForCheck();
    }
  }