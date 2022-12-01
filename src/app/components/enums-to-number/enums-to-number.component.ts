import { Component, OnInit } from '@angular/core';
import { EnumsService } from "../../services/enums.service";
import { EnumFlag } from 'src/app/models/enum-flag';

@Component({
    selector: 'enums-to-number',
    templateUrl: './enums-to-number.component.html',
    styleUrls: ['./enums-to-number.component.scss']
})
export class EnumsToNumberComponent implements OnInit {

    public convertedResult: number = 0;

    public flags: EnumFlag[] = [];

    constructor(
        private enumsService: EnumsService
    ) { }

    ngOnInit() {
        this.enumsService.selectedEnumChangedEvent.subscribe((flags: EnumFlag[]) => {
            this.flags = this.enumsService.flaggedEnum;
            this.convertedResult = 0;
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
}
