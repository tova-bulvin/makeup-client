import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../models/dto/productDto';
import { ProductService } from '../services/product.service';
import { NavigationExtras, Route, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  cols:any[];
  listProducts:ProductDto[]
  
  constructor(private router: Router,private productService:ProductService) { 
  }

  ngOnInit() {
   
    this.productService.loadProduct().subscribe(
      (data: ProductDto[]) => {
        this.listProducts = data; 
      },
      fail => alert("problem with load product list"));
  }
  
  deleteProduct(productId){
    this.productService.deleteProduct(productId).subscribe(
      (data:any) => {
        this.ngOnInit()
      },
      fail => this.ngOnInit()
  )};

  back(){
    this.router.navigateByUrl('/admin-main')
  }

  public edit(product) {
    let navigationExtras: NavigationExtras = {
        queryParams: {
            "id":product.id,
            "codeInCompany": product.codeInCompany,
            "company": JSON.stringify({
              "id": product.company.id,
              "name": product.company.name
          }),
            "r":product.r,
            "g":product.g,
            "b":product.b,
            "price":product.price,
            "description":product.description
        }
    };
    
    this.router.navigate(["edit-product"], navigationExtras);
}
}
