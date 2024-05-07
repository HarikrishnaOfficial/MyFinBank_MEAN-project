import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDepositeComponent } from './user-deposite.component';

describe('UserDepositeComponent', () => {
  let component: UserDepositeComponent;
  let fixture: ComponentFixture<UserDepositeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDepositeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDepositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
