import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  hideSnackBar: boolean;
  constructor() { 
    this.hideSnackBar = false;
  }

  set setSnackBarStatus(data: boolean){
    this.hideSnackBar = data;
  }

  get getsnackBarStatus(){
    return this.hideSnackBar;
  }


}
