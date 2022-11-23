import {Component, OnInit} from '@angular/core';
import {EnumObject} from './models/enum-object';
import {CrudService} from './services/crud.service';
import {EnumsService} from './services/enums.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'enum-flag-converter';
    public selectedEnum!: EnumObject;
    public savedEnums: EnumObject[] = [];

    constructor(
        private crudService: CrudService,
        private enumsService: EnumsService) {
    }

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

    private initializeEnumList(): void {
        this.selectedEnum = {
            key: '',
            value: ''
        };

        this.savedEnums = this.crudService.getSavedEnums();
    }
}
