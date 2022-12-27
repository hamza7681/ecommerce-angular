import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Cart, Product } from '../data-types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  productQuantity: number = 1;
  removeCart: boolean = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    let pid = this.activateRoute.snapshot.paramMap.get('pid');
    pid &&
      this.product.getProduct(pid).subscribe((res) => {
        this.productData = res;
        let cartData = localStorage.getItem('localCart');
        if (pid && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((item: Product) => pid === item.id.toString());
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
      });
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (
      this.productQuantity < 20 &&
      val === 'min' &&
      this.productQuantity > 1
    ) {
      this.productQuantity -= 1;
    }
  }
  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user)[0].id;
        let cartData: Cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((res) => {
          if (res) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }
  removeFromCart(id: number) {
    this.product.removeFromCart(id);
    this.removeCart = false;
  }
}
