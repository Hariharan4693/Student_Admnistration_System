import { Component, ViewChild, ViewContainerRef,OnInit, ElementRef} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Validators, FormBuilder} from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';
import {  Data, Router } from '@angular/router';
import { switchAll } from 'rxjs';
import { FeesService } from '../fees.service';

@Component({
  selector: 'app-cfees',
  templateUrl: './cfees.component.html',
  styleUrls: ['./cfees.component.css']
})
export class CfeesComponent implements OnInit {

  Email: any;
  balref  : any ;
  displayedColumns: string[] = ['Personal','Regno', 'Department','Mobile','Paid', 'Pending','Date', 'Actions'];   //Table colums Assigned
  reloadFlag = localStorage.getItem('reloadFlag');

  public feesFormGroup = this.fb.group({   //Getting Form Inputs
    'employee_nam': ['',Validators.required],
    '_id': [],
    '_rev': [],
    'rolno': ['',Validators.required],
    'phn': ['',Validators.required],
    'depart': ['',Validators.required],
    'paidfees': ['',Validators.required],
    'balance': ['',Validators.required],
    'dates': ['',Validators.required],
    
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
    public service:FeesService,
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

   
    if (!this.feesFormGroup.valid ) {
      Swal.fire('Please Check All the Fields are Filled!', '', 'warning')
    }else{
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

      this.resetAction();
      Swal.fire('Saved Successfully' ,'' ,'success'); 
      this.router.navigateByUrl('/rfees');
    } 
 
    
  }

  fetchAction() :void{                                        //Read Function.
    this.service.searchDocument('object_name:jana')
    
  }


  editAction(feesObject: any ) {                           //Edit Function ., Trigger For Update.
    this.feesFormGroup.patchValue(feesObject);
  }

  deleteAction(feesObject: any):void {
    this.service.deleteDocument(feesObject['_id'], feesObject['_rev']);
    this.fetchAction();
  }
  resetAction(): void {
    this.feesFormGroup.reset()
    this.feesFormGroup.markAsUntouched()
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
    this.service.fees.forEach(element => {
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
