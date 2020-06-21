
import { Injectable } from '@angular/core';
import { BaseApiService } from "../shared";
import { BaseHttpService } from "../shared/services";
import { CompanyDto } from '../models/dto/companyDto';
import { Observable } from 'rxjs/Observable';
import { ProductDto } from '../models/dto/productDto';


@Injectable()
export class CompanyService extends BaseApiService{
  
 
  constructor(private baseHttpService:BaseHttpService) {
    super('Company')
   }

 
  
  loadCompany(): Observable<CompanyDto[]> {
    let url = this.actionUrl('GetAll');
    return this.baseHttpService.get<CompanyDto[]>(url);
  }

  deleteCompany(companyId):  Observable<CompanyDto> {
    let url = this.actionUrl('Delete');
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', companyId);
    return this.baseHttpService.delete<CompanyDto>(url,params);
  }

  addCompany(company: CompanyDto): Observable<CompanyDto> {
    let url = this.actionUrl('Put');
    console.log(company)
    return this.baseHttpService.put<CompanyDto>(url,company)
  }
  
  updateCompany(company: CompanyDto): Observable<CompanyDto> {
    let url = this.actionUrl('Post');
    return this.baseHttpService.post<CompanyDto>(url,company);
    }
  }

  