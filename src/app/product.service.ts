import {Injectable} from '@angular/core';
import {PRODUCTS} from "./mock-products";
import {Product} from "./product";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private messageService: MessageService
  ) {
  }

  getProducts(): Observable<Product[]> {
    const products = of(PRODUCTS)
    this.messageService.add('ProductService: fetched products');
    return products;
  }
}
