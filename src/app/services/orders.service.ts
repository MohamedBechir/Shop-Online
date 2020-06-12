import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeliveriesModel} from '../models/deliveries-list.model';
import {MinimalPathModel, StoreLocationModel} from '../models/minimal-path.model';
import {Observable, from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  deliveries :Observable<DeliveriesModel[]>;
  minimalPath :Observable<MinimalPathModel[]>;
  storeLocation :Observable<StoreLocationModel[]>;
  message: any;

  readonly url = "http://localhost:3000/api/order/";
  constructor(private http: HttpClient) { }
 
  getDeliveries (date : any){
   return this.deliveries= this.http.post<DeliveriesModel[]>(this.url + "getOrdersByDay", date);
  }
  getMinimalPath(date : any){
    return this.minimalPath = this.http.post<MinimalPathModel[]>(this.url + "getminimalpath", date);
  }

  getStoreLocation(){
    return this.storeLocation = this.http.get<StoreLocationModel[]>(this.url + "getStoreLocation" + "");
  }
  makeOrder(Day: any, Address: any){
    return this.message = this.http.post(this.url + "makeOrder" ,{Day: Day, address: Address} );
  }
}
