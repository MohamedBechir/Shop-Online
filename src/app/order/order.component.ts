import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {OrdersService} from '../services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  alert = false;

  constructor(private ordersService: OrdersService) { }

  OnConfirmOrder(form: NgForm) {
    //console.log("hello");

    if ( form.invalid) {
      return;
    }
    //console.log(form.value.day);
    //console.log(form.value.adress);

    this.ordersService.makeOrder(form.value.day, form.value.adress).subscribe((response: any) => {
      //console.log(response);
    });
    this.alert = true;
  }

}
