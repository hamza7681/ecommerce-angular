import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  constructor(private product: ProductService) {}

  add = (data: Product) => {
    this.product.addProduct(data).subscribe((res) => {
      if (res) {
        this.addProductMessage = 'Product Added Successfully';
      }
      setTimeout(() => (this.addProductMessage = undefined), 3000);
    });
  };
}
 