import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthSignupService } from './auth-signup';

describe('AuthSignup', () => {
  let component: AuthSignupService;
  let fixture: ComponentFixture<AuthSignupService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthSignupService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSignupService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
