import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://productbk:8071/products';
  urlAddToCart = 'http://productbk:8071/product-rabbitmq/producer';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Obtem todos os produtos
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Obtem um produto pelo id
  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.url + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  // adiciona ao carrinho

  addToCart(product: Product[]) {
    return this.httpClient.post(this.urlAddToCart, JSON.stringify(product), this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  // salva um produto
  saveProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url, JSON.stringify(product), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // atualiza um produto
  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.url + '/' + product.id, JSON.stringify(product), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // deleta um produto
  deleteProduct(product: Product) {
    return this.httpClient.delete<Product>(this.url + '/' + product.id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
