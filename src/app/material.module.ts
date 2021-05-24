import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
    imports: [
        MatToolbarModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatSnackBarModule
    ],
    exports: [
        MatToolbarModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatSnackBarModule
    ],
})
export class MaterialModule { }
