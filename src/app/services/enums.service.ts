import {EnumObject} from '../models/enum-object';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EnumsService {

    public selectedEnumChangedEvent: EventEmitter<any> = new EventEmitter<any>();
    private flaggedEnum: Map<number, string> = new Map();

    constructor() {
    }

    public parseFromEnumObject(enumObject: EnumObject): void {
        // reset the map
        this.flaggedEnum = new Map();

        let delimiter: string = ',';
        let splitted: string[] = enumObject.value.split(delimiter);
        splitted.forEach(flag => {
            let flagElements: string[] = flag.split('=');
            if (flagElements.length == 2) {
                let flagBit: number = Number.parseInt(flagElements[1].trim());
                let flagName: string = flagElements[0].trim();

                if (Number.isNaN(flagBit)) {
                    throw new Error("Empty enum Key!");
                }

                this.flaggedEnum.set(flagBit, flagName);
            }
        });

        this.selectedEnumChangedEvent.emit();
    }

    public convertFlagsToString(numberValue: number): string {
        let results: string[] = [];

        if (this.flaggedEnum.size == 0) {
            return '';
        }

        for (let [key, value] of this.flaggedEnum) {
            if (key != 0 && (numberValue & key) == key) {
                // has the flag
                results.push(value);
            }
        }

        return results.join(', ');
    }

    public getFlagNamesFromFlaggedEnum(): string[] {
        return [...this.flaggedEnum.values()];
    }

    public convertFlagNamesToNumber(flags: string[]) {
        let result = 0;

        for (let [key, value] of this.flaggedEnum) {
            if (flags.includes(value)) {
                result += key;
            }
        }

        return result;
    }
}
