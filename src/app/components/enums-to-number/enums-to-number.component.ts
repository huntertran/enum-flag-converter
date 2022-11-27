import { Component, OnInit } from '@angular/core';
import { EnumsService } from "../../services/enums.service";
import { FormControl, FormGroup } from "@angular/forms";
import { EnumFlag } from 'src/app/models/enum-flag';

@Component({
    selector: 'enums-to-number',
    templateUrl: './enums-to-number.component.html',
    styleUrls: ['./enums-to-number.component.scss']
})
export class EnumsToNumberComponent {

    public convertedResult: number = 0;

    public get flags(): EnumFlag[] {
        return this.enumsService.flaggedEnum;
    }

    constructor(
        private enumsService: EnumsService
    ) { }

    public onClearFlagsClick(): void {
        for (const flag of this.flags) {
            flag.isChecked = false;
        }
    }

    public onFlagChanged(): void {
        this.convertedResult = this.enumsService.convertFlagsToNumber(this.flags);
    }
}
