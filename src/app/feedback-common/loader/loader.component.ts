import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../LoaderService';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private loaderService: LoaderService) { }
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    isLoading: Subject<boolean> = this.loaderService.isLoading;

  ngOnInit() {
  }

}
