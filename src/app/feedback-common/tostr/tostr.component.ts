import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tostr',
  templateUrl: './tostr.component.html',
  styleUrls: ['./tostr.component.css']
})
export class TostrComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<TostrComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  /**
   * Get icon for given snacktype
   */
  get getIcon() {
    switch (this.data.snackType) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'error';
    }
  }


  ngOnInit() {
  }

}
