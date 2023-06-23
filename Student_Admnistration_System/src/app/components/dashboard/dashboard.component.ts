import { Component, ViewChild, ViewContainerRef,OnInit, ElementRef} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FormBuilder } from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';
import {  Data, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  Email: any;
  balref  : any ;
  displayedColumns: string[] = ['Persolnal Detail', 'Date','Due Date', 'Amount','Interest', 'Actions'];   //Table colums Assigned
  reloadFlag = localStorage.getItem('reloadFlag');

  public employeeFormGroup = this.fb.group({   //Getting Form Inputs
    'employee_name': [],
    '_id': [],
    '_rev': [],
    'address': [],
    'phone': [],
    'date': [],
    'duedate': [],
    amount: [],
    balance: [],
    profit: [],
    finalamt: [],
    balanceMonth: [],
    amtPerMonth: [],
    'interest': [] 
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
      
    this.Email = localStorage.getItem('email');      //Get user Mail id from Login page using user service
   
  }  
  logout() {
    localStorage.removeItem('email');
    this.router.navigateByUrl('/');
    localStorage.setItem('reloadFlag', "")
  }


}