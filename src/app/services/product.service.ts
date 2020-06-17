
import { Injectable } from '@angular/core';
import { BaseApiService } from "../shared";
import { BaseHttpService } from "../shared/services";
import { CompanyDto } from '../models/dto/companyDto';
import { Observable } from 'rxjs/Observable';
import { ProductDto } from '../models/dto/productDto';


@Injectable()
export class ProductService extends BaseApiService{
 
  constructor(private baseHttpService:BaseHttpService) {
    super('Product')
   }

  loadProduct():  Observable<ProductDto[]> {
     let url = this.actionUrl('GetAll');
     return this.baseHttpService.get<ProductDto[]>(url);

  }

  deleteProduct(productId): Observable<ProductDto> {
    let url = this.actionUrl('Delete');
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', productId);
    return this.baseHttpService.delete<ProductDto>(url,params);

  }
  addProduct(product: ProductDto): Observable<ProductDto> {
    let url = this.actionUrl('Put');
    return this.baseHttpService.put<ProductDto>(url,product);
  }
  
  updateProduct(product: ProductDto): Observable<ProductDto> {
    let url = this.actionUrl('Post');
    return this.baseHttpService.post<ProductDto>(url,product);
  }

}

  
