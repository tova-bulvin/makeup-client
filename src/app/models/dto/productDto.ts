import { CompanyDto } from "./companyDto";

export class ProductDto{
    id:number;
    codeInCompany:string;
    r:number;
    g:number;
    b:number;
    price:number;
    description:string;
    company:CompanyDto;
}