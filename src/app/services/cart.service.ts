import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CartModel} from '../models/cart.model';
import {Observable, from} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts :Observable<CartModel[]>;
  message: any;
  readonly url = "http://localhost:3000/api/cart/";


  constructor(private http: HttpClient) { }

  getCartProducts(){
    //console.log(this.cartProducts = this.http.get<CartModel[]>(this.url +"getFromCart"));
    return this.cartProducts = this.http.get<CartModel[]>(this.url +"getFromCart");
  }

  deleteProduct(productId: any){
    return this.message = this.http.delete(this.url +"deleteFromCart/"+ productId);
  }
  
}
