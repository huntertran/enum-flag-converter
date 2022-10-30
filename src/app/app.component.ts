import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { SavedEnum } from './models/saved-enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'enum-flag-converter';
  public numberAsEnum: number = 0;
  public selectedSavedEnum: number = 0;
  public savedEnums: SavedEnum[] = [];

  constructor(private appService: AppService) { }

  public ngOnInit(): void {
    this.savedEnums = this.appService.getSavedEnums();
  }

  public saveEnumLocally(): void {
    console.log('saved');
  }
}
