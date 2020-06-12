import { Component, OnInit } from '@angular/core';
import {DeliveriesModel} from '../models/deliveries-list.model';
import { Observable } from 'rxjs';
import {OrdersService} from '../services/orders.service';

@Component({
  selector: 'app-deliveries-list',
  templateUrl: './deliveries-list.component.html',
  styleUrls: ['./deliveries-list.component.css']
})
export class DeliveriesListComponent implements OnInit {
  deliveriesList$ : DeliveriesModel[] = [];

  constructor(private ordersService : OrdersService) { }

  ngOnInit(): void {
        
  }

}
