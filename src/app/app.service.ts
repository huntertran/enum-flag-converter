import { EnumObject } from './models/enum-object';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const SAVED_ENUMS: string = 'savedEnums';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  public getSavedEnums(): EnumObject[] {
    let enums: EnumObject[] = this.parseSavedEnums();

    let newEnumObject: EnumObject = {
      key: 'New Enum',
      value: ''
    }

    enums.push(newEnumObject);

    return enums;
  }

  public saveNewEnum(newEnum: EnumObject): void {
    let enums: EnumObject[] = this.parseSavedEnums();

    if (enums.find((item: EnumObject) => item.key == newEnum.key)) {
      this._snackBar.open("Enum name is already existed. Please choose a new name!", "Close");
      return;
    }

    enums.push(newEnum);

    enums = enums.filter(item => item.key != '');

    localStorage.setItem(SAVED_ENUMS, JSON.stringify(enums));
  }

  public deleteSavedEnum(key: string): void {
    let enums: EnumObject[] = this.parseSavedEnums();

    enums = enums.filter(item => item.key != key && item.key != '');

    localStorage.setItem(SAVED_ENUMS, JSON.stringify(enums));
  }

  private parseSavedEnums(): EnumObject[] {
    let enums: EnumObject[] = [];
    let enumsString = localStorage.getItem(SAVED_ENUMS);

    if (enumsString != null) {
      enums = JSON.parse(enumsString);
    }

    return enums;
  }
}
