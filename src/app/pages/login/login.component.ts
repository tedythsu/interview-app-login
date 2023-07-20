import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

interface loginFormErrorTips {
  account: string;
  userName: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  accountVisible = false;
  userNameVisible = false;
  passwordVisible = false;

  loginFormErrorTips: loginFormErrorTips = {
    account: '必填欄位',
    userName: '請輸入6-20碼英數符號',
    password: '請輸入8-12碼英數符號'
  }

  subscribeToFormChanges() {
    this.loginForm.valueChanges.subscribe(() => {
      this.onFormValueChanged();
    });
  }

  onFormValueChanged() {
    const userNameControl = this.loginForm.get('userName');
    const passwordControl = this.loginForm.get('password');

    if (userNameControl?.value !== "" && userNameControl?.invalid) {
      this.loginFormErrorTips.userName = "輸入長度不符合規則";
    } else {
      this.loginFormErrorTips.userName = "請輸入6-20碼英數符號";
    }

    if (passwordControl?.value !== "" && passwordControl?.invalid) {
      this.loginFormErrorTips.password = "輸入長度不符合規則";
    } else {
      this.loginFormErrorTips.password = "請輸入6-20碼英數符號";
    }
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log('submit', this.loginForm.value);
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      account: [null, [Validators.required]],
      userName: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,20}$/)]],
      password: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,12}$/)]],
      remember: [false],
    }, { updateOn: 'blur' });

    this.subscribeToFormChanges();
  }

}
