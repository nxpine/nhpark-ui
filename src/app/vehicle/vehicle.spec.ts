import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleComponent } from './vehicle';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Vehicle', () => {
  let component: VehicleComponent;
  let fixture: ComponentFixture<VehicleComponent>; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleComponent], 
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
