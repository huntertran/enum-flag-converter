import { EnumObject } from './../models/enum-object';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {
  private flaggedEnum: Record<number, string> = {};

  constructor() { }

  public parseFromEnumObject(enumObject: EnumObject): void {
    let delimiter: string = ',';
    let splitted: string[] = enumObject.value.split(delimiter);
    splitted.forEach(flag => {
      let flagElements: string[] = flag.split('=');
      if (flagElements.length == 2) {
        let flagBit: number = Number.parseInt(flagElements[1].trim());
        let flagName: string = flagElements[0].trim();

        this.flaggedEnum[flagBit] = flagName;
      }
    });

    console.log(this.flaggedEnum);
  }
}
