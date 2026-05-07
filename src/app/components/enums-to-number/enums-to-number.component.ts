import { Component, Input, OnInit } from '@angular/core';
import { EnumsService } from "../../services/enums.service";
import { EnumFlag } from 'src/app/models/enum-flag';
import { EnumObject } from 'src/app/models/enum-object';

@Component({
    selector: 'enums-to-number',
    templateUrl: './enums-to-number.component.html',
    styleUrls: ['./enums-to-number.component.scss']
})
export class EnumsToNumberComponent implements OnInit {

    @Input() public selectedEnum!: EnumObject;
    public convertedResult: number = 0;
    public isWarning: boolean = false;

    public flags: EnumFlag[] = [];

    constructor(
        private enumsService: EnumsService
    ) { }

    ngOnInit() {
        this.enumsService.selectedEnumChangedEvent.subscribe((flags: EnumFlag[]) => {
            this.flags = this.enumsService.flaggedEnum;
        });
    }

    get activeFlags(): number {
        return this.flags.filter(f => f.isChecked && f.bit !== 0).length;
    }

    get totalFlags(): number {
        return this.flags.filter(f => f.bit !== 0).length;
    }

    get hexResult(): string {
        const n = Math.floor(this.convertedResult || 0);
        return '0x' + n.toString(16).toUpperCase().padStart(2, '0');
    }

    get binaryResult(): string {
        const n = Math.floor(this.convertedResult || 0);
        if (n === 0) return '0b0';
        return '0b' + n.toString(2);
    }

    getBitArray(): boolean[] {
        const n = Math.floor(this.convertedResult || 0);
        if (n <= 0) return Array(8).fill(false);
        const raw = n.toString(2).length;
        const len = Math.ceil(Math.max(8, raw) / 8) * 8;
        return Array.from({ length: len }, (_, i) => !!(n & (1 << (len - 1 - i))));
    }

    public onClearFlagsClick(): void {
        for (const flag of this.flags) {
            flag.isChecked = false;
        }
    }

    public onFlagChanged(): void {
        this.convertedResult = this.enumsService.convertFlagsToNumber(this.flags);
    }

    public convert(): void {
        var convertedFlags = this.enumsService.getFlagsFromNumber(this.convertedResult);
        // Clear all flags first
        for (const flag of this.flags) {
            flag.isChecked = false;
        }
        if (convertedFlags.length > 0) {
            this.isWarning = false;
            // Find matching flags and check them
            for (const convertedFlag of convertedFlags) {
                const matchingFlag = this.flags.find(f => f.name === convertedFlag.name);
                if (matchingFlag) {
                    matchingFlag.isChecked = true;
                }
            }
        }
        else {
            this.isWarning = true;
        }
    }
}
