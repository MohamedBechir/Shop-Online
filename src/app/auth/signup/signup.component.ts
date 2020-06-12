import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  errMsg = "";
  private authStatusSub: Subscription;

  constructor(public authService: AuthService, private router: Router
   ,          private formBuilder: FormBuilder) {}

   ngOnInit() {
     this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
       authStatus => {
         this.loading = false;
       }
     );
     this.registerForm = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$"),
          Validators.minLength(2),
          Validators.maxLength(255)
        ]
      ],
      email: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required]],
      role: ["", [Validators.required]]
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.createUser(this.registerForm.value.name, this.registerForm.value.email
      , this.registerForm.value.password, this.registerForm.value.role);
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}

