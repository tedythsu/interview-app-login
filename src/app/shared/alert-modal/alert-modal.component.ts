import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {
  title: string = '';
  content: string = '';
  isVisible: boolean = false;

  constructor(private router: Router) {}

  showModal(title: string, content: string): void {
    this.isVisible = true;
    this.title = title;
    this.content = content;
  }

  handleOk(): void {
    this.isVisible = false;
    this.router.navigateByUrl('/change-username');
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
