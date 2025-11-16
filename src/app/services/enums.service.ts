import { EnumFlag } from './../models/enum-flag';
import { EnumObject } from './../models/enum-object';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EnumsService {

    public selectedEnumChangedEvent: EventEmitter<EnumFlag[]> = new EventEmitter<EnumFlag[]>();
    private _flaggedEnum: EnumFlag[] = [];

    constructor() {
    }

    public get flaggedEnum(): EnumFlag[] {
        return this._flaggedEnum;
    }

    public parseFromEnumObject(enumObject: EnumObject): void {
        // reset
        this._flaggedEnum = [];

        let delimiter: string = ',';
        let splitted: string[] = enumObject.value.split(delimiter);
        splitted.forEach(flag => {
            let flagElements: string[] = flag.split('=');
            if (flagElements.length == 2) {
                let flagBit: number;
                if (flagElements[1].indexOf("|") != -1) {
                    // Contains combined enum
                    flagBit = this.parseCombinedEnum(flagElements[1], this._flaggedEnum);
                } else {
                    flagBit = Number.parseInt(flagElements[1].trim());
                }

                let flagName: string = flagElements[0].trim();

                if (Number.isNaN(flagBit)) {
                    throw new Error("Empty enum Key!");
                }

                this._flaggedEnum.push(new EnumFlag(flagBit, flagName))
            }
        });

        this.selectedEnumChangedEvent.emit(this._flaggedEnum);
    }

    private parseCombinedEnum(combinedFlagBit: string, existingFlags: EnumFlag[]): number {
        let splittedFlags: string[] = combinedFlagBit.split("|");
        let convertedFlags: EnumFlag[] = [];

        for (const splittedFlag of splittedFlags) {
            let foundFlag: EnumFlag | undefined = existingFlags.find(flag => flag.name === splittedFlag.trim());
            if (foundFlag) {
                foundFlag.isChecked = true;
                convertedFlags.push(foundFlag);
            }
        }

        let result = this.convertFlagsToNumber(convertedFlags);

        // reset isCheck property
        for (const flag of convertedFlags) {
            flag.isChecked = false;
        }

        return result;
    }

    public convertFlagsToString(numberValue: number): string {
        let results: string[] = [];

        if (this._flaggedEnum.length == 0) {
            return '';
        }

        for (let flag of this._flaggedEnum) {
            if (flag.bit != 0 && (numberValue & flag.bit) == flag.bit) {
                // has the flag
                results.push(flag.name);
            }
        }

        return results.join(',\n');
    }

    public convertFlagsToNumber(flags: EnumFlag[]) {
        let result: number = 0;

        for (let flag of flags) {
            if (flag.isChecked) {
                result = result | flag.bit;
            }
        }

        return result;
    }

    public convertFlagNamesToNumber(flags: string[]) {
        let result = 0;

        for (let flag of this._flaggedEnum) {
            if (flags.includes(flag.name)) {
                result += flag.bit;
            }
        }

        return result;
    }
}
