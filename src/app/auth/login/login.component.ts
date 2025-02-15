import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../service/auth.service';
import { ILoginForm } from '../interface/loginForm.interface';
import { IRequestError } from '../../request/iRequestError.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatProgressSpinnerModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  providers: [AuthService],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  errorEmailMessage = signal('')
  errorPwdMessage = signal('')
  hidePwd = signal(true);

  form: FormGroup<ILoginForm>
  loading = signal(false)

  constructor() {
    this.form = this.fb.group({
      email: new FormControl("", { nonNullable: true, validators: [Validators.required, Validators.email, Validators.maxLength(150)] }),
      password: new FormControl("", { nonNullable: true, validators: [Validators.required, Validators.minLength(8), Validators.maxLength(150)] })
    })
  }

  login() {
    if (this.form.valid) {
      this.loading.set(true)
      const data = this.form.getRawValue()
      this.authService.login(data).subscribe({
        next: ({ token }) => {
          this.authService.setToken(token)
          this.loading.set(false)
          this.router.navigate(["/"])
        }, error: (err: IRequestError) => {
          console.log({ err })
          this.loading.set(false)
        },
      })
    }
  }

  updateErrorMessage(signal: WritableSignal<string>) {
    if (this.form.controls.email.hasError('required')) {
      signal.set('Campo obrigatório');
    } else {
      signal.set('Campo inválido');
    }
  }

  clickEvent(event: MouseEvent) {
    this.hidePwd.set(!this.hidePwd());
    event.stopPropagation();
  }
}
