import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  constructor() { }

  getMockData(): Observable<any> {
    const mockData = {
      "po_Login_19_2": {
        "ReturnCode": 0,
        "ReturnMessage": "",
        "ReturnMessageTitle": "",
        "TokenMP": "",
        "Token": "BA7F6963-442B-4AC1-A38A-EBEEC1B2516B",
        "Name": "曾 O 永",
        "Name_ImgBase64": "",
        "F1EmailAddress": "445905@test.com.tw",
        "F1Mobile": "0912345678",
        "SSLIsEffective": "",
        "Announce": [],
        "LastLoginSuccessDT": [],
        "LastLoginFailDT": [],
        "DeviceIsBoundByCurrentUser": ""
      }
    }

    return of(mockData).pipe(
      catchError(error => of([]))
    );
  }
}
