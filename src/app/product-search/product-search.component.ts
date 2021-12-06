import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Product} from "../product";
import {ProductService} from "../product.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  products$!: Observable<Product[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.products$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.productService.searchProducts(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
