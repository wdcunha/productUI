import {Component, OnInit} from '@angular/core';
import {Product} from './models/product';
import {ProductService} from './services/product.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  product = {} as Product;
  products: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  // define se um produto será criado ou atualizado
  saveProduct(form: NgForm) {
    if (this.product.id !== undefined) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.productService.saveProduct(this.product).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // copia o produto para ser enviado ao carrinho.
  addToCart(product: Product) {
    this.productService.addToCart(product).subscribe(x => console.log(x));
  }

  // Chama o serviço para obter todos os produto
  getProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  // deleta um produto
  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe(() => {
      this.getProducts();
    });
  }

  // copia o produto para ser editado
  editProduct(product: Product) {
    this.product = { ...product };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getProducts();
    form.resetForm();
    this.product = {} as Product;
  }
}
