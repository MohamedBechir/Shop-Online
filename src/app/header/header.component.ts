import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { faUserAlt, faLock, faSignOutAlt, faShoppingCart, faPlus,faBook
 } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  faUserAlt = faUserAlt;
  faLock = faLock;
  faSignOutAlt = faSignOutAlt;
  faShoppingCart = faShoppingCart;
  faPlus = faPlus;
  faBook = faBook;
  userIsAuthenticated = false ;
  private authListenerSubs: Subscription;
  userIsDelivery = false;

  constructor (private authService: AuthService){}


  ngOnInit(){
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.
    getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated ;
    });
    this.userIsDelivery = this.authService.getIsDelivery();
    this.authListenerSubs = this.authService.
    getAuthStatusListener()
    .subscribe(isDelivery => {
      this.userIsDelivery = isDelivery ;
    });

  }

  onLogout(){
    this.authService.logout();
  }


  ngOnDestroy(){

  }

}
