import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomerVehicleComponent } from './customer-vehicle';

describe('CustomerVehicle', () => {
  let component: CustomerVehicleComponent;
  let fixture: ComponentFixture<CustomerVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerVehicleComponent],
      imports: [FormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerVehicleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
