import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotUsernameOrPasswordComponent } from './forgot-username-or-password.component';

describe('ForgotUsernameOrPasswordComponent', () => {
  let component: ForgotUsernameOrPasswordComponent;
  let fixture: ComponentFixture<ForgotUsernameOrPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotUsernameOrPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotUsernameOrPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
