import { Component } from '@angular/core';

export interface ModalDetail {
  title: string;
  content: string;
  buttons: {
    text: string;
    type: string;
    url: string;
  }[]
}

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {

  modalVisible: boolean = false;
  title: string = '';
  content: string = '';
  buttons: ModalDetail['buttons'] = [];

  constructor() {}

  showModal(title: string, content: string, buttons: ModalDetail['buttons']): void {
    this.modalVisible = true;
    this.title = title;
    this.content = content;
    this.buttons = buttons;
  }

  onCancelClick(): void {
    this.modalVisible = false;
  }

}
