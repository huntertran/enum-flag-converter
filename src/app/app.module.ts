import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { NumberToEnumsComponent } from './components/number-to-enums/number-to-enums.component';
import { EnumsToNumberComponent } from './components/enums-to-number/enums-to-number.component';
import {MatLegacyCheckboxModule as MatCheckboxModule} from "@angular/material/legacy-checkbox";
import {SelectOnFocusDirective} from "./directives/select-on-focus.directive";
import {CopyOnClickDirective} from "./directives/copy-on-focus.directive";

@NgModule({
  declarations: [
    AppComponent,
    NumberToEnumsComponent,
    EnumsToNumberComponent,
    SelectOnFocusDirective,
    CopyOnClickDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonModule,
    TextFieldModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
