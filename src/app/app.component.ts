import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  headerTitle = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setHeaderTitle(event.url);
      }
    });
  }

  private setHeaderTitle(url: string) {
    if (url === '/login') {
      this.headerTitle = '會員登入';
    } else if (url === '/change-username') {
      this.headerTitle = '設定使用者名稱';
    } else if (url === '/change-password') {
      this.headerTitle = '設定新密碼';
    } else if (url === '/forgot-username-or-password') {
      this.headerTitle = '忘記使用者名稱或密碼';
    } else {
      // Default Header Title
      this.headerTitle = '';
    }
  }


}
