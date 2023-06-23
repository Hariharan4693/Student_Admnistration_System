import { Component, ViewChild, ViewContainerRef,OnInit, ElementRef} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Validators, FormBuilder} from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';
import {  Data, Router } from '@angular/router';
import { switchAll } from 'rxjs';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  Email: any;
  balref  : any ;
  displayedColumns: string[] = ['Personal','Regno', 'Department','City', 'Date', 'Actions'];   //Table colums Assigned
  reloadFlag = localStorage.getItem('reloadFlag');

  public employeeFormGroup = this.fb.group({   //Getting Form Inputs
    'employee_name': ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    '_id': [],
    '_rev': [],
    'rollno': ['',Validators.required],
    'phone': ['',[Validators.required, Validators.pattern(/^[0-9]{10,10}$/)]],
    'dept': ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    'city': ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    'date': ['',Validators.required],
    
    registerno: [],
    phoneno: [],
    department: [],
    location: []
  
  });

  containerRef!: ViewContainerRef;
  @ViewChild(MatSidenav)

  sidenav!: MatSidenav;
  formGroup: any;
  
  constructor( private fb: FormBuilder,
    private elementRef: ElementRef,
    public service:ServiceService,
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
  printx(){
    localStorage.setItem('reloadFlag', "")
  }


  
  
  saveAction() : void{                                //Save and update Function.

   
    if (!this.employeeFormGroup.valid ) {
      Swal.fire('Please Check All the Fields are Filled!', '', 'warning')
    }else{
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

      this.resetAction();
      Swal.fire('Saved Successfully' ,'' ,'success'); 
      this.router.navigateByUrl('/read');
    } 
 
    
  }

  fetchAction() :void{                                        //Read Function.
    this.service.searchDocument('object_name:staff_name')
    
  }


  editAction(employeeObject: any ) {                           //Edit Function ., Trigger For Update.
    this.employeeFormGroup.patchValue(employeeObject);
  }

  deleteAction(employeeObject: any):void {
    this.service.deleteDocument(employeeObject['_id'], employeeObject['_rev']);
    this.fetchAction();
  }

  resetAction(): void {
    this.employeeFormGroup.reset()
    this.employeeFormGroup.markAsUntouched()
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
    this.service.employees.forEach(element => {
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
