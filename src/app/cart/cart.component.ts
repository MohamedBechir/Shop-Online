import { Component, OnInit } from '@angular/core';
import {CartModel} from '../models/cart.model';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cardProducts$ : CartModel[] = [];
  alert = false;
  totalPrice : number = 0;
   isButtonVisible = false;
   isRowVisible = false;


  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getCartProducts().subscribe((res : CartModel[]) =>{
      this.cardProducts$ = res;
      for (const product of this.cardProducts$) {
        this.totalPrice = this.totalPrice + product.price;
      }
      //console.log("this is" + this.cardProducts$);
      ;})
  }

  onShowDelete() {
    this.isButtonVisible = true;
    this.isRowVisible = true;
  }

  onDelete(productId : any){
    this.cartService.deleteProduct(productId).subscribe((data: any) => {
    })
    for (const product of this.cardProducts$) {
      if (productId == product.id) {
        this.totalPrice = this.totalPrice - product.price;
      }
    }
    this.cartService.getCartProducts().subscribe((res : CartModel[]) =>{
      this.cardProducts$ = res;
    })
  }
}
