import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackbar : MatSnackBar) { }
  
  public open(message : string, className?: string, duration ?: number){
    if(duration === undefined){
      duration = 3000;
    }
    return this.snackbar.open(message,'',{
       duration: duration,
       panelClass: className
    });
  }
}
