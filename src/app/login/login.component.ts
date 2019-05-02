import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AlertService } from '../core';
import { first } from 'rxjs/operators';
import { Config } from '../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private auth: AuthService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ])
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.alert.danger(Config.validatorMessage.invalidLoginField);
      return;
    }

    this.auth
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        }
      );
  }
}
