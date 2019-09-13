import { Component } from '@angular/core';
import { CommonService } from './feedback-common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'feedback-web';
  constructor(private commonService: CommonService) {
  }

  callTostr(type) {
    if (type == 1) {
      this.commonService.infoSnackBar('Info called');
    } else if (type == 2) {
      this.commonService.errorSnackBar('Error called');
    } else if (type == 3) {
      this.commonService.warningSnackBar('Warning called');
    } else if (type == 4) {
      this.commonService.successSnackBar('Success called');
    } else if (type == 5) {
      this.commonService.defaultSnackBar('Default called');
    }

  }

}
