import {Component, OnInit} from '@angular/core';
import {EnumsService} from "../../services/enums.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'enums-to-number',
    templateUrl: './enums-to-number.component.html',
    styleUrls: ['./enums-to-number.component.scss']
})
export class EnumsToNumberComponent implements OnInit {

    public flagsFormGroup!: FormGroup;

    public convertedResult: number = 0;

    public get flagNames(): string[] {
        return Object.keys(this.flagsFormGroup.controls);
    }

    constructor(
        private enumsService: EnumsService
    ) {
    }

    ngOnInit(): void {
        this.initializeFlagsFormGroup();

        this.enumsService.selectedEnumChangedEvent.subscribe(() => {
            this.initializeFlagsFormGroup();
        });
    }

    public onClearFlagsClick(): void {
        this.flagsFormGroup.reset();
    }

    public initializeFlagsFormGroup(): void {
        const flagNames: string[] = this.enumsService.getFlagNamesFromFlaggedEnum();
        this.flagsFormGroup = new FormGroup({});
        flagNames.forEach((flagName: string) => {
            this.flagsFormGroup.addControl(flagName, new FormControl(false));
        });

        this.flagsFormGroup.valueChanges.subscribe(() => {
            this.convertedResult = this.enumsService.convertFlagNamesToNumber(
                this.flagNames.filter((flagName: string) => this.flagsFormGroup.controls[flagName].value == true)
            );
        });
    }
}
