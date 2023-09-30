import { Component, OnInit } from '@angular/core';
import { EnumObject } from './models/enum-object';
import { CrudService } from './services/crud.service';
import { EnumsService } from './services/enums.service';

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

    public addNewEnum(): void {
        var newEnum = this.savedEnums.find(item => item.key === "New Enum");

        if (newEnum) {
            this.selectedEnum = newEnum;
        }
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

        if (this.savedEnums.length == 1 && this.savedEnums[0].key == "New Enum") {
            // No saved enum. Create a sample one
            var sampleEnum: EnumObject = {
                key: "Sample Enum",
                value: "None         = 0,\nHasTV        = 1,\nHasMicrowave = 2,\nHasOven      = 4,\nHasFridge    = 8,"
            }

            this.savedEnums.push(sampleEnum);

            this.selectedEnum = this.savedEnums[1];
        }
    }
}
