import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Footer } from '../../shared/footer/footer';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Footer,],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements AfterViewInit, OnDestroy {
  loginForm: FormGroup;
  showSuggestions = false;
  emailSuggestions = ['@gmail.com', '@outlook.com', '@hotmail.com', '@yahoo.com', '@icloud.com'];

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],

    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  //Sugerencias Email
  onEmailInput() {
    this.showSuggestions = true;
  }
  //Ocultar sugerencias email
  hideSuggestions() {
    this.showSuggestions = false;
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
  //Aplicar sugerencia al email
  applySuggestion(suffix: string) {
    const value = this.email?.value?.split('@')[0] || '';
    this.email?.setValue(value + suffix);
    this.showSuggestions = false;
  }
  //Validar formulario
  onSubmit(event: Event) {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
    else {
      console.error("Formulario inválido");
    }
  }
  showPassword = false;
  // Método para cambiar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  // Método para validar los requisitos de la contraseña
  onPasswordInput(): void {
    const value: string = this.loginForm.get('password')?.value || '';
    this.passwordRules[0].valid = value.length >= 8 && value.length <= 128;
    this.passwordRules[1].valid = /\d/.test(value);
    this.passwordRules[2].valid = /[A-Z]/.test(value);
  }
    // Requisitos de la contraseña
  passwordRules = [
    { label: 'Al menos 8 caracteres', valid: false },
    { label: 'Al menos 1 número', valid: false },
    { label: 'Al menos 1 letra mayúscula', valid: false },
  ];
}