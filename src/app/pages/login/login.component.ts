import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertModalComponent, ButtonInfo } from 'src/app/shared/alert-modal/alert-modal.component';
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

    const modalDetail = {
      title: '',
      content: '',
      buttons: [] as ButtonInfo[]
    }

    switch (info) {
      case 'changeUserNameReminder':
        modalDetail.title = '全面提升帳戶的使用安全';
        modalDetail.content = '自108年5月起，登入需輸入【使用者名稱】，請立即前往設定。若您已經設定過，可關閉並略過此提醒。';
        modalDetail.buttons.push({ text: '關閉', type: 'default', url: '' });
        modalDetail.buttons.push({ text: '前往設定', type: 'primary', url: '/change-username' });
        break;
      case 'accountReminder':
        modalDetail.content = '帳號為您的身分證字號。倘為外籍人士，請填寫投保時於要保書上填寫之號碼，例如：護照號碼/居留證號碼/當地的身分證字號...等';
        modalDetail.buttons.push({ text: '關閉', type: 'primary', url: '' });
        break;
      case 'userNameReminder':
        modalDetail.title = '全面提升帳戶的使用安全';
        modalDetail.content = '自108年5月起，登入安聯e網通需輸入【使用者名稱】，若您尚未設定，請至會員登入頁點選【我要設定使用者名稱】進行設定';
        modalDetail.buttons.push({ text: '關閉', type: 'primary', url: '' });
        break;
    }
    this.alert.showModal(modalDetail.title, modalDetail.content, modalDetail.buttons);
  }

  getMockData(): void {
    this.fakeApiService.getMockData().subscribe(
      data => {
        this.mockData = data.po_Login_19_2;
        const returnCode = data.po_Login_19_2.ReturnCode;
        const title = data.po_Login_19_2.ReturnMessageTitle;
        const returnMessage = data.po_Login_19_2.ReturnMessage;

        const modalDetail = {
          title: '',
          content: '',
          buttons: [] as ButtonInfo[]
        }

        switch (returnCode) {
          case 0:
            console.log('登入成功');
            break;
          case -11:
            modalDetail.title = title;
            modalDetail.content = returnMessage;
            modalDetail.buttons.push({ text: '確認', type: 'primary', url: '/change-password' });
            break;
          case -14:
            modalDetail.title = title;
            modalDetail.content = returnMessage;
            modalDetail.buttons.push({ text: '下次再換', type: 'default', url: '' });
            modalDetail.buttons.push({ text: '密碼變更', type: 'primary', url: '/change-password' });
            break;
          default:
            modalDetail.title = title;
            modalDetail.content = returnMessage;
            modalDetail.buttons.push({ text: '確認', type: 'primary', url: '' });
        }

        this.alert.showModal(modalDetail.title, modalDetail.content, modalDetail.buttons);

      },
      error => {
        console.error('Error fetching mock data:', error);
      }
    );
    console.log(this.mockData);
  }
}
