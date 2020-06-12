import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { DeliveryComponent } from "./delivery/delivery.component";
import { CartComponent } from "./cart/cart.component";
import { BookListComponent } from "./books/book-list/book-list.component";
import { BookCreateComponent } from "./books/book-create/book-create.component";
import { OrderComponent } from "./order/order.component";


const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'delivery', component: DeliveryComponent , canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'listbook', component: BookListComponent, canActivate: [AuthGuard]},
  {path: 'createbook', component: BookCreateComponent, canActivate: [AuthGuard]},
  { path: 'editbook/:bookId', component: BookCreateComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
