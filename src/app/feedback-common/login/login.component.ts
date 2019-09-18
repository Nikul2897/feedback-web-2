import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
    password: string;
    constructor(
      private router :Router,
   private matIconRegistry: MatIconRegistry,
   private domSanitizer: DomSanitizer

 ) {
   this.matIconRegistry.addSvgIcon(
     "lock",      
     this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/locked.svg")      
     );
     this.matIconRegistry.addSvgIcon(      
    "user",
    this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/user.svg")      
     );

   // using service to register custom icon
   // this.customIconService.init();
 }
    public login(email: string, password: string) {
        this.router.navigate(['register'], { replaceUrl: true });
    }

  ngOnInit() {
  }
}
