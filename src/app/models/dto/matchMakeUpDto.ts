import { CompanyDto } from "./companyDto";
import { ProductDto } from "./productDto";

export class MatchMakeUpDto{
    companies:CompanyDto[]
    images:string[]
    details:ProductDto[]
}