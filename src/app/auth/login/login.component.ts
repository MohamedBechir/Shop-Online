import {Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit, OnDestroy {


  loginForm : NgForm;
  isLoading = false;
  authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onLogin(form : NgForm){
      if (form.invalid){
        return;
      }
      this.isLoading=true;
      this.authService.login(form.value.name, form.value.email,
         form.value.password, this.authService.getRole());
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
