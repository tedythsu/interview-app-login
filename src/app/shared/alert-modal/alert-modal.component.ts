import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface ButtonInfo {
  text: string;
  type: string;
  url: string;
}

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {
  title: string = '';
  content: string = '';
  isVisible: boolean = false;
  buttons: ButtonInfo[] = [];

  constructor(private router: Router) {}

  showModal(title: string, content: string, buttons: ButtonInfo[]): void {
    this.isVisible = true;
    this.title = title;
    this.content = content;
    this.buttons = buttons;
  }

  handleOk(): void {
    this.isVisible = false;
    this.router.navigateByUrl('/change-username');
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
