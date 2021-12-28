import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: any;

  constructor(
    public userStore: UserStore,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
   }

   ngOnInit(): void {
  }


  onClickSubmit() {

  }

  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.userStore.signIn(email, password);
      this.form.reset();
      this.router.navigate(['/home-page']);
    }
    return;
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
