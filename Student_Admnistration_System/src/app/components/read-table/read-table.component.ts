import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {  Data, Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-read-table',
  templateUrl: './read-table.component.html',
  styleUrls: ['./read-table.component.css'],
  providers: [DatePipe],
})
export class ReadTableComponent implements OnInit {
  Email: any;  
  balref  : any ;
  displayedColumns: string[] = ['Personal','Regno', 'Department','City', 'Date', 'Actions'];   //Table colums Assigned
  reloadFlag = localStorage.getItem('reloadFlag');

  public employeeFormGroup = this.fb.group({   //Getting Form Inputs
    employee_name: [],
    '_id': [],
    '_rev': [],
    rollno: [],
    phone: [],
    dept: [],
    city: [],
    date: [],
    regno: [],
    mobileno: [],
    department: [],
    location: []
  });

  
  constructor(public service:ServiceService,public router:Router,public fb:FormBuilder, private dialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchAction()
    this.Email = localStorage.getItem('email');   
  }
  fetchAction() :void{                                        //Read Function.
    this.service.searchDocument('object_name:staff_name')
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.service.dataSource.filter = filterValue.trim().toLowerCase();
      
    if (this.service.dataSource.paginator) {
      this.service.dataSource.paginator.firstPage();

       this.service.dataSource.filterPredicate = (data: Data, filter: string) => {
    const date = new Date(data['date']);
    const filterDate = new Date(filter);
    return date.getTime() === filterDate.getTime();
  };
  this.service.dataSource.filter = filterValue;
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

   
    if (this.employeeFormGroup.valid) {
      let employeeObject:any = this.employeeFormGroup.value;
      console.log(employeeObject);   
      employeeObject['object_name'] = 'staff_name' 

      if (employeeObject['_id'] == null) {
        delete employeeObject['_id']
      }

      if (employeeObject['_rev'] == null) {
        delete employeeObject['_rev']
      }     
   
      let bulkDocsArray = []
      bulkDocsArray.push(employeeObject)
      this.service.updateDocument(bulkDocsArray)
    } 
   this.resetAction();
    Swal.fire('Saved Successfully' ,'' ,'success'); 
    
  }
  resetAction(): void {
    this.employeeFormGroup.reset()
    this.employeeFormGroup.markAsUntouched()
  }  
  editAction(employeeObject: any ) {                           //Edit Function ., Trigger For Update.
    this.employeeFormGroup.patchValue(employeeObject);
  }
  onEdit(item : any) {
    this.service.employees.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }
  deleteAction(employeeObject: any):void {
    this.service.deleteDocument(employeeObject['_id'], employeeObject['_rev']);
    this.fetchAction();    
  }
  
   
  }
