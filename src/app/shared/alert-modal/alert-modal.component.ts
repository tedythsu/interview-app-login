import { Component } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {
  title: string = '';
  content: string = '';
  isVisible: boolean = false;

  showModal(title: string, content: string): void {
    this.isVisible = true;
    this.title = title;
    this.content = content;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
