import { Injectable } from '@angular/core';
import { BaseApiService } from "../shared";
import { BaseHttpService } from "../shared/services";
import { CompanyDto } from '../models/dto/companyDto';
import { MatchMakeUpDto } from '../models/dto/MatchMakeUpDto';
import { Observable } from 'rxjs/Observable';
import { RequestOptions, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomerService extends BaseApiService{

  
  id:number
  constructor(private baseHttpService:BaseHttpService,private _http:HttpClient) { 
    super('MatchingMakeUp')
  }

  Upload(frmData: FormData,filename:string,companiesName:string){
    let url = this.actionUrl('MatchRGB');
    return this._http.post(url+"?filename="+filename+"&companiesName="+companiesName,frmData);
   // return this.baseHttpService.post(url, frmData)
  }
  try(formData: FormData,type: string, name:string){
    let url = this.actionUrl('UploadFiles');  
    this.baseHttpService.post(url+"?filetype="+type+"&filename="+name,formData)  
    .catch(error => Observable.throw(error))  
    .subscribe(    
        data => console.log('success'),  
        error => console.log(error) )  
    }

  mainProcess(matchMakeUpDto: MatchMakeUpDto): Observable<MatchMakeUpDto> {
    let url = this.actionUrl('Post');
    return this.baseHttpService.post<MatchMakeUpDto>(url,matchMakeUpDto);
  
 }

 sendMail(mail:string,massege:string): Observable<void> {
   
    let url = this.actionUrl('Get');
    let params: URLSearchParams = new URLSearchParams();
    params.set('mail', mail);
    params.set('massege', massege);
    return this.baseHttpService.get<void>(url,params);

  }
}
