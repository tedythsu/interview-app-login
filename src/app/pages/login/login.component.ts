import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

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

  @ViewChild(AlertModalComponent) private alertModalComponent!: AlertModalComponent;

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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showAlertModal('changeUserNameReminder');
    }, 0);
  }

  showAlertModal(info: string) {
    switch (info) {
      case 'changeUserNameReminder':
        this.alertModalComponent.showModal('全面提升帳戶的使用安全', '自108年5月起，登入需輸入【使用者名稱】，請立即前往設定。若您已經設定過，可關閉並略過此提醒。');
        break;
      case 'accountReminder':
        this.alertModalComponent.showModal('', '帳號為您的身分證字號。倘為外籍人士，請填寫投保時於要保書上填寫之號碼，例如：護照號碼/居留證號碼/當地的身分證字號...等');
        break;
      case 'userNameReminder':
        this.alertModalComponent.showModal('全面提升帳戶的使用安全', '自108年5月起，登入安聯e網通需輸入【使用者名稱】，若您尚未設定，請至會員登入頁點選【我要設定使用者名稱】進行設定');
        break;
    }
  }
}
