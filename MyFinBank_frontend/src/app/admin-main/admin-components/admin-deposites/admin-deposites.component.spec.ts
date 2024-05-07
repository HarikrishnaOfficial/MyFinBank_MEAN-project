import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDepositesComponent } from './admin-deposites.component';

describe('AdminDepositesComponent', () => {
  let component: AdminDepositesComponent;
  let fixture: ComponentFixture<AdminDepositesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDepositesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDepositesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
