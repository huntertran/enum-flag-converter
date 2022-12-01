import { CrudService } from './../../services/crud.service';
import { EnumsService } from '../../services/enums.service';
import { Component, Input, OnInit } from '@angular/core';
import { EnumObject } from 'src/app/models/enum-object';

@Component({
    selector: 'number-to-enums',
    templateUrl: './number-to-enums.component.html',
    styleUrls: ['./number-to-enums.component.scss']
})
export class NumberToEnumsComponent {

    @Input() public selectedEnum!: EnumObject;
    public numberAsEnum: number = 0;
    public convertedResult: string = '';

    constructor(private enumsService: EnumsService) { }

    public convert(): void {
        this.enumsService.parseFromEnumObject(this.selectedEnum);
        this.convertedResult = this.enumsService.convertFlagsToString(this.numberAsEnum);
    }
}
