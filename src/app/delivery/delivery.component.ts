import { Component, OnInit } from '@angular/core';
import {DeliveriesModel} from '../models/deliveries-list.model';
import {MinimalPathModel, StoreLocationModel} from '../models/minimal-path.model';
import {OrdersService} from '../services/orders.service';
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  deliveriesList$ : DeliveriesModel[] = [];
  minimalPath$ : MinimalPathModel[] = [];
  lat = 33.8095022;
  lng = 5.0664254;
  array =[];
  origin = {};
  destination = {};
  waypoints = [];
  model: NgbDateStruct;
  date :string = "";
  ori = {};


  constructor(private ordersService : OrdersService, private calendar: NgbCalendar,) { }

  onDateSelect(event) {
    const month = event.month.toString().padStart(2, "0");
    const day = event.day.toString().padStart(2, "0");
    const year = event.year;
    const date = `${day}/${month}/${year}`;


    this.ordersService.getStoreLocation().subscribe((response : StoreLocationModel[]) =>{
      this.origin = response[0];
      this.destination  = response[0];
      }
    );

    this.ordersService.getDeliveries({"Day": date })
    .subscribe((res : DeliveriesModel[]) =>{
      this.deliveriesList$ = res;
      ///console.log(res);
      ;})

    this.ordersService.getMinimalPath({"Day": date }).
      subscribe((response : MinimalPathModel[]) =>{
        this.minimalPath$ = response;
        console.log(response);
        this.waypoints  = this.minimalPath$;
        //console.log(this.minimalPath$);
        this.ordersService.getDeliveries({"Day": date })
    .subscribe((res : DeliveriesModel[]) =>{
      this.deliveriesList$ = res;
      });
        }
      );
      }
  ngOnInit(): void {
    this.model = this.calendar.getToday();
  };

}
