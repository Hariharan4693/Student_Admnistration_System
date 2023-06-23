import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {  Data, Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MarksService } from '../marks.service';

@Component({
  selector: 'app-rmarks',
  templateUrl: './rmarks.component.html',
  styleUrls: ['./rmarks.component.css'],
  providers: [DatePipe],
})
export class RmarksComponent implements OnInit {
  Email: any;  
  balref  : any ;
  displayedColumns: string[] = ['Personal','Regno','Department', 'Android','CG','Python','QA','NME','Date', 'Actions'];   //Table colums Assigned
  reloadFlag = localStorage.getItem('reloadFlag');

  public marksFormGroup = this.fb.group({   //Getting Form Inputs
    'employee_nme': [],
    '_id': [],
    '_rev': [],
    'regno': [],
    'Dept': [],
    'android': [],
    'cg': [],
    'python': [],
    'qa': [],
    'nme': [],
    'Date': [],
    rollno: [],
    department: [],
    phoneno: [] ,
    Android:[],
    CG: [],
    Python:[],
    QA:[],
    NME:[]
  });

  
  constructor(public service:MarksService,
    public router:Router,public fb:FormBuilder, private dialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchAction()
    this.Email = localStorage.getItem('email');   
  }
  fetchAction() :void{                                        //Read Function.
    this.service.searchDocument('object_name:staff_name')
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.service.dataSource2.filter = filterValue.trim().toLowerCase();
      
    if (this.service.dataSource2.paginator) {
      this.service.dataSource2.paginator.firstPage();

       this.service.dataSource2.filterPredicate = (data: Data, filter: string) => {
    const date = new Date(data['Date']);
    const filterDate = new Date(filter);
    return date.getTime() === filterDate.getTime();
  };
  this.service.dataSource2.filter = filterValue;
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

   
    if (!this.marksFormGroup.valid) {
      let marksObject:any = this.marksFormGroup.value;
      console.log(marksObject);   
      marksObject['object_name'] = 'staff_name' 

      if (marksObject['_id'] == null) {
        delete marksObject['_id']
      }

      if (marksObject['_rev'] == null) {
        delete marksObject['_rev']
      }     
   
      let bulkDocsArray = []
      bulkDocsArray.push(marksObject)
      this.service.updateDocument(bulkDocsArray)
    } 
   this.resetAction();
    Swal.fire('Saved Successfully' ,'' ,'success'); 
    
  }
  resetAction(): void {
    this.marksFormGroup.reset()
    this.marksFormGroup.markAsUntouched()
  }  
  editAction(marksObject: any ) {                           //Edit Function ., Trigger For Update.
    this.marksFormGroup.patchValue(marksObject);
  }
  onEdit(item : any) {
    this.service.marks.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }
  deleteAction(marksObject: any):void {
    this.service.deleteDocument(marksObject['_id'], marksObject['_rev']);
    this.fetchAction();
  }
}