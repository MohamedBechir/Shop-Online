import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule, } from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';





import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';;
import { HomeComponent } from './home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { DeliveryComponent } from './delivery/delivery.component';
import {MatSelectModule} from '@angular/material/select';
import { CartComponent } from './cart/cart.component';
import { BookCreateComponent } from './books/book-create/book-create.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { OrderComponent } from './order/order.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ErrorInterceptor } from './error-interceptor';
import {MatDialogModule} from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';
import { HeaderdeliveryComponent } from './header-delivery/header-delivery.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DeliveryComponent,
    CartComponent,
    BookCreateComponent,
    BookListComponent,
    OrderComponent,
    ErrorComponent,
    HeaderdeliveryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // materials
    BrowserAnimationsModule,
    MatGridListModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatDatepickerModule,
    MatPaginatorModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    LayoutModule,
    NgbModule,
    FontAwesomeModule,
    AgmCoreModule.forRoot(
      {
        apiKey: 'AIzaSyC4U_krAQ-l6tRS2UbZt24Aj2Vu93BiO6g'
      }
    ),
    AgmDirectionModule,
  ],

  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
