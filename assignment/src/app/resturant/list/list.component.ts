import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RestaurantService } from '../../restaurant.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  data:any;
  serverError: any;
  listItems: any;
    public popoverTitle: string = 'Are you sure';
  public popoverMessage: string = 'You want to delete this category';
  constructor(public fb: FormBuilder, public __restaurant: RestaurantService, public toastr: ToastrService, public _router: Router) { }

  ngOnInit() { 
  	this.fetchData();
  } 
    fetchData() {
    this.__restaurant.getAllRecords()
    .subscribe(
      res => {
        this.listItems = res.result.data;
        console.log(this.listItems);
      },
      err => {  console.log(err)
                if( err instanceof HttpErrorResponse ) {
                  if (err.status === 409) {
                    this.serverError = err.error.message
                  }
                }
            }
    )
  }

  deleteRecord(id){
    console.log(id);
    this.__restaurant.deleteRecord(id).subscribe(
      res=> {
        this.toastr.success('Category Deleted Successfully', 'Success :)');
        this.fetchData();
      },
      err => {
        if (err.status === 500) {
          console.log(err)
          this.serverError = err.error
          this.toastr.error(err.error, '!Error');
        }else{
          this.toastr.error('Unknown error please check you input and try again', '!Error');
        }
      }
    )
  }

}
