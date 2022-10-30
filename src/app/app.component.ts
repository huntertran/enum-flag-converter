import { EnumObject } from './models/enum-object';
import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'enum-flag-converter';
  public numberAsEnum: number = 0;
  public selectedSavedEnumKey: string = '';
  public selectedSavedEnumValue: string = '';
  public savedEnums: EnumObject[] = [];

  constructor(private appService: AppService) { }

  public ngOnInit(): void {
    this.savedEnums = this.appService.getSavedEnums();
    console.log(this.savedEnums);
  }

  public saveEnumLocally(): void {
    this.appService.saveNewEnum(this.selectedSavedEnumKey, this.selectedSavedEnumValue);
  }
}
