import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private defautDuration = 3;

  constructor(private snackBar: MatSnackBar) {}

  public showSnackBar(message: string, action: string, durationParam?: number) {
    this.snackBar.open(message, action, {
      duration:
        durationParam != null
          ? durationParam * 1000
          : this.defautDuration * 1000,
    });
  }
}
