import { EnumObject } from './models/enum-object';
import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'enum-flag-converter';
  public numberAsEnum: number = 0;
  public selectedEnum!: EnumObject;
  public savedEnums: EnumObject[] = [];

  constructor(private appService: AppService) { }

  public ngOnInit(): void {
    this.selectedEnum = {
      key: '',
      value: ''
    };
    this.savedEnums = this.appService.getSavedEnums();
    console.log(this.savedEnums);
  }

  public saveEnumLocally(): void {
    if (this.selectedEnum) {
      this.appService.saveNewEnum(this.selectedEnum);
    }
  }

  public savedEnumSelectionChanged($event: MatSelectChange): void {
    this.selectedEnum = $event.value;
  }
}
