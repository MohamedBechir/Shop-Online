import { Component, OnInit } from "@angular/core";
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
bla: string ;
name: any ;
role: string;
email: string;
userIsDelivery: boolean;
private authListenerSubs: Subscription;

constructor(private authService: AuthService){}
ngOnInit(){
  this.userIsDelivery = this.authService.getIsDelivery();
    this.authListenerSubs = this.authService.
    getAuthStatusListener()
    .subscribe(isDelivery => {
      this.userIsDelivery = isDelivery ;
    });
  this.bla = this.authService.getUserId();
  //console.log(this.bla);

  this.name = this.authService.getName();
 // console.log(this.name);

  this.role = this.authService.getRole();
  //console.log(this.role);

  this.email = this.authService.getEmail();
  //console.log(this.email);

}


}
