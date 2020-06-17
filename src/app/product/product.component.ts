import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../models/dto/productDto';
import {ButtonModule} from 'primeng/button';
import { ProductService } from '../services/product.service';
import { NavigationExtras, Route, Router } from '@angular/router';
import {TableModule} from 'primeng/table';
import{DataTableModule} from 'primeng/primeng'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
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