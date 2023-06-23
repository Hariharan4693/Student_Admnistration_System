import { Component, ViewChild, ViewContainerRef,OnInit, ElementRef} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Validators, FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';
import {  Data, Router } from '@angular/router';
import { switchAll } from 'rxjs';
import { ServiceService } from 'src/app/service/service.service';
import { MarksService } from '../marks.service';
@Component({
  selector: 'app-cmarks',
  templateUrl: './cmarks.component.html',
  styleUrls: ['./cmarks.component.css']
})
export class CmarksComponent implements OnInit {

  Email: any;
  balref  : any ;
  displayedColumns: string[] = ['Personal','Regno','Department', 'Android','CG','Python','QA','NME','Date', 'Actions'];   //Table colums Assigned
  reloadFlag = localStorage.getItem('reloadFlag');

  public employeeFormGroup = this.fb.group({   
    'employee_nme': ['',Validators.required],
    '_id': [],
    '_rev': [],
    'regno': ['',Validators.required],
    'Dept': ['',Validators.required],
    'android': ['',Validators.required],
    'cg': ['',Validators.required],
    'python': ['',Validators.required],
    'qa': ['',Validators.required],
    'nme': ['',Validators.required],
    'Date': ['',Validators.required],
    
    
    profit: [],
    finalamt: [],
    balanceMonth: [],
    amtPerMonth: [],
    
  });

  containerRef!: ViewContainerRef;
  @ViewChild(MatSidenav)

  sidenav!: MatSidenav;
  formGroup: any;
  
  constructor( private fb: FormBuilder,
    private elementRef: ElementRef,
    public service:MarksService,
    private router: Router
    )
  { }  

  ngOnInit(): void {  
    if (!this.reloadFlag) {
      localStorage.setItem('reloadFlag', 'true');
      location.reload();
    }

    if( localStorage.getItem('email') == null){
      Swal.fire('UnAuthorized User', '', 'warning')
      this.router.navigateByUrl('/');
    }
      this.fetchAction()
    this.Email = localStorage.getItem('email');      //Get user Mail id from Login page using user service
   
  } 
  fetchAction() :void{                                        //Read Function.
    this.service.searchDocument('object_name:staff_name')
    
  }
 
  printx(){
    localStorage.setItem('reloadFlag', "")
  }

  
  saveAction() : void{                                //Save and update Function.

   
    if (!this.employeeFormGroup.valid ) {
      Swal.fire('Please Check All the Fields are Filled!', '', 'warning')
    }else{
      let marksObject:any = this.employeeFormGroup.value;
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

      this.resetAction();
      Swal.fire('Saved Successfully' ,'' ,'success'); 
      this.router.navigateByUrl('/rmarks');
    } 
 
    
  }

  

  editAction(marksObject: any ) {                           //Edit Function ., Trigger For Update.
    this.employeeFormGroup.patchValue(marksObject);
  }

  deleteAction(marksObject: any):void {
    this.service.deleteDocument(marksObject['_id'], marksObject['_rev']);
    this.fetchAction();
  }

  resetAction(): void {
    this.employeeFormGroup.reset()
    this.employeeFormGroup.markAsUntouched()
  }  
      
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.service.dataSource2.filter = filterValue.trim().toLowerCase();
      
    if (this.service.dataSource2.paginator) {
      this.service.dataSource2.paginator.firstPage();

       this.service.dataSource2.filterPredicate = (data: Data, filter: string) => {
    const date = new Date(data['date']);
    const filterDate = new Date(filter);
    return date.getTime() === filterDate.getTime();
  };
  this.service.dataSource2.filter = filterValue;
    }
  }

  movecreate(create: string):void{
   this.sidenav.close();
   const element = this.elementRef.nativeElement.querySelector(`#${create}`);
   element.scrollIntoView({ behavior: 'smooth', block: 'start' });   
  }

  moveread(tableref: string){
   this.fetchAction();
   this.sidenav.close()
   const element = this.elementRef.nativeElement.querySelector(`#${tableref}`)
   element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onEdit(item : any) {
    this.service.marks.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }

  logout() {
    localStorage.removeItem('email');
    this.router.navigateByUrl('/');
    localStorage.setItem('reloadFlag', "")
  }
 
}
