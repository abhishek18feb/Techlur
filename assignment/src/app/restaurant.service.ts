import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
   serverUrl = 'http://localhost:3000/';
  constructor(public _http: HttpClient, private _router: Router) { }
  	getAllRecords(){
		return this._http.get<any>(this.serverUrl)
	}
  	saveRecord(formData){
  		console.log(formData) 
		const options = {
          headers: new HttpHeaders().append('Accept', 'application/json')
        }
		return this._http.post<any>(this.serverUrl, formData, options)
	}
	deleteRecord(id){ 
		return this._http.delete<any>(this.serverUrl+id)
	}

	getSingleRecord(id){
		console.log(id)
		return this._http.get<any>(this.serverUrl+id, { observe: 'response' })
	}
	updateRecord(formdata, id){
		const options = {
	              headers: new HttpHeaders().append('Accept', 'application/json').append('observe', 'response')
	            }
		return this._http.put<any>(this.serverUrl+id, formdata, options)
	}
}
