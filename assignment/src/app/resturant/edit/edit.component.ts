import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RestaurantService } from '../../restaurant.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	data:any;
	serverError: any;
	constructor(public acroute: ActivatedRoute, public fb: FormBuilder, public _router: Router, public __restaurant:RestaurantService, public toastr: ToastrService) { }

	ngOnInit() {
		this.fetchData();
	}
	fetchData(){
	  	const id = this.acroute.snapshot.paramMap.get('id');
	  	console.log(id)
	  	this.__restaurant.getSingleRecord(id)
	  	.subscribe(response=>{
	  		console.log(response)
	  		this.data = response.body.result;

	  		this.editForm.patchValue({
	  			firstName: this.data.firstName,
	  			lastName: this.data.lastName,
	  			guest: this.data.guest,
	  			checkIn: this.data.checkIn
	  		})
	  	},
	  	err=>{

	  	})
	}

	onSubmit(){
		console.log(this.firstName.value)
      	let formData = {
      		"firstName":this.editForm.get('firstName').value,
      		'lastName':this.editForm.get('lastName').value,
      		'guest':this.editForm.get('guest').value,
      		'checkIn':this.editForm.get('checkIn').value
      	}
      	this.__restaurant.updateRecord(formData, this.data._id)
      	.subscribe(response=>{
      		console.log(response)
      		this.toastr.success('Record updated successfully', 'Success!');
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
	editForm = this.fb.group({
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		guest: ['', Validators.required],
		checkIn: ['', Validators.required]
	});
	get firstName() { return this.editForm.get('firstName'); }
	get lastName() { return this.editForm.get('lastName'); }
	get guest() { return this.editForm.get('guest'); }
	get checkIn() { return this.editForm.get('checkIn'); }
}
