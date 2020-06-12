import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private isDelivery = false;
  private token: string;
  private tokenTimer: any;
  private userId : string;
  //name
  private name: string ;

  //role
  private role: string;
  private email: string;

  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  // get the name

  getName() {
    return this.name;
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  getRole() {
    //console.log(localStorage.getItem('role'));
    return localStorage.getItem('role');
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getIsDelivery() {
    return this.isDelivery;
  }

  getUserId(){
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(name: string ,email: string, password: string, role: string) {
    const authData: AuthData = {name: name, email: email, password: password, role: role };
    return this.http.post("http://localhost:3000/api/user/signup", authData)
    .subscribe(() => {
      this.router.navigate(["/"]);
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  login( name: string , email: string, password: string, role: string) {
    const authData: AuthData = { name: name, email: email, password: password, role: role };
    this.http
      .post<{ token: string; expiresIn: number , userId:string , name: string, role: string, email: string }>(
        "http://localhost:3000/api/user/login",
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          //response
          this.name = response.name ;
          this.role = response.role;
          this.email = response.email;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          //console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.userId, this.name, this.role, this.email);
          if (localStorage.getItem('role') === 'delivery') {
            this.isDelivery = true;
            this.router.navigate(["/delivery"]);
          }
            else if (localStorage.getItem('role') === 'customer'){
              this.router.navigate(["/listbook"]);
            }
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const role = localStorage.getItem('role');
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      if (role === 'delivery') {
        this.isDelivery = true;
      }
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      //
      this.name= authInformation.name ;
      this.role = authInformation.role ;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.isDelivery = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId=null ;
    //
    this.name = null ;
    this.role = null;
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    //console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, name: string, role: string, email: string ) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("name", name);
    localStorage.setItem('role', role);
    localStorage.setItem('email', email);

  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem('role');

  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem('role');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId : userId,
      name: name,
      role: role,
    }
  }
}
