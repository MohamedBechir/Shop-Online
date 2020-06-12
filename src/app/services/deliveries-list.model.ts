import { Product } from '../product/product.model';

export interface DeliveriesModel {
  user: User;
  }
  
  export interface User{
    products: Product;
    address: string;
    name: string;
    totalPrice: number
  }
  