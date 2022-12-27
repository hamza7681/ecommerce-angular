import { Component, OnInit } from '@angular/core';
import { Product } from '../data-types';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  updateMessage: string | undefined;
  productData: Product | undefined;
  constructor(
    private router: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    let productId = this.router.snapshot.paramMap.get('id');
    productId &&
      this.product.getProduct(productId).subscribe((res) => {
        this.productData = res;
      });
  }
  update(data: Product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((res) => {
      if (res) {
        this.updateMessage = 'Product updated successfully';
      }
    });
    setTimeout(() => (this.updateMessage = undefined), 3000);
  }
}
