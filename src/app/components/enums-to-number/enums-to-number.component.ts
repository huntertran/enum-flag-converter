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
