import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { DocumentTypeService } from 'src/app/service/document-type.service';
import {DocumentType} from 'src/app/domain/document-type';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit{

  custId!:number;
  customer!:Customer;
  documentTypes:DocumentType[] = [];

  showMsg:boolean=true;
  messages:string[]=[""];

  constructor(public activatedRoute:ActivatedRoute,
              public customerService:CustomerService,
              public documentTypeService:DocumentTypeService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.custId = params['custId'];
      this.customerService.findById(this.custId).subscribe(data=>{
        this.customer=data;
      })
    });
    this.findAllDocumentType();
  }

  findAllDocumentType():void {
    this.documentTypeService.findAll().subscribe(data=>{
      this.documentTypes=data;
    });
  }

  update():void{
    this.messages=[""];
    this.customerService.update(this.customer).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="El customer se modifico con exito";
    },error=>{
      this.showMsg=true;
      this.messages=error.error.error;
    });
  }

  delete():void{
    this.messages=[""];
    this.customerService.delete(this.customer.custId).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="El customer se borro con exito";
    },error=>{
      this.showMsg=true;
      this.messages=error.error.error;
    });
  }

}
