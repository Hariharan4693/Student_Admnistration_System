import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {  Data, Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FeesService } from '../fees.service';

@Component({
  selector: 'app-rfees',
  templateUrl: './rfees.component.html',
  styleUrls: ['./rfees.component.css'],
  providers: [DatePipe],
})
export class RfeesComponent implements OnInit {
  Email: any;  
  balref  : any ;
  displayedColumns: string[] = ['Personal','Regno', 'Department','Mobile','Paid', 'Pending','Date', 'Actions'];   //Table colums Assigned
  reloadFlag = localStorage.getItem('reloadFlag');

  public feesFormGroup = this.fb.group({   //Getting Form Inputs
    employee_nam: [],
    '_id': [],
    '_rev': [],
    rolno: [],
    phn: [],
    depart: [],
    paidfees: [],
    balance:[],
    dates: [],
    
  });

  
  constructor(public service:FeesService,public router:Router,public fb:FormBuilder, private dialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchAction()
    this.Email = localStorage.getItem('email');   
  }
  fetchAction() :void{                                        //Read Function.
    this.service.searchDocument('object_name:jana')
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.service.dataSource3.filter = filterValue.trim().toLowerCase();
      
    if (this.service.dataSource3.paginator) {
      this.service.dataSource3.paginator.firstPage();

       this.service.dataSource3.filterPredicate = (data: Data, filter: string) => {
    const date = new Date(data['dates']);
    const filterDate = new Date(filter);
    return date.getTime() === filterDate.getTime();
  };
  this.service.dataSource3.filter = filterValue;
    }
  }
  printx(){
    localStorage.setItem('reloadFlag', "")
  }  
  logout() {
    localStorage.removeItem('email');
    this.router.navigateByUrl('/');
    localStorage.setItem('reloadFlag', "")
  }
  
  public saveAction() : void{                                //Save and update Function.

   
    if (!this.feesFormGroup.valid) {
      let feesObject:any = this.feesFormGroup.value;
      console.log(feesObject);   
      feesObject['object_name'] = 'jana' 

      if (feesObject['_id'] == null) {
        delete feesObject['_id']
      }

      if (feesObject['_rev'] == null) {
        delete feesObject['_rev']
      }     
   
      let bulkDocsArray = []
      bulkDocsArray.push(feesObject)
      this.service.updateDocument(bulkDocsArray)
    } 
   this.resetAction();
    Swal.fire('Saved Successfully' ,'' ,'success'); 
    
  }
  resetAction(): void {
    this.feesFormGroup.reset()
    this.feesFormGroup.markAsUntouched()
  }  
  editAction(feesObject: any ) {                           //Edit Function ., Trigger For Update.
    this.feesFormGroup.patchValue(feesObject);
  }
  onEdit(item : any) {
    this.service.fees.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }
  deleteAction(feesObject: any):void {
    this.service.deleteDocument(feesObject['_id'], feesObject['_rev']);
    this.fetchAction();    
  }
  
   
  }
