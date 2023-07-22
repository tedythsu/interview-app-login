import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { FakeApiService } from 'src/app/shared/fake-api.service';

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

  @ViewChild(AlertModalComponent) private alert!: AlertModalComponent;

  loginForm!: UntypedFormGroup;
  accountVisible = false;
  userNameVisible = false;
  passwordVisible = false;
  mockData: any[] = [];

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

    if (userNameControl?.value !== "" && userNameControl?.value !== null && userNameControl?.invalid) {
      this.loginFormErrorTips.userName = "輸入長度不符合規則";
    } else {
      this.loginFormErrorTips.userName = "請輸入6-20碼英數符號";
    }

    if (passwordControl?.value !== "" && passwordControl?.value !== null && passwordControl?.invalid) {
      this.loginFormErrorTips.password = "輸入長度不符合規則";
    } else {
      this.loginFormErrorTips.password = "請輸入8-12碼英數符號";
    }
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      // console.log('submit', this.loginForm.value);

      let requestData = {
        "pi_CommonData": {
          "SystemID": "42",
          "LoginSystemID": "42"
        },
        "pi_Login_19_2": {
          "Acc": this.loginForm.get('account')?.value,
          "UserID": this.loginForm.get('userName')?.value,
          "UserID2": "",
          "Pw": this.loginForm.get('password')?.value,
          "DeviceID": "",
          "PushID": ""
        }
      }

      console.log('requestData:', requestData);
      this.getMockData();
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: UntypedFormBuilder, private fakeApiService: FakeApiService) { }

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
        this.alert.showModal('全面提升帳戶的使用安全', '自108年5月起，登入需輸入【使用者名稱】，請立即前往設定。若您已經設定過，可關閉並略過此提醒。');
        break;
      case 'accountReminder':
        this.alert.showModal('', '帳號為您的身分證字號。倘為外籍人士，請填寫投保時於要保書上填寫之號碼，例如：護照號碼/居留證號碼/當地的身分證字號...等');
        break;
      case 'userNameReminder':
        this.alert.showModal('全面提升帳戶的使用安全', '自108年5月起，登入安聯e網通需輸入【使用者名稱】，若您尚未設定，請至會員登入頁點選【我要設定使用者名稱】進行設定');
        break;
    }
  }

  getMockData(): void {
    this.fakeApiService.getMockData().subscribe(
      data => {
        this.mockData = data.po_Login_19_2;
        const returnCode = data.po_Login_19_2.ReturnCode;
        const title = data.po_Login_19_2.ReturnMessageTitle;
        const returnMessage = data.po_Login_19_2.ReturnMessage;

        if (returnCode === 0) {
          console.log('登入成功');
        } else if (returnCode === -11) {
          this.alert.showModal(title, returnMessage);
        } else if (returnCode === -14) {
          this.alert.showModal(title, returnMessage);
        } else {
          this.alert.showModal(title, returnMessage);
        }
      },
      error => {
        console.error('Error fetching mock data:', error);
      }
    );
    console.log(this.mockData);
  }
}
