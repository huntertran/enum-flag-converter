import { CrudService } from './../../services/crud.service';
import { EnumsService } from '../../services/enums.service';
import { EnumObject } from '../../models/enum-object';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'number-to-enums',
    templateUrl: './number-to-enums.component.html',
    styleUrls: ['./number-to-enums.component.scss']
})
export class NumberToEnumsComponent implements OnInit {

    public numberAsEnum: number = 0;
    public selectedEnum!: EnumObject;
    public savedEnums: EnumObject[] = [];

    public convertedResult: string = '';

    constructor(
        private crudService: CrudService,
        private enumsService: EnumsService) { }

    public ngOnInit(): void {
        this.initializeEnumList();
    }

    public saveEnumLocally(): void {
        if (this.selectedEnum) {
            let saveSuccess: boolean = this.crudService.saveNewEnum(this.selectedEnum);

            if (!saveSuccess) {
                this.crudService.updateEnum(this.selectedEnum);
            }

        }
    }

    public deleteSelectedEnum(): void {
        if (this.selectedEnum) {
            this.crudService.deleteSavedEnum(this.selectedEnum.key);
            this.initializeEnumList();
        }
    }

    public savedEnumSelectionChanged(): void {
        this.enumsService.parseFromEnumObject(this.selectedEnum);
    }

    public convert(): void {

        this.enumsService.parseFromEnumObject(this.selectedEnum);
        this.convertedResult = this.enumsService.convertFlagsToString(this.numberAsEnum);
    }

    private initializeEnumList(): void {
        this.selectedEnum = {
            key: '',
            value: ''
        };

        this.savedEnums = this.crudService.getSavedEnums();
    }

}
