import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {ContactsTableComponent} from './views/contacts-table/contacts-table.component';
import {EditContactComponent} from './views/edit-contact/edit-contact.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {ConfirmationDialogComponent} from './views/confirmation-dialog/confirmation-dialog.components';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
    declarations: [
        AppComponent,
        ContactsTableComponent,
        EditContactComponent,
        ConfirmationDialogComponent
    ],
    entryComponents: [ConfirmationDialogComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatSortModule,
        FormsModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
