import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login.component';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [LoginRoutingModule, NzFormModule, NzInputModule, NzButtonModule, ReactiveFormsModule, NzCheckboxModule, NzIconModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
