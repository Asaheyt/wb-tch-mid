import {Component, OnInit} from '@angular/core';
import {Product} from "../product";
import {ProductService} from "../product.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  selectedProduct?: Product;

  onSelect(product: Product): void {
    this.selectedProduct = product;
    this.messageService.add('ProductComponent: Selected product id=${product.id}');
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products)
  }

}
