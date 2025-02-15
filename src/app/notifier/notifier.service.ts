import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { INotifier } from './notifier.interface';

@Injectable({
  providedIn: 'root'
})
export class NotifierService implements INotifier {

  private _snackBar = inject(MatSnackBar)

  showWarn(message: string) {
    this._snackBar.open(message, 'Ok', {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 1000 * 5
    })
  }

  showInfo(message: string): void {
    this._snackBar.open(message, undefined, {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 1000 * 3
    })
  }

  showError(message: string) {
    this._snackBar.open(message, 'Ok', {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 1000 * 5
    })
  }
}
