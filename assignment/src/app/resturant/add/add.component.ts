import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RestaurantService } from '../../restaurant.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  data:any;
  serverError: any;
  constructor(public fb: FormBuilder, public _router: Router, public __restaurant:RestaurantService, public toastr: ToastrService) { }

  ngOnInit() {
  }

	addForm = this.fb.group({
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		guest: ['', Validators.required],
		checkIn: ['', Validators.required]
	});
	onSubmit(){
		console.log(this.firstName.value)
      	let formData = {
      		"firstName":this.addForm.get('firstName').value,
      		'lastName':this.addForm.get('lastName').value,
      		'guest':this.addForm.get('guest').value,
      		'checkIn':this.addForm.get('checkIn').value
      	}
      	this.__restaurant.saveRecord(formData)
      	.subscribe(response=>{
      		console.log(response)
      		this.toastr.success('Record added successfully', 'Success!');
	 		this._router.navigate(['']);
      	},
      	err=>{
      		if( err instanceof HttpErrorResponse ) {
	            if (err.status === 409) {
	              this.serverError = err.error.message
	              this.toastr.error(this.serverError);
	            }
	            if (err.status === 500) {
	            	console.log(err)
	              this.serverError = err.error.error;
	              this.toastr.error(err.error.error);
	            }
	        }
      	})
	}

 	get firstName() { return this.addForm.get('firstName'); }
	get lastName() { return this.addForm.get('lastName'); }
	get guest() { return this.addForm.get('guest'); }
	get checkIn() { return this.addForm.get('checkIn'); }
}
