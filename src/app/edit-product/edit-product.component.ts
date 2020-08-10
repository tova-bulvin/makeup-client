import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../models/dto/productDto';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CompanyDto } from '../models/dto/companyDto';
import { CompanyService } from '../services/company.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: ProductDto
  status: boolean
  form = new FormGroup({

    id: new FormControl(""),
    company: new FormControl("", [Validators.required]),
    codeInCompany: new FormControl("", [Validators.required]),
    r: new FormControl("", [Validators.required,Validators.max(255),Validators.min(0),Validators.maxLength(3)]),
    g: new FormControl("", [Validators.required,Validators.max(255),Validators.min(0),Validators.maxLength(3)]),
    b: new FormControl("", [Validators.required,Validators.max(255),Validators.min(0),Validators.maxLength(3)]),
    price: new FormControl("", [Validators.required,Validators.min(0)]),
    description: new FormControl("", [Validators.maxLength(50)]),

  })

  listCompanies: CompanyDto[];
  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService, private companyService: CompanyService) {
    this.product = new ProductDto()
    this.status = true
    
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.form.controls.id.setValue(params["id"]);
      if (params["company"])
        this.form.controls.company.setValue( JSON.parse(params["company"]));
      this.form.controls.codeInCompany.setValue(params["codeInCompany"]);
      this.form.controls.r.setValue(params["r"]);
      this.form.controls.g.setValue (params["g"]);
      this.form.controls.b.setValue ( params["b"]);
      this.form.controls.price.setValue( params["price"]);
      this.form.controls.description.setValue (params["description"]);

    });
    if (this.form.controls.id.value>0)
      this.status = false
      this.companyService.loadCompany().subscribe(
        (data: CompanyDto[]) => {
          this.listCompanies = data;
        },
        fail => alert("problem with load companies list"));
  }

  cancel() {
    this.router.navigateByUrl('/product')
  }
  saveProduct() {
    if (this.form.valid) {
      this.product.id = this.form.controls.id.value
      this.product.company = this.form.controls.company.value
      this.product.codeInCompany = this.form.controls.codeInCompany.value
      this.product.r = this.form.controls.r.value
      this.product.g = this.form.controls.g.value
      this.product.b = this.form.controls.b.value
      this.product.description = this.form.controls.description.value
      this.product.price = this.form.controls.price.value

      if (this.status) {
        this.productService.addProduct(this.product).subscribe(
          fail => this.router.navigateByUrl("/product"))
      }
      else {
        this.productService.updateProduct(this.product).subscribe(
          fail => this.router.navigateByUrl("/product"))
      }
    }
    else
      alert("the form is not valid, fix it and try again")
  }
}
