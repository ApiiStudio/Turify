import { AfterViewInit, Component, OnDestroy, ElementRef, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Footer } from '../../shared/footer/footer';
import { Observable } from 'rxjs';
import { AuthSignupService } from '../../services/auth-signup/auth-signup';
import { SignupRequest } from '../../services/auth-signup/signup-request';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, Footer,],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements AfterViewInit, OnDestroy {
  signupError: string = "";
  registerForm: FormGroup;
  showSuggestions = false;
  emailSuggestions = ['@gmail.com', '@outlook.com', '@hotmail.com', '@yahoo.com', '@icloud.com'];
  http: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authSignupService: AuthSignupService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordComplexityValidator]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }


  // Validador para la contraseña
  passwordComplexityValidator(control: any) {
    const value = control.value || '';
    const errors: any = {};

    if (value.length < 8) errors.minLength = true;
    if (!/[A-Z]/.test(value)) errors.uppercase = true;
    if (!/[0-9]/.test(value)) errors.number = true;

    return Object.keys(errors).length ? errors : null;
  }
  // Mensaje para la contraseña
  getPasswordError(): string | null {
    const control = this.password;
    if (control?.touched && control?.errors) {
      const errors = control.errors;

    }
    return null;
  }
  // Requisitos de la contraseña
  passwordRules = [
    { label: 'Al menos 8 caracteres', valid: false },
    { label: 'Al menos 1 número', valid: false },
    { label: 'Al menos 1 letra mayúscula', valid: false },
  ];
  // Método para validar los requisitos de la contraseña
  onPasswordInput(): void {
    const value: string = this.registerForm.get('password')?.value || '';
    this.passwordRules[0].valid = value.length >= 8 && value.length <= 128;
    this.passwordRules[1].valid = /\d/.test(value);
    this.passwordRules[2].valid = /[A-Z]/.test(value);
  }
  // Métodos para obtener los controles del formulario
  get name() {
    return this.registerForm.get('name');
  }
  get surname() {
    return this.registerForm.get('surname')
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  signup() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...signupData } = this.registerForm.value;  // 👈 confirmPassword queda afuera

      console.log("Datos a enviar:", signupData);  // Asegurate de que aquí NO aparezca confirmPassword

      this.authSignupService.signup(signupData as SignupRequest).subscribe({
        next: (userData) => {
          console.log("datos del servicio");
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.signupError = errorData;
        },
        complete: () => {
          console.info("Signup está completo");
          this.router.navigateByUrl('/home/inicio');
          this.registerForm.reset();
        }
      });
    }
  }

  // Validador coincidencia de contraseñas
  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value ? null : { mismatch: true };
  }
  // Botón para enviar el formulario
  onSubmit(event: Event) {
    if (this.registerForm.valid) {
      const signupData: SignupRequest = this.registerForm.value;
      this.authSignupService.signup(signupData).subscribe({
        next: (res) => {
          // Registro exitoso, redirige o muestra mensaje
          this.router.navigateByUrl('/signup');
        },
        error: (err) => {
          // Maneja el error (por ejemplo, email ya registrado)
          this.signupError = 'Error al registrar: ' + (err.error?.detail || 'Intenta de nuevo');
        }
      });
    } else {
      console.error("Formulario inválido");
    }
  }
  showPassword = false;
  // Método para cambiar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  onEmailInput() {
    this.showSuggestions = true;
  }
  // Sugerencia de correo electrónico
  applySuggestion(suffix: string) {
    const value = this.email?.value?.split('@')[0] || '';
    this.email?.setValue(value + suffix);
    this.showSuggestions = false;
  }
  // Ocultar sugerencias de correo electrónico
  hideSuggestions() {
    setTimeout(() => this.showSuggestions = false, 200);
  }
  @ViewChild('emailContainer') emailContainer!: ElementRef;

  private clickListener: any;

  ngAfterViewInit() {
    this.clickListener = (event: MouseEvent) => {
      if (
        this.showSuggestions &&
        this.emailContainer &&
        !this.emailContainer.nativeElement.contains(event.target)
      ) {
        this.showSuggestions = false;
      }
    };
    document.addEventListener('mousedown', this.clickListener);
  }

  ngOnDestroy() {
    document.removeEventListener('mousedown', this.clickListener);
  }

}
