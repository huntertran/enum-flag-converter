import { EnumObject } from './models/enum-object';
import { Injectable } from '@angular/core';

export const SAVED_ENUMS: string = 'savedEnums';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

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

//    let newEnumObject: EnumObject = {
//      key: newEnum.key,
//      value: newEnum.value
//    }

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
