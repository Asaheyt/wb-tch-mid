import {Injectable} from '@angular/core';
import {Product} from "./product";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'api/products';

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }


  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(_ => this.log('fetched products')),
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>('getProduct id=${id}'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.productsUrl, product, this.httpOptions).pipe(
      tap(_ => this.log(`updated product id=${product.id}`)),
      catchError(this.handleError<any>('updatedProduct'))
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, this.httpOptions).pipe(
      tap((newProduct: Product) => this.log(`added product /w id=${newProduct.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  deleteProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deletedProduct'))
    );
  }


  searchProducts(term: string): Observable<Product[]> {
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Product[]>(`${this.productsUrl}/?model=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found products matching "${term}"`):
        this.log(`no products matching "${term}"`)),
      catchError(this.handleError<Product[]>('searchProducts', []))
    );
  }
}
