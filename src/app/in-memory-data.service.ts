import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Product} from "./product";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const products = [
      {id: 11, model: 'MacBook Pro 11'},
      {id: 12, model: 'MacBook Pro 12'},
      {id: 13, model: 'MacBook Pro 13'},
      {id: 14, model: 'MacBook Pro 14'},
      {id: 15, model: 'MacBook Pro 15'},
      {id: 16, model: 'MacBook Pro 16'},
      {id: 17, model: 'MacBook Pro 17'},
      {id: 18, model: 'MacBook Pro 18'},
      {id: 19, model: 'MacBook Pro 19'},
      {id: 20, model: 'MacBook Pro 20'}
    ];
    return {products};
  }


  genId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 11;
  }

}
